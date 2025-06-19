import { Outlet, useLocation } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import LoginBackground from "@features/auth/assets/login-background.webp";
import SignUpBackground from "@features/auth/assets/sign-up-background.webp";

import { APP_NAME } from "@app/config/constants";
import { Colors } from "@app/config/styles";
import { AppRoutes } from "@app/config/routes";

export default function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${
          isLoginPage ? LoginBackground : SignUpBackground
        })`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: { xs: 1 },
        color: Colors.black,
      }}
    >
      <Grid>
        <Grid
          sx={{
            height: "100%",
            mx: { xs: 0, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 552,
            backgroundColor: "white",
            padding: { xs: "25px", md: 4 },
          }}
        >
          <Stack mb={4} direction={"row"}>
            <Link href={AppRoutes.home}>
              <Typography variant="h4" sx={{ ml: 1 }}>
                {APP_NAME}
              </Typography>
            </Link>
          </Stack>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
