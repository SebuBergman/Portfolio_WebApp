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
import { deleteTVShow, editTVShow, TVShow } from "../store/tvShowSlice";
import DeleteDialog from "@features/ui/DeleteDialog";
import AppIconButton from "@features/ui/AppIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface EditTVShowProps {
  tvshow: TVShow;
  children?: ReactNode; // Custom trigger element
  showEditIcon?: boolean;
}

export default function EditTVShow({
  tvshow,
  children,
  showEditIcon = true,
}: EditTVShowProps) {
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tvShowId, setTVShowId] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setTVShowId(tvshow.id);
    setTitle(tvshow.title);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (tvShowId) {
      const toastId = toast.loading(
        "Erasing from time... TV Show is being deleted..."
      );
      try {
        await dispatch(deleteTVShow(tvShowId));
        toast.success(
          "TV Show deleted successfully! Another fixed point in time.",
          {
            id: toastId,
          }
        );
        setDeleteDialogOpen(false);
        handleClose(); // Close the edit modal as well
      } catch (error) {
        toast.error(
          "Failed to delete TV Show. The Weeping Angels interfered.",
          {
            id: toastId,
          }
        );
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
      "Rewriting the timeline... TV Show is being updated..."
    );

    try {
      const updatedTVShow: TVShow = {
        ...tvshow,
        title: title.trim(),
      };

      await dispatch(editTVShow(updatedTVShow));
      toast.success(
        "TV Show updated successfully! Fixed the paradox, mostly.",
        {
          id: toastId,
        }
      );

      handleClose();
    } catch (error) {
      // Update the same toast to error if something goes wrong
      toast.error("Failed to update TV Show. Daleks exterminated the script.", {
        id: toastId,
      });
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
          Update TV Show
        </AppButton>
        <AppIconButton
          onClick={handleDeleteClick}
          aria-label="Delete Movie"
          variant="contained"
        >
          <DeleteIcon />
        </AppIconButton>
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
        title="Edit TV Show"
        content={modalContent}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        title={`Are you sure you want to delete: ${tvshow.title}?`}
        description="This action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
