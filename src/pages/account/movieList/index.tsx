import { useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";

import { fetchMovies, selectMovies } from "@movies/store/movieSlice";
import AddMovie from "@movies/components/AddMovie";
import EditMovie from "@movies/components/EditMovie";

import {
  Box,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { formatDate } from "@app/services/date";

// Import styles
import "./styles.scss";
import { Colors } from "@app/config/styles";

export default function MovieList() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const [search, setSearch] = useState("");
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);

  useEffect(() => {
    // Only fetch if we haven't fetched before and don't have data
    if (!hasInitiallyFetched && movies.length === 0) {
      console.log("Fetching movies from Firebase...");
      dispatch(fetchMovies());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched, movies.length]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
      className="dashboard-section"
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
        <Typography variant="h4" mb={3}>
          Movies
        </Typography>
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            display: "flex",
            gap: { xs: 1, md: 2 },
            marginBottom: 3,
          }}
        >
          <AddMovie />
          <TextField
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
        </Box>
      </Box>

      {/* Movies grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr",
            lg: "1fr 1fr",
            xl: "1fr 1fr 1fr",
          },
          gap: { xs: 2, md: 2 },
          width: "100%",
          justifyContent: "center",
        }}
      >
        {filteredMovies.map((movie) => (
          <Grid key={movie.id} style={{ position: "relative" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "row", mb: "row" },
                alignItems: "center",
                gap: 5,
                p: 2,
              }}
            >
              <Box>
                <CardMedia
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500${movie.imageSrc}`}
                  alt={movie.title}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    width: { xs: 80, md: 140 },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", mb: "row" },
                  gap: 1,
                }}
              >
                <EditMovie movie={movie} showEditIcon={false}>
                  <Typography variant="h6" color={Colors.black}>
                    {movie.title}
                  </Typography>
                </EditMovie>
                <Typography variant="h6" color={Colors.black}>
                  {formatDate(movie.releaseDate, "D.M.YYYY")}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
