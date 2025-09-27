import {
  useState,
  FormEvent,
  ChangeEvent,
  ReactNode,
  KeyboardEvent,
} from "react";
import { useAppDispatch } from "@app/store";
import AppButton from "@features/ui/AppButton";
import { TextField, Box, IconButton } from "@mui/material";
import ReusableModal from "@features/ui/ReusableModal";
import { Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import { deleteMovie, editMovie, Movie } from "../store/movieSlice";
import DeleteDialog from "@features/ui/DeleteDialog";

interface EditTVShowProps {
  movie: Movie;
  children?: ReactNode; // Custom trigger element
  showEditIcon?: boolean;
}

export default function EditMovie({
  movie,
  children,
  showEditIcon = true,
}: EditTVShowProps) {
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setMovieId(movie.id);
    setTitle(movie.title);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (movieId) {
      const toastId = toast.loading("Deleting movie... executing Order 66...");
      try {
        await dispatch(deleteMovie(movieId));
        toast.success(
          "Movie deleted successfully! A true balance in the Force.",
          {
            id: toastId,
          }
        );
        setDeleteDialogOpen(false);
        handleClose(); // Close the edit modal as well
      } catch (error) {
        toast.error("Failed to delete movie. Han shot first, but missed.", {
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
    if (!title.trim()) return;
    setLoading(true);

    const toastId = toast.loading(
      "Re-editing the saga... Movie is being updated..."
    );

    try {
      const updatedTVShow: Movie = {
        ...movie,
        title: title.trim(),
      };

      await dispatch(editMovie(updatedTVShow));
      toast.success(
        "Movie updated successfully! Even George Lucas would approve.",
        {
          id: toastId,
        }
      );

      handleClose();
    } catch (error) {
      // Update the same toast to error if something goes wrong
      toast.error(
        "Failed to update Movie. Jar Jar tripped over the film reel again.",
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton
          type="submit"
          variant="contained"
          disabled={loading || !title}
        >
          Update Movie
        </AppButton>
        <AppButton onClick={handleDeleteClick}>Delete</AppButton>
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
        title="Edit Movie"
        content={modalContent}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        title={`Are you sure you want to delete: ${movie.title}`}
        description="This action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
