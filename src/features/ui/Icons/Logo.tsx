import { Box, Typography } from "@mui/material";

import { MOVIE_LIBRARY } from "@config/constants";
import { Colors } from "@config/styles";
import Logo from "../Logo.png";

interface Props {
  isMinimized?: boolean;
}

export default function AppLogo({ isMinimized }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: "100%",
        gap: 2.5,
      }}
    >
      {!isMinimized && (
        <Typography variant="h6" sx={{ color: Colors.black }}>
          {MOVIE_LIBRARY}
        </Typography>
      )}
    </Box>
  );
}
