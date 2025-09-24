import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
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

export default function CountdownsList() {
  const dispatch = useAppDispatch();
  const countdowns = useAppSelector(selectCountdowns);
  const loading = useAppSelector(selectCountdownsLoading);

  useEffect(() => {
    dispatch(fetchCountdowns());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteCountdown(id));
  };

  return (
    <div style={{ padding: "2rem" }}>
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

      {/* Countdown grid */}
      <Grid container spacing={3}>
        {countdowns.map((cd) => {
          const daysRemaining = dayjs(cd.eventDate).diff(dayjs(), "day");
          const isPast = daysRemaining < 0;

          return (
            <Grid item key={cd.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: "#1e1e1e",
                  color: "#fff",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {cd.eventName}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    📅 {dayjs(cd.eventDate).format("D MMM YYYY")}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: isPast ? "#e57373" : "#81c784",
                    }}
                  >
                    {isPast
                      ? "Event has passed"
                      : `${daysRemaining} day${
                          daysRemaining !== 1 ? "s" : ""
                        } left`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(cd.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
