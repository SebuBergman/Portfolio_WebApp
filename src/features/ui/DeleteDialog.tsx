import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogContent sx={{ color: "black" }}>
        <Typography>{title}</Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "16px 0px 16px 24px",
        }}
      >
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
