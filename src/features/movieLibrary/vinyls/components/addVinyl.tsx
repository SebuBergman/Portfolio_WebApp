import { useState, FormEvent, ChangeEvent, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import AppButton from "@features/ui/AppButton";
import { TextField, Box, Typography, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addVinyl, Vinyl } from "../store/vinylSlice";
import { selectUser } from "@features/auth/store/authSlice";
import ReusableModal from "@features/ui/ReusableModal";
import { Add } from "@mui/icons-material";
import { uploadVinylCoverToFirebaseStorage } from "@services/firebase/hooks/useStorage";
import toast from "react-hot-toast";

export default function AddVinyl() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [year, setYear] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Memoized callbacks
  const handleOpen = useCallback(() => setModalOpen(true), []);
  const handleClose = useCallback(() => {
    setModalOpen(false);
    // Don't reset form immediately to avoid flash
  }, []);

  // Reset form function
  const resetForm = useCallback(() => {
    setTitle("");
    setArtist("");
    setCover(null);
    setYear("");
  }, []);

  // Memoized validation
  const isFormValid = useMemo(() => {
    return title.trim().length > 0 && artist.trim().length > 0;
  }, [title, artist]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;

      setLoading(true);
      const toastId = toast.loading(
        "Dropping the needle... Vinyl is being added..."
      );

      try {
        let coverUrl: string | undefined;
        if (cover && uid) {
          const uploaded = await uploadVinylCoverToFirebaseStorage(uid, cover);
          coverUrl = uploaded ?? undefined;
        }

        const newVinyl: Vinyl = {
          id: uuidv4(),
          title: title.trim(),
          artist: artist.trim(),
          ...(year && year.trim() ? { year: year.trim() } : {}),
          coverUrl,
          ownerId: uid,
        };

        await dispatch(addVinyl(newVinyl));
        toast.success("Vinyl added successfully! Crank it up to 11.", {
          id: toastId,
        });

        resetForm();
        handleClose();
      } catch (error) {
        console.error("Failed to add vinyl:", error);
        toast.error("Failed to add Vinyl. The record skipped again...", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
    [
      isFormValid,
      cover,
      uid,
      title,
      artist,
      year,
      dispatch,
      resetForm,
      handleClose,
    ]
  );

  // Memoized change handlers
  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleArtistChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setArtist(e.target.value);
  }, []);

  const handleYearChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  }, []);

  const handleCoverChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCover(file);
  }, []);

  // Memoized modal content to prevent recreation on every render
  const modalContent = useMemo(
    () => (
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Vinyl Title"
          value={title}
          onChange={handleTitleChange}
          required
          disabled={loading}
          autoFocus
        />
        <TextField
          label="Artist"
          value={artist}
          onChange={handleArtistChange}
          required
          disabled={loading}
        />
        <TextField
          label="Year"
          value={year}
          onChange={handleYearChange}
          disabled={loading}
          placeholder="e.g., 1975"
        />
        <Box>
          <label htmlFor="cover-upload">
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleCoverChange}
              disabled={loading}
            />
            <Button component="span" variant="contained" disabled={loading}>
              Choose Cover
            </Button>
          </label>
          {cover && (
            <Typography variant="caption" sx={{ ml: 2 }}>
              Selected: {cover.name}
            </Typography>
          )}
        </Box>
        <AppButton
          type="submit"
          variant="contained"
          disabled={loading || !isFormValid}
        >
          {loading ? "Adding..." : "Add Vinyl"}
        </AppButton>
      </Box>
    ),
    [
      handleSubmit,
      title,
      artist,
      year,
      cover,
      loading,
      isFormValid,
      handleTitleChange,
      handleArtistChange,
      handleYearChange,
      handleCoverChange,
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
        aria-label="Add vinyl"
      />
      <ReusableModal
        open={modalOpen}
        onClose={handleClose}
        title="Add Vinyl"
        subtitle="Add a new vinyl record"
        content={modalContent}
      />
    </>
  );
}
