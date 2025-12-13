import { useEffect, useState, useMemo, ChangeEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import { fetchMovies, selectMovies, Movie } from "@movies/store/movieSlice";
import AddMovie from "@movies/components/AddMovie";
import EditMovie from "@movies/components/EditMovie";
import { Box, Card, CardMedia, TextField, Typography } from "@mui/material";
import { formatDate } from "@app/services/date";
import "./styles.scss";
import { Colors } from "@app/config/styles";

// Memoized Movie Card Component
const MovieCard = memo(({ movie }: { movie: Movie }) => (
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
        loading="lazy"
        src={`https://image.tmdb.org/t/p/w500${movie.imageSrc}`}
        alt={movie.title}
        sx={{
          backgroundColor: "#f0f0f0",
          width: { xs: 120, md: 140 },
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
));

MovieCard.displayName = "MovieCard";

export default function MovieList() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch movies only once
  useEffect(() => {
    if (!hasInitiallyFetched) {
      dispatch(fetchMovies());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched]);

  // Memoized filtering
  const filteredMovies = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchLower)
    );
  }, [movies, debouncedSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

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
          <div key={movie.id} style={{ position: "relative" }}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
