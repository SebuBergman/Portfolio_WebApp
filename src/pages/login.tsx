import { Stack, Typography } from "@mui/material";

import { MOVIE_LIBRARY } from "@config/constants";
import LoginForm from "@features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Stack sx={{ m: 0, p: 0 }}>
        <Typography component="h1" variant="h2" mb={1}>
          Login
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Login to access {MOVIE_LIBRARY}
        </Typography>
        <LoginForm />
      </Stack>
    </>
  );
}
