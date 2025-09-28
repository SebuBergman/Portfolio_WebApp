import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  Card,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import {
  deleteCountdown,
  fetchCountdowns,
  selectCountdowns,
  selectCountdownsLoading,
} from "@features/movieLibrary/countdowns/store/countdownSlice";
import AddCountdown from "@features/movieLibrary/countdowns/components/AddCountdown";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteDialog from "@features/ui/DeleteDialog";
import toast from "react-hot-toast";

export default function CountdownsList() {
  const dispatch = useAppDispatch();
  const countdowns = useAppSelector(selectCountdowns);
  const loading = useAppSelector(selectCountdownsLoading);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [countdownId, setCountdownId] = useState<string | null>(null);
  const [countdownName, setCountdownName] = useState<string>("");
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);

  useEffect(() => {
    // Only fetch if we haven't fetched before and don't have data
    if (!hasInitiallyFetched && countdowns.length === 0) {
      //console.log("Fetching countdowns from Firebase...");
      dispatch(fetchCountdowns());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched, countdowns.length]);

  const handleDeleteClick = (id: string, name: string) => {
    setCountdownId(id);
    setCountdownName(name);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (countdownId) {
      const toastId = toast.loading(
        "Time is unwinding... Countdown is being deleted..."
      );
      try {
        await dispatch(deleteCountdown(countdownId));
        toast.success(
          "Countdown deleted successfully! Time has stopped for this event.",
          {
            id: toastId,
          }
        );
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        color: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          minWidth: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          My Countdowns
        </Typography>

        {/* Add Countdown Button */}
        <div style={{ marginBottom: "1.5rem" }}>
          <AddCountdown />
        </div>

        {/* Loading state */}
        {loading && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
          >
            <CircularProgress />
          </div>
        )}

        {/* Empty state */}
        {!loading && countdowns.length === 0 && (
          <Typography variant="body1" sx={{ color: "#888" }}>
            No countdowns yet. Add your first one!
          </Typography>
        )}
      </Box>

      {/* Countdown grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr",
            lg: "1fr 1fr",
            xl: "1fr 1fr 1fr",
          },
          gap: { xs: 2, md: 2 },
          width: "100%",
          justifyContent: "center",
        }}
      >
        {countdowns.map((cd) => {
          // Recalculate days remaining with current date for accuracy
          const daysRemaining = dayjs(cd.eventDate).diff(dayjs(), "day");
          const isPast = daysRemaining < 0;

          return (
            <Grid key={cd.id} style={{ position: "relative" }}>
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  background: "#1e1e1e",
                  color: "#fff",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                  padding: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "100%",
                  minWidth: { md: 400 },
                  width: { xs: "100%", md: "100%" },
                }}
              >
                {/* Delete button in top-right */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteClick(cd.id, cd.eventName)}
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
                </Box>

                {/* Left column: Days remaining */}
                <Box sx={{ textAlign: "center", padding: 2 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: isPast ? "#e57373" : "#81c784",
                      lineHeight: 1,
                      fontSize: { xs: "2.8rem", md: "5rem" },
                    }}
                  >
                    {Math.abs(daysRemaining)}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#aaa",
                      fontWeight: 500,
                      fontSize: { xs: "1.2rem", md: "1.8rem" },
                    }}
                  >
                    {isPast ? "days ago" : "days left"}
                  </Typography>
                </Box>

                {/* Right column: Event date + name */}
                <Box sx={{ textAlign: "left", padding: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 500, marginBottom: 0.5, color: "#ccc" }}
                  >
                    {dayjs(cd.eventDate).format("DD.MM.YYYY")}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cd.eventName}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Box>

      <DeleteDialog
        open={deleteDialogOpen}
        title={`Are you sure you want to delete: ${countdownName}?`}
        description="This action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
