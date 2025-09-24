import { Box, Typography } from "@mui/material";

function Randomizer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 900,
        margin: "auto",
      }}
      className="dashboard-section"
    >
      <Typography variant="h4" mb={3}>
        Randomizer
      </Typography>
    </Box>
  );
}

export default Randomizer;
