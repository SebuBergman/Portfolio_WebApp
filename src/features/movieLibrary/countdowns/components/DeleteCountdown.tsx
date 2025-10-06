import { useState } from "react";
import { useAppDispatch } from "@app/store";
import toast from "react-hot-toast";
import DeleteDialog from "@features/ui/DeleteDialog";
import ClearIcon from "@mui/icons-material/Clear";
import { Countdown, deleteCountdown } from "../store/countdownSlice";
import { IconButton } from "@mui/material";

interface DeleteCountdownProps {
  countdown: Countdown;
}

export default function DeleteCountdown({ countdown }: DeleteCountdownProps) {
  const dispatch = useAppDispatch();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [countdownId, setCountdownId] = useState<string | null>(null);

  const handleOpen = () => {
    setCountdownId(countdown.id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (countdownId) {
      const toastId = toast.loading(
        "Time is unwinding... Countdown is being deleted..."
      );
      console.log("Deleting countdown with id:", toastId);
      try {
        await dispatch(deleteCountdown(countdownId));
        toast.success(
          "Countdown deleted successfully! Time has stopped for this event.",
          {
            id: toastId,
          }
        );
        console.log("toast");
        setDeleteDialogOpen(false);
      } catch (error) {
        toast.error("Failed to delete countdown. Time refused to cooperate.", {
          id: toastId,
        });
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          height: "40px",
          color: "black",
          bgcolor: "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#EB5757",
          },
        }}
      >
        <ClearIcon />
      </IconButton>
      <DeleteDialog
        open={deleteDialogOpen}
        title={`Are you sure you want to delete "${countdown.eventName}"?`}
        description="This action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
