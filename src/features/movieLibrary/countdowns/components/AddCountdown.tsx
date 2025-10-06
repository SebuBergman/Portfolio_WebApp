import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import { selectUser } from "@features/auth/store/authSlice";
import ReusableModal from "@features/ui/ReusableModal";
import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { addCountdown, Countdown } from "../store/countdownSlice";
import { Add } from "@mui/icons-material";
import AppButton from "@features/ui/AppButton";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export default function AddCountdown() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState<Dayjs | null>(dayjs());

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate) return;
    setLoading(true);

    const toastId = toast.loading(
      "Flux capacitor charging... Countdown is being added..."
    );

    try {
      if (eventDate) {
        const newCountdown: Countdown = {
          id: uuidv4(),
          eventName,
          eventDate: eventDate.toISOString(),
          daysRemaining: eventDate.diff(dayjs(), "day"),
          ownerId: uid,
        };
        await dispatch(addCountdown(newCountdown));
        toast.success(
          "Countdown added successfully! Great Scott, the future is set!",
          {
            id: toastId,
          }
        );
      }

      // Reset form
      setEventName("");
      setEventDate(dayjs());
      setLoading(false);
      handleClose();
    } catch (error) {
      toast.error("Failed to add Countdown. Roads? We couldn’t get to them.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
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
      <DatePicker
        label="Event Date"
        value={eventDate}
        onChange={(newValue) => setEventDate(newValue)}
        slotProps={{ textField: { fullWidth: true } }}
        format="DD/MM/YYYY"
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
    </>
  );
}
