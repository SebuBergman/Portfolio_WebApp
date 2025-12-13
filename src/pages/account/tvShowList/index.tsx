import {
  useState,
  ChangeEvent,
  useEffect,
  useMemo,
  memo,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import { TextField, Checkbox, Box, Typography, Card } from "@mui/material";
import {
  fetchTVShows,
  selectTVShows,
  TVShow,
  updateTVShowSeasons,
} from "@tvShows/store/tvShowSlice";
import AddTVShow from "@tvShows/components/AddTVShow";
import EditTVShow from "@tvShows/components/EditTVShow";
import { Colors } from "@app/config/styles";

// Memoized TV Show Card Component
const TVShowCard = memo(
  ({
    show,
    onCheckboxChange,
  }: {
    show: TVShow;
    onCheckboxChange: (show: TVShow, seasonNumber: number) => void;
  }) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 2, md: 2 },
        p: { xs: 3, md: 2 },
        pt: { xs: 3, md: 2 },
      }}
    >
      <EditTVShow tvshow={show} showEditIcon={false}>
        <Typography
          variant="h6"
          color={Colors.black}
          sx={{
            minWidth: { sm: "200px" },
            flexShrink: 0,
            mb: { xs: 1, sm: 0 },
          }}
        >
          {show.title}
        </Typography>
      </EditTVShow>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
          },
          pointerEvents: "auto",
        }}
      >
        {show.seasons.map((season) => (
          <Box
            key={season.seasonNumber}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 0,
              p: 1,
              borderRadius: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={season.owned}
              onChange={() => onCheckboxChange(show, season.seasonNumber)}
              sx={{
                color: "#729E65",
                "&.Mui-checked": { color: "#4e7c4a" },
                p: 0.5,
              }}
            />
            <Typography
              component="span"
              sx={{
                color: season.owned ? "#729E65" : "#fff",
                fontWeight: 500,
                userSelect: "none",
              }}
            >
              S{season.seasonNumber}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
);

TVShowCard.displayName = "TVShowCard";

export default function TVShowList() {
  const dispatch = useAppDispatch();
  const tvShows = useAppSelector(selectTVShows);
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

  // Fetch TV shows only once
  useEffect(() => {
    if (!hasInitiallyFetched) {
      dispatch(fetchTVShows());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched]);

  // Handle search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  // Memoized filtering
  const filteredTVShows = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();
    return tvShows.filter((show) =>
      show.title.toLowerCase().includes(searchLower)
    );
  }, [tvShows, debouncedSearch]);

  // Memoized checkbox handler
  const handleCheckboxChange = useCallback(
    (show: TVShow, seasonNumber: number) => {
      const updatedSeasons = show.seasons.map((s) =>
        s.seasonNumber === seasonNumber ? { ...s, owned: !s.owned } : s
      );
      dispatch(updateTVShowSeasons({ id: show.id, seasons: updatedSeasons }));
    },
    [dispatch]
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
          TV Shows
        </Typography>
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            display: "flex",
            gap: { xs: 1, md: 2 },
            marginBottom: 3,
          }}
        >
          <AddTVShow />
          <TextField
            placeholder="Search TV Shows…"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={search}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      {/* TV Shows grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
          },
          gap: { xs: 2, md: 2 },
          width: { xs: "100%", md: "65%" },
          justifyContent: "center",
        }}
      >
        {filteredTVShows.map((show) => (
          <div key={show.id} style={{ position: "relative" }}>
            <TVShowCard show={show} onCheckboxChange={handleCheckboxChange} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
