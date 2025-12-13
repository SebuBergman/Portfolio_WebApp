import { useState, ChangeEvent, FormEvent, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import AppButton from "@features/ui/AppButton";
import { TextField, Box, Typography, IconButton, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addBook, Book } from "../store/bookSlice";
import { uploadBookCoverToFirebaseStorage } from "@services/firebase/hooks/useStorage";
import { selectUser } from "@features/auth/store/authSlice";
import ReusableModal from "@features/ui/ReusableModal";
import { Add } from "@mui/icons-material";
import toast from "react-hot-toast";

export default function AddBook() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Memoized callbacks
  const handleOpen = useCallback(() => setModalOpen(true), []);
  const handleClose = useCallback(() => setModalOpen(false), []);

  const resetForm = useCallback(() => {
    setTitle("");
    setAuthor("");
    setCover(null);
  }, []);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleAuthorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  }, []);

  const handleCoverChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files?.[0] ?? null);
  }, []);

  // Memoized validation
  const isFormValid = useMemo(() => {
    return title.trim().length > 0 && author.trim().length > 0;
  }, [title, author]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;

      setLoading(true);
      const toastId = toast.loading(
        "Scribing into the Red Book... Book is being added..."
      );

      try {
        let coverUrl: string | undefined;
        if (cover && uid) {
          const uploaded = await uploadBookCoverToFirebaseStorage(uid, cover);
          coverUrl = uploaded ?? undefined;
        }

        const newBook: Book = {
          id: uuidv4(),
          title: title.trim(),
          author: author.trim(),
          coverUrl,
          ownerId: uid,
        };

        await dispatch(addBook(newBook));
        toast.success(
          "Book added successfully! One more tale for the library of Minas Tirith.",
          {
            id: toastId,
          }
        );

        resetForm();
        handleClose();
      } catch (error) {
        console.error("Failed to add book:", error);
        toast.error("Failed to add Book. The pages were lost in Mordor.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
    [isFormValid, cover, uid, title, author, dispatch, resetForm, handleClose]
  );

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
          label="Book Title"
          value={title}
          onChange={handleTitleChange}
          required
          disabled={loading}
          autoFocus
        />
        <TextField
          label="Author"
          value={author}
          onChange={handleAuthorChange}
          required
          disabled={loading}
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
                disabled={loading}
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
          disabled={loading || !isFormValid}
        >
          {loading ? "Adding..." : "Add Book"}
        </AppButton>
      </Box>
    ),
    [
      handleSubmit,
      handleClose,
      title,
      author,
      cover,
      loading,
      isFormValid,
      handleTitleChange,
      handleAuthorChange,
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
        aria-label="Add book"
      />
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
