import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  onSubmit?: () => void;
}

export default function ReusableModal({
  open,
  onClose,
  title,
  subtitle,
  content,
  onSubmit,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          color: "black",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", md: 800 },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: { xs: 2, md: 4 },
          pt: { xs: 4, md: 6 },
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="close"
          size="large"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            color: "#222",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="caption">{subtitle}</Typography>
        <Box mt={2}>{content}</Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ mt: 2, mr: 2 }}
        >
          Cancel
        </Button>
        {onSubmit && (
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        )}
      </Box>
    </Modal>
  );
}
