import { useState, ChangeEvent, FormEvent, useCallback, useMemo } from "react";
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

  // Memoized callbacks
  const handleOpen = useCallback(() => setModalOpen(true), []);
  const handleClose = useCallback(() => setModalOpen(false), []);

  const resetForm = useCallback(() => {
    setTitle("");
    setSeasonCount(1);
    setOwnedSeasons({});
  }, []);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleSeasonCountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = Math.max(1, parseInt(e.target.value) || 1);
      setSeasonCount(val);
      setOwnedSeasons((prev) => {
        const updated: typeof prev = {};
        for (let i = 1; i <= val; i++) updated[i] = !!prev[i];
        return updated;
      });
    },
    []
  );

  const handleCheckboxChange = useCallback((seasonNumber: number) => {
    setOwnedSeasons((prev) => ({
      ...prev,
      [seasonNumber]: !prev[seasonNumber],
    }));
  }, []);

  // Memoized validation
  const isFormValid = useMemo(() => {
    return title.trim().length > 0 && seasonCount >= 1;
  }, [title, seasonCount]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;

      setLoading(true);
      const toastId = toast.loading(
        "Wibbly wobbly... TV Show is materializing..."
      );

      try {
        const newShow: TVShow = {
          id: uuidv4(),
          title: title.trim(),
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

        resetForm();
        handleClose();
      } catch (error) {
        console.error("Failed to add TV show:", error);
        toast.error(
          "Failed to add TV Show. The TARDIS landed in the wrong timeline.",
          {
            id: toastId,
          }
        );
      } finally {
        setLoading(false);
      }
    },
    [
      isFormValid,
      title,
      seasonCount,
      ownedSeasons,
      uid,
      dispatch,
      resetForm,
      handleClose,
    ]
  );

  // Memoized season checkboxes to prevent recreation on every render
  const seasonCheckboxes = useMemo(() => {
    return Array.from({ length: seasonCount }, (_, i) => (
      <Box key={i + 1} display="flex" alignItems="center" gap={0.5}>
        <Checkbox
          checked={!!ownedSeasons[i + 1]}
          onChange={() => handleCheckboxChange(i + 1)}
          sx={{
            color: "#729E65",
            "&.Mui-checked": { color: "#4e7c4a" },
          }}
          disabled={loading}
        />
        <Typography component="span">S{i + 1}</Typography>
      </Box>
    ));
  }, [seasonCount, ownedSeasons, loading, handleCheckboxChange]);

  // Memoized modal content
  const modalContent = useMemo(
    () => (
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
          disabled={loading}
        />
        <TextField
          label="TV Show Title"
          value={title}
          onChange={handleTitleChange}
          required
          disabled={loading}
          autoFocus
        />
        <TextField
          label="Number of Seasons"
          type="number"
          inputProps={{ min: 1, max: 100 }}
          value={seasonCount}
          onChange={handleSeasonCountChange}
          sx={{ width: 180 }}
          required
          disabled={loading}
        />
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          {seasonCheckboxes}
        </Box>
        <AppButton
          type="submit"
          variant="contained"
          disabled={loading || !isFormValid}
        >
          {loading ? "Adding..." : "Add TV Show"}
        </AppButton>
      </Box>
    ),
    [
      handleSubmit,
      handleClose,
      title,
      seasonCount,
      loading,
      isFormValid,
      handleTitleChange,
      handleSeasonCountChange,
      seasonCheckboxes,
    ]
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
        aria-label="Add TV show"
      />
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
