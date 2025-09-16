import { useState, FormEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import AppButton from "@features/ui/AppButton";
import { TextField, Box, Typography, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addVinyl, Vinyl } from "../store/vinylSlice";
import { selectUser } from "@features/auth/store/authSlice";
import ReusableModal from "@features/ui/reusableModal";
import { Add } from "@mui/icons-material";
import { uploadVinylCoverToFirebaseStorage } from "@services/firebase/hooks/useStorage";

export default function AddVinyl() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;
    setLoading(true);

    let coverUrl: string | undefined;
    if (cover && uid) {
      const uploaded = await uploadVinylCoverToFirebaseStorage(uid, cover);
      coverUrl = uploaded ?? undefined;
    }

    const newVinyl: Vinyl = {
      id: uuidv4(),
      title,
      artist,
      ...(year && year.trim() ? { year } : {}),
      coverUrl,
      ownerId: uid,
    };

    await dispatch(addVinyl(newVinyl));

    // Reset form
    setTitle("");
    setArtist("");
    setCover(null);
    setYear("");
    setLoading(false);
    handleClose();
  };

  const modalContent = (
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        required
      />
      <TextField
        label="Artist"
        value={artist}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setArtist(e.target.value)
        }
        required
      />
      <TextField
        label="Year"
        value={year ?? ""}
        onChange={(e) => setYear(e.target.value || undefined)}
      />
      <Box>
        <label htmlFor="cover-upload">
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCover(e.target.files?.[0] ?? null)
            }
          />
          <Button component="span" variant="contained" disabled={loading}>
            Choose Cover
          </Button>
        </label>
        {cover && (
          <Typography variant="caption">Selected: {cover.name}</Typography>
        )}
      </Box>
      <AppButton
        type="submit"
        variant="contained"
        disabled={loading || !title || !artist}
      >
        Add Vinyl
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
        title="Add Vinyl"
        subtitle="Add a new vinyl record"
        content={modalContent}
      />
    </>
  );
}
