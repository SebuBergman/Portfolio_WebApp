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
import { v4 as uuidv4 } from "uuid";
import { addTVShow, TVShow } from "../store/tvShowSlice";
import ReusableModal from "@features/ui/ReusableModal";
import { selectUser } from "@features/auth/store/authSlice";
import { Add } from "@mui/icons-material";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || seasonCount < 1) return;
    setLoading(true);

    const toastId = toast.loading(
      "Wibbly wobbly... TV Show is materializing..."
    );

    try {
      const newShow: TVShow = {
        id: uuidv4(),
        title,
        seasons: Array.from({ length: seasonCount }, (_, i) => ({
          id: uuidv4(),
          seasonNumber: i + 1,
          owned: !!ownedSeasons[i + 1],
        })),
        ownerId: uid,
      };

      await dispatch(addTVShow(newShow));
      toast.success("TV Show added successfully! Allons-y!", {
        id: toastId,
      });

      // Reset form
      setTitle("");
      setSeasonCount(1);
      setOwnedSeasons({});
      setLoading(false);
      handleClose();
    } catch (error) {
      toast.error(
        "Failed to add TV Show. The TARDIS landed in the wrong timeline.",
        {
          id: toastId,
        }
      );
    } finally {
      setLoading(false);
    }
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
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
      <AppButton type="submit" variant="contained" disabled={loading || !title}>
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
      />
    </>
  );
}
