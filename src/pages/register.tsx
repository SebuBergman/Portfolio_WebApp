import { Typography } from "@mui/material";

import { MOVIE_LIBRARY } from "@config/constants";
import SignUpForm from "@features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <Typography component="h1" variant="h2" mb={1}>
        Sign Up
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Become a user of {MOVIE_LIBRARY}
      </Typography>
      <SignUpForm />
    </>
  );
}
