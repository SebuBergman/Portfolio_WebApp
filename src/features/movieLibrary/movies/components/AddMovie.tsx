import { useState, ChangeEvent, FormEvent, useCallback, useMemo } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@store/index";
import AppButton from "@features/ui/AppButton";
import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import ReusableModal from "@features/ui/ReusableModal";
import { addMovie, Movie } from "../store/movieSlice";
import { selectUser } from "@features/auth/store/authSlice";
import "./styles.scss";
import { formatDate } from "@app/services/date";
import { Add } from "@mui/icons-material";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface MovieDBMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export default function AddMovie() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uid = user?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieDBMovie[]>([]);
  const [loading, setLoading] = useState(false);

  // Memoized callbacks
  const handleOpen = useCallback(() => setModalOpen(true), []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );
        setResults(res.data.results || []);
      } catch (err) {
        console.error("Failed to search movies:", err);
        toast.error(
          "Failed to find Movie. Perhaps it's not the movie you're looking for..."
        );
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const handleAdd = useCallback(
    async (movie: MovieDBMovie) => {
      setLoading(true);
      const toastId = toast.loading(
        "Summoning the Force... your Movie is being added..."
      );

      try {
        const newMovie: Movie = {
          id: movie.id.toString(),
          title: movie.title,
          imageSrc: movie.poster_path,
          releaseDate: movie.release_date,
          isExpanded: false,
          ownerId: uid,
        };

        await dispatch(addMovie(newMovie));
        toast.success(
          "Movie added successfully! This one is strong with the Force.",
          {
            id: toastId,
          }
        );
      } catch (error) {
        console.error("Failed to add movie:", error);
        toast.error(
          "Failed to add Movie. Perhaps it's not the movie you're looking for...",
          {
            id: toastId,
          }
        );
      } finally {
        setLoading(false);
      }
    },
    [uid, dispatch]
  );

  // Memoized movie results list
  const movieResults = useMemo(() => {
    if (results.length === 0) return null;

    return (
      <ul className="add-movie-ul">
        {results.map((movie) => (
          <li key={movie.id} className="add-movie-li">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
              style={{
                width: 120,
                marginRight: 16,
                borderRadius: 8,
                background: "#222",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1,
                  flex: 1,
                }}
              >
                <span style={{ flex: 1, color: "#fff" }}>{movie.title}</span>
                <span style={{ color: "#fff", fontSize: "0.9rem" }}>
                  Release date: {formatDate(movie.release_date, "D.M.YYYY")}
                </span>
              </Box>
              <AppButton
                type="button"
                onClick={() => handleAdd(movie)}
                sx={{ height: 40, fontWeight: 600 }}
                disabled={loading}
              >
                Add
              </AppButton>
            </Box>
          </li>
        ))}
      </ul>
    );
  }, [results, loading, handleAdd]);

  // Memoized modal content
  const modalContent = useMemo(
    () => (
      <div style={{ position: "relative" }} className="dashboard-section">
        <form
          onSubmit={handleSearch}
          style={{ marginBottom: "1rem", marginTop: 8 }}
        >
          <TextField
            type="text"
            placeholder="Search for movies to add…"
            value={query}
            onChange={handleQueryChange}
            sx={{
              width: { xs: "65%", md: "70%" },
              background: "#181818",
              "& input": { color: "#fff" },
              "& fieldset": { borderColor: "#729E65" },
              "& label": { color: "#ccc" },
              borderRadius: 3,
            }}
            InputProps={{
              style: { borderRadius: 10, color: "#fff" },
            }}
            autoFocus
            fullWidth
            disabled={loading}
          />
          <AppButton
            type="submit"
            disabled={loading || !query.trim()}
            sx={{ marginLeft: 2, height: 56 }}
          >
            {loading ? "Searching…" : "Search"}
          </AppButton>
        </form>
        {movieResults}
      </div>
    ),
    [handleSearch, query, loading, handleQueryChange, movieResults]
  );

  return (
    <>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& .MuiButton-startIcon": {
            marginRight: 0,
            marginLeft: 0,
          },
          height: 56,
        }}
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
        aria-label="Add movie"
      />
      <ReusableModal
        open={modalOpen}
        onClose={handleClose}
        title="Add Movie"
        subtitle="Search for a movie from MovieDB and add it to your list."
        content={modalContent}
      />
    </>
  );
}
