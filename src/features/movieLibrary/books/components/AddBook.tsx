import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import AppButton from "@features/ui/AppButton";
import { TextField, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
import { addBook, Book } from "../store/bookSlice";
import { uploadBookCoverToFirebaseStorage } from "@services/firebase/hooks/useStorage";
import { selectUser } from "@features/auth/store/authSlice";
import ReusableModal from "@features/ui/reusableModal";
import { Add } from "@mui/icons-material";

export default function AddBook() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAuthor(e.target.value);

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCover(e.target.files?.[0] ?? null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    setLoading(true);

    let coverUrl: string | undefined;
    if (cover && uid) {
      const uploaded = await uploadBookCoverToFirebaseStorage(uid, cover);
      coverUrl = uploaded ?? undefined;
    }

    const newBook: Book = {
      id: uuidv4(),
      title,
      author,
      coverUrl,
      ownerId: uid,
    };

    await dispatch(addBook(newBook));

    // Reset form
    setTitle("");
    setAuthor("");
    setCover(null);
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
        label="Book Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <TextField
        label="Author"
        value={author}
        onChange={handleAuthorChange}
        required
      />
      <Box>
        <Box mb={1}>
          <label htmlFor="cover-upload">
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleCoverChange}
            />
            <Button
              variant="contained"
              component="span"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                px: 3,
                py: 1,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                textTransform: "none",
                fontWeight: 600,
              }}
              disabled={loading}
            >
              Choose Cover Image
            </Button>
          </label>
        </Box>
        {cover && (
          <Typography variant="caption">Selected: {cover.name}</Typography>
        )}
      </Box>
      <AppButton
        type="submit"
        variant="contained"
        disabled={loading || !title || !author}
      >
        Add Book
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
        title="Add Book"
        subtitle="Add a new book to your collection."
        content={modalContent}
      />
    </>
  );
}
