import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@store/index";
import ReusableModal from "@features/ui/reusableModal";
import AppButton from "@features/ui/AppButton";
import { Box, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

// Import styles
import "./styles.scss";
import { addMovie, Movie } from "../store/movieSlice";
import { selectUser } from "@features/auth/store/authSlice";
import { formatDate } from "@app/services/date";

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

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: FormEvent) => {
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
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (movie: MovieDBMovie) => {
    const newMovie: Movie = {
      id: movie.id.toString(),
      title: movie.title,
      imageSrc: movie.poster_path,
      releaseDate: movie.release_date,
      isExpanded: false,
      ownerId: uid,
    };
    dispatch(addMovie(newMovie));
    toast.success(`Added "${movie.title}"!`);
  };

  // Content for the modal
  const modalContent = (
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
        />
        <AppButton
          type="submit"
          disabled={loading}
          sx={{ marginLeft: 2, height: 56 }}
        >
          {loading ? "Searching…" : "Search"}
        </AppButton>
      </form>
      {results.length > 0 && (
        <ul className="add-movie-ul">
          {results.map((movie) => (
            <li key={movie.id} className="add-movie-li">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
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
                  gap: 1,
                  flex: 1,
                }}
              >
                <span style={{ flex: 1, color: "#fff" }}>{movie.title} </span>
                <span style={{ color: "#fff", fontSize: "0.9rem" }}>
                  Release date: {formatDate(movie.release_date, "MM D, YYYY")}
                </span>
              </Box>
              <AppButton
                type="button"
                onClick={() => handleAdd(movie)}
                sx={{ marginLeft: 2, height: 40, fontWeight: 600 }}
              >
                Add
              </AppButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <AppButton fullWidth onClick={handleOpen}>
        Add Movie
      </AppButton>
      <ReusableModal
        open={modalOpen}
        onClose={handleClose}
        title="Add Movie"
        subtitle="Search for a movie from MovieDB and add it to your list."
        content={modalContent}
        // No Save button; all actions are in modalContent
      />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          style: {
            padding: "20px",
            fontSize: "24px",
          },
        }}
      />
    </>
  );
}
