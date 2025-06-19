import { useEffect, useState } from "react";
import { addBook, Book, editBook } from "../store/bookSlice";
import { useAppDispatch, useAppSelector } from "@app/store";
import { uploadBookCoverToFirebaseStorage } from "@services/firebase/hooks/useStorage";
import { selectUser } from "@features/auth/store/authSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  editBookObj?: Book | null;
};

export default function AddBook({ open, onClose, editBookObj }: Props) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(editBookObj?.title || "");
  const [author, setAuthor] = useState(editBookObj?.author || "");
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  // Reset fields if a different book is edited
  useEffect(() => {
    setTitle(editBookObj?.title || "");
    setAuthor(editBookObj?.author || "");
    setCover(null);
  }, [editBookObj, open]);

  const handleSave = async () => {
    setLoading(true);
    let coverUrl: string | undefined = editBookObj?.coverUrl;
    if (cover) {
      if (!uid) {
        toast.error("Error uploading the book cover.");
        setLoading(false); // Also reset loading here!
        return;
      }
      const uploaded = await uploadBookCoverToFirebaseStorage(uid, cover);
      coverUrl = uploaded ?? undefined;
    }
    if (editBookObj && editBookObj.id) {
      await dispatch(editBook({ id: editBookObj.id, title, author, coverUrl }));
    } else {
      await dispatch(addBook({ title, author, coverUrl, ownerId: uid }));
    }
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editBookObj ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          fullWidth
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files?.[0] ?? null)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading || !title || !author}
        >
          {editBookObj ? "Save" : "Add"}
        </Button>
      </DialogActions>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          style: {
            padding: "20px",
            fontSize: "24px",
          },
        }}
      />
    </Dialog>
  );
}
