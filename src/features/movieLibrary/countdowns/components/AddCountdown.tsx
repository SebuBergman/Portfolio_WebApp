import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@app/store";
import { selectUser } from "@features/auth/store/authSlice";
import ReusableModal from "@features/ui/reusableModal";
import { Box, Button, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { addCountdown, Countdown } from "../store/countdownSlice";
import { Add } from "@mui/icons-material";
import AppButton from "@features/ui/AppButton";
import { differenceInDays } from "@app/services/date/differenceInDays";

function AddCountdown() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = () => {
    if (!eventName || !eventDate) return;
    setLoading(true);

    const daysRemaining = differenceInDays(new Date(eventDate), new Date());
    const newCountdown: Countdown = {
      id: uuidv4(),
      eventName,
      eventDate,
      daysRemaining,
      ownerId: uid,
    };

    dispatch(addCountdown(newCountdown));
    toast.success("Countdown added successfully!");

    setEventName("");
    setEventDate("");
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
    >
      <TextField
        label="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Event Date"
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <AppButton
        type="submit"
        variant="contained"
        disabled={loading || !eventName || !eventDate}
      >
        Add Countdown
      </AppButton>
    </Box>
  );

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
        sx={{ height: 56 }}
      >
        Add Countdown
      </Button>
      <ReusableModal
        open={modalOpen}
        onClose={handleClose}
        title="Add Countdown"
        subtitle="Create a new countdown event."
        content={modalContent}
      />
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
    </>
  );
}

export default AddCountdown;
