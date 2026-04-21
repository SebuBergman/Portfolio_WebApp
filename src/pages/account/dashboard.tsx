import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ p: 4, color: "black" }}>
      <Typography variant="h2" gutterBottom>
        Leffakirjasto
      </Typography>
      <Typography variant="h4" gutterBottom>
        Personal library for movies, TV shows, books and Vinyls. You can also find a randomizer and Countdown
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mt: 5 }}>
        Feel free to use the sidebar to navigate through the app.
      </Typography>
    </Box>
  );
}
