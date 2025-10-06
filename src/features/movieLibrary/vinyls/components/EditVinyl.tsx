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
import { deleteVinyl, editVinyl, Vinyl } from "../store/vinylSlice";
import ReusableModal from "@features/ui/ReusableModal";
import { Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import DeleteDialog from "@features/ui/DeleteDialog";
import AppIconButton from "@features/ui/AppIconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface EditVinylProps {
  vinyl: Vinyl;
  children?: ReactNode; // Custom trigger element
  showEditIcon?: boolean;
}

export default function EditVinyl({
  vinyl,
  children,
  showEditIcon = true,
}: EditVinylProps) {
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vinylId, setVinylId] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setVinylId(vinyl.id);
    setTitle(vinyl.title);
    setArtist(vinyl.artist);
    setYear(vinyl.year);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (vinylId) {
      const toastId = toast.loading(
        "Smashing guitar... Vinyl is being deleted..."
      );
      try {
        await dispatch(deleteVinyl(vinylId));
        toast.success(
          "Vinyl deleted successfully! Like a mic drop at the end of a gig.",
          {
            id: toastId,
          }
        );
        setDeleteDialogOpen(false);
        handleClose(); // Close the edit modal as well
      } catch (error) {
        toast.error("Failed to delete Vinyl. The crowd demanded an encore.", {
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
    if (!title.trim() || !artist.trim()) return;
    setLoading(true);

    const toastId = toast.loading(
      "Remastering track... Vinyl is being updated..."
    );

    try {
      const updatedVinyl: Vinyl = {
        ...vinyl,
        title: title.trim(),
        artist: artist.trim(),
        year: year?.trim() ? year.trim() : undefined,
      };

      await dispatch(editVinyl(updatedVinyl));
      toast.success(
        "Vinyl updated successfully! Sounds better than a live show.",
        {
          id: toastId,
        }
      );

      handleClose();
    } catch (error) {
      // Update the same toast to error if something goes wrong
      toast.error(
        "Failed to update Vinyl. The guitar solo got lost in feedback.",
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
        label="Vinyl Title"
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
        value={artist}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setArtist(e.target.value)
        }
        onKeyDown={(e) =>
          handleEditKeyDown(e as KeyboardEvent<HTMLInputElement>)
        }
        required
      />
      <TextField
        label="Year"
        value={year ?? ""}
        onChange={(e) => setYear(e.target.value || undefined)}
        onKeyDown={(e) =>
          handleEditKeyDown(e as KeyboardEvent<HTMLInputElement>)
        }
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppButton
          type="submit"
          variant="contained"
          disabled={loading || !title || !artist}
        >
          Update Vinyl
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
        <Box onClick={handleOpen} sx={{ cursor: "pointer", height: "100%" }}>
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
        title="Update Vinyl"
        content={modalContent}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        title={`Are you sure you want to delete "${vinyl.title}" by ${vinyl.artist}?`}
        description="This action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
