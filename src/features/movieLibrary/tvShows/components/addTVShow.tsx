import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import AppButton from "@features/ui/AppButton";
import {
  TextField,
  Box,
  Typography,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
import { addTVShow } from "../store/tvShowSlice";
import ReusableModal from "@features/ui/reusableModal";
import { selectUser } from "@features/auth/store/authSlice";
import { Add } from "@mui/icons-material";

export default function AddTVShow() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [seasonCount, setSeasonCount] = useState(1);
  const [ownedSeasons, setOwnedSeasons] = useState<{
    [seasonNumber: number]: boolean;
  }>({});

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleSeasonCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, parseInt(e.target.value) || 1);
    setSeasonCount(val);
    setOwnedSeasons((prev) => {
      const updated: typeof prev = {};
      for (let i = 1; i <= val; i++) updated[i] = !!prev[i];
      return updated;
    });
  };

  const handleCheckboxChange = (seasonNumber: number) => {
    setOwnedSeasons((prev) => ({
      ...prev,
      [seasonNumber]: !prev[seasonNumber],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || seasonCount < 1) return;
    const newShow = {
      id: uuidv4(),
      title,
      seasons: Array.from({ length: seasonCount }, (_, i) => ({
        id: uuidv4(),
        seasonNumber: i + 1,
        owned: !!ownedSeasons[i + 1],
      })),
      ownerId: uid,
    };
    dispatch(addTVShow(newShow));
    setTitle("");
    setSeasonCount(1);
    setOwnedSeasons({});
    handleClose();
  };

  const modalContent = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{ position: "relative", mt: 2 }}
    >
      <IconButton
        onClick={handleClose}
        aria-label="close"
        size="large"
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          zIndex: 2,
          color: "#222",
        }}
      ></IconButton>
      <TextField
        label="TV Show Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <TextField
        label="Number of Seasons"
        type="number"
        inputProps={{ min: 1, max: 100 }}
        value={seasonCount}
        onChange={handleSeasonCountChange}
        sx={{ width: 180 }}
        required
      />
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        {Array.from({ length: seasonCount }, (_, i) => (
          <Box key={i + 1} display="flex" alignItems="center" gap={0.5}>
            <Checkbox
              checked={!!ownedSeasons[i + 1]}
              onChange={() => handleCheckboxChange(i + 1)}
              sx={{
                color: "#729E65",
                "&.Mui-checked": { color: "#4e7c4a" },
              }}
            />
            <Typography component="span">S{i + 1}</Typography>
          </Box>
        ))}
      </Box>
      <AppButton type="submit" variant="contained">
        Add TV Show
      </AppButton>
    </Box>
  );

  return (
    <>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& .MuiButton-startIcon": {
            marginRight: 0,
            marginLeft: 0,
          },
          height: 56,
        }}
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
      ></Button>
      <ReusableModal
        open={modalOpen}
        onClose={handleClose}
        title="Add TV Show"
        subtitle="Add a new TV show and select which seasons you own."
        content={modalContent}
        // No Save button; handled by form submit
      />
    </>
  );
}
