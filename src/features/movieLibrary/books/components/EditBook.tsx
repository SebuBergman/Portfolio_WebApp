import {
  useState,
  FormEvent,
  ChangeEvent,
  ReactNode,
  KeyboardEvent,
} from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import AppButton from "@features/ui/AppButton";
import { TextField, Box, IconButton } from "@mui/material";
import { selectUser } from "@features/auth/store/authSlice";
import ReusableModal from "@features/ui/ReusableModal";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { Book, deleteBook, editBook } from "../store/bookSlice";
import DeleteDialog from "@features/ui/DeleteDialog";

interface EditBookProps {
  book: Book;
  children?: ReactNode; // Custom trigger element
  showEditIcon?: boolean;
}

export default function EditBook({
  book,
  children,
  showEditIcon = true,
}: EditBookProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setCover(null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCover(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (bookId) {
      const toastId = toast.loading(
        "Casting into Mount Doom... Book is being deleted..."
      );
      try {
        await dispatch(deleteBook(bookId));
        toast.success(
          "Book deleted successfully! Another chapter has closed.",
          {
            id: toastId,
          }
        );
        setDeleteDialogOpen(false);
        handleClose(); // Close the edit modal as well
      } catch (error) {
        toast.error("Failed to delete Book. Gollum snatched it last second.", {
          id: toastId,
        });
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    setLoading(true);

    const toastId = toast.loading(
      "Rewriting ancient runes... Book is being updated..."
    );

    try {
      const updatedBook: Book = {
        ...book,
        title: title.trim(),
        author: author.trim(),
      };

      await dispatch(editBook(updatedBook));
      toast.success(
        "Book updated successfully! Even Gandalf approves this draft.",
        {
          id: toastId,
        }
      );

      handleClose();
    } catch (error) {
      // Update the same toast to error if something goes wrong
      toast.error(
        "Failed to update Book. The ink faded quicker than Bilbo’s patience.",
        {
          id: toastId,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit(e);
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
        label="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        onKeyDown={(e) =>
          handleEditKeyDown(e as KeyboardEvent<HTMLInputElement>)
        }
        required
      />
      <TextField
        label="Artist"
        value={author}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAuthor(e.target.value)
        }
        onKeyDown={(e) =>
          handleEditKeyDown(e as KeyboardEvent<HTMLInputElement>)
        }
        required
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton
          type="submit"
          variant="contained"
          disabled={loading || !title || !author}
        >
          Update Book
        </AppButton>
        <IconButton
          onClick={handleDeleteClick}
          sx={{
            color: "red",
            "&:hover": {
              backgroundColor: "white",
              color: "red",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      {children ? (
        <Box onClick={handleOpen} sx={{ cursor: "pointer" }}>
          {children}
        </Box>
      ) : null}

      {showEditIcon && (
        <IconButton
          onClick={handleOpen}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            color: "primary.main",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
          size="small"
        >
          <Edit fontSize="small" />
        </IconButton>
      )}
      <ReusableModal
        open={modalOpen}
        onClose={handleClose}
        title="Update Book"
        content={modalContent}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        title={`Are you sure you want to delete "${book.title}" by ${book.author}?`}
        description="This action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
