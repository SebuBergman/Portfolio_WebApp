import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppDispatch } from "@store/index";
import { fetchBooks } from "@books/store/bookSlice";
import { fetchMovies } from "@movies/store/movieSlice";
import { fetchVinyls } from "@vinyls/store/vinylSlice";
import { fetchTVShows } from "@tvShows/store/tvShowSlice";
import { fetchCountdowns } from "@countdowns/store/countdownSlice";

export default function SidebarRefreshButton() {
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    dispatch(fetchBooks());
    dispatch(fetchMovies());
    dispatch(fetchVinyls());
    dispatch(fetchTVShows());
    dispatch(fetchCountdowns());
  };

  return (
    <Tooltip title="Refresh Library">
      <IconButton
        onClick={handleRefresh}
        sx={{
          color: "black",
          "&:hover": { color: "#729E65" },
        }}
      >
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  );
}
