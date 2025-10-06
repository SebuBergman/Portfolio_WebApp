import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import { Card, Typography, CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import {
  fetchCountdowns,
  selectCountdowns,
  selectCountdownsLoading,
} from "@features/movieLibrary/countdowns/store/countdownSlice";
import AddCountdown from "@features/movieLibrary/countdowns/components/AddCountdown";
import DeleteCountdown from "@features/movieLibrary/countdowns/components/DeleteCountdown";

export default function CountdownsList() {
  const dispatch = useAppDispatch();
  const countdowns = useAppSelector(selectCountdowns);
  const loading = useAppSelector(selectCountdownsLoading);

  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);

  useEffect(() => {
    // Only fetch if we haven't fetched before and don't have data
    if (!hasInitiallyFetched) {
      dispatch(fetchCountdowns());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched, countdowns.length]);

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
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr 1fr",
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
                  padding: { xs: 2, md: 2 },
                  pt: { xs: 4, md: 5 },
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: "center",
                  height: "100%",
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
                  <DeleteCountdown countdown={cd} />
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
                      fontSize: { xs: "1.1rem", md: "1.8rem" },
                    }}
                  >
                    {isPast ? "days ago" : "days left"}
                  </Typography>
                </Box>

                {/* Right column: Event date + name */}
                <Box
                  sx={{ textAlign: { xs: "left", md: "center" }, padding: 2 }}
                >
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
                      wordWrap: "break-word",
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
    </Box>
  );
}
