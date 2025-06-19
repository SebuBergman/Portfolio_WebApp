import { useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  fetchMovies,
  deleteMovie,
  updateMovie,
  selectMovies,
  Movie,
} from "@features/movieLibrary/movies/store/movieSlice";
import AddMovie from "@movies/components/AddMovie";
import AppButton from "@features/ui/AppButton";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
// Import styles
import "./styles.scss";
import { formatDate } from "@app/services/date";

export default function MovieList() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Movie>>({});

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (movie: Movie) => {
    setEditId(movie.id);
    setEditData(movie);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveEdit = () => {
    if (editId && editData.title) {
      dispatch(
        updateMovie({
          id: editId,
          title: editData.title,
        })
      );
      setEditId(null);
      setEditData({});
    }
  };

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
        Movies
      </Typography>
      <Box
        sx={{
          marginBottom: 2,
          width: { xs: "100%", md: "85%" },
          display: "flex",
          gap: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          <AddMovie />
        </Box>
        <Box sx={{ display: "flex", flex: 4 }}>
          <TextField
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <ul className="movieList">
          {filteredMovies.map((movie) => (
            <li key={movie.id} style={{ position: "relative" }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.imageSrc}`}
                alt={movie.title}
                style={{ width: 80 }}
              />
              {editId === movie.id ? (
                <span>
                  <input
                    name="title"
                    value={editData.title || ""}
                    onChange={handleEditChange}
                    placeholder="Title"
                  />
                  <Box gap={2} display="flex" mt={1}>
                    <AppButton isSmall onClick={saveEdit}>
                      Save
                    </AppButton>
                    <AppButton isSmall onClick={() => setEditId(null)}>
                      Cancel
                    </AppButton>
                  </Box>
                </span>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", mb: "row" },
                    alignItems: { mb: "row" },
                    gap: 1,
                  }}
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => startEdit(movie)}
                    title="Click to edit"
                  >
                    {movie.title}
                  </span>
                  <span>{formatDate(movie.releaseDate, "D.M.YYYY")}</span>
                </Box>
              )}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
              >
                <IconButton
                  color="error"
                  onClick={() => dispatch(deleteMovie(movie.id))}
                  sx={{ height: "40px" }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
