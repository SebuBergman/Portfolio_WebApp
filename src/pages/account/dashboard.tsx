import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ p: 4, color: "black" }}>
      <Typography variant="h2" gutterBottom>
        Leffakirjasto
      </Typography>
      <Typography variant="h4" gutterBottom>
        Your personal library for movies, TV shows, and books.
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mt: 5 }}>
        Feel free to use the sidebar to navigate through the app.
      </Typography>
    </Box>
  );
}
