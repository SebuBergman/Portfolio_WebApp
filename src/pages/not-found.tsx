import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import pageNotFound from "@assets/images/page_not_found.webp";

export default function NotFoundPage() {
  return (
    <div>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p: { xs: "0px 10px 25px 0px", md: "0px 10px" },
        }}
      >
        <Box
          component="img"
          src={pageNotFound}
          alt="Carousel 1"
          sx={{
            height: { xs: "100%" },
            width: { xs: "100%", md: "680px" },
            borderRadius: "30px",
          }}
        />
        <p>
          <Link to="/">Click here to go back to the landing page</Link>
        </p>
      </Stack>
    </div>
  );
}
