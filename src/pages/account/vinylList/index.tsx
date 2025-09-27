import { useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import { fetchVinyls, selectVinyls } from "@vinyls/store/vinylSlice";
import {
  Box,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Colors } from "@app/config/styles";
import AddVinyl from "@vinyls/components/AddVinyl";
import EditVinyl from "@vinyls/components/EditVinyl";

export default function VinylList() {
  const dispatch = useAppDispatch();
  const vinyls = useAppSelector(selectVinyls);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchVinyls());
  }, [dispatch]);

  const filteredVinyls = vinyls
    .filter(
      (v) =>
        v.artist.toLowerCase().includes(search.toLowerCase()) ||
        v.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      a.artist.toLowerCase().localeCompare(b.artist.toLowerCase())
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
          minWidth: { xs: "100%", md: "80%", lg: "60%" },
        }}
      >
        <Typography variant="h4" gutterBottom mb={3}>
          Vinyl Collection
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 3,
            width: { xs: "100%", md: "80%" },
          }}
        >
          <AddVinyl />
          <TextField
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search by title or artist…"
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>

      {/* Vinyl grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "1fr 1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr 1fr",
          },
          gap: { xs: 2, md: 2 },
          width: "100%",
          justifyContent: "center",
        }}
      >
        {filteredVinyls.map((v) => (
          <Grid key={v.id} style={{ position: "relative" }}>
            <Card sx={{ width: { xs: "100%", md: "100%" }, height: "100%" }}>
              {/* Clickable cover image */}
              <EditVinyl vinyl={v} showEditIcon={false}>
                {v.coverUrl ? (
                  <CardMedia
                    component="img"
                    image={v.coverUrl}
                    alt={v.title}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      width: "100%",
                      aspectRatio: "2 / 2",
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      backgroundColor: "#e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      No Cover
                    </Typography>
                  </Box>
                )}
              </EditVinyl>

              <CardContent>
                {/* Title */}
                <EditVinyl vinyl={v} showEditIcon={false}>
                  <Typography
                    variant="h6"
                    color={Colors.black}
                    sx={{ mb: 1, cursor: "pointer" }}
                  >
                    {v.title}
                  </Typography>
                </EditVinyl>
                {/* Artist */}
                <EditVinyl vinyl={v} showEditIcon={false}>
                  <Typography
                    variant="subtitle1"
                    color={Colors.black}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {}}
                  >
                    {v.artist}
                  </Typography>
                </EditVinyl>
                {/* Year */}
                <EditVinyl vinyl={v} showEditIcon={false}>
                  <Typography
                    variant="body2"
                    color={Colors.black}
                    sx={{ cursor: "pointer" }}
                  >
                    {v.year}
                  </Typography>
                </EditVinyl>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
