import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Tab,
  Tabs,
  Typography,
  Chip,
} from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { formatDate } from "@app/services/date";
import { Colors } from "@app/config/styles";
import { selectMovies } from "@movies/store/movieSlice";
import { selectTVShows } from "@tvShows/store/tvShowSlice";
import { selectBooks } from "@books/store/bookSlice";
import { selectVinyls } from "@vinyls/store/vinylSlice";
import {
  setRandomSelection,
  clearHistory,
  selectRandomizerHistory,
  selectCurrentSelection,
  RandomizerType,
} from "@randomizer/store/randomizerSlice";

// Unified type for rendering
type RandomizableItem = {
  id: string;
  title: string;
  imageSrc?: string;
  coverUrl?: string;
  releaseDate?: string;
  author?: string;
  artist?: string;
  year?: string;
};

function Randomizer() {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get data from Redux
  const movies = useAppSelector(selectMovies);
  const tvShows = useAppSelector(selectTVShows);
  const books = useAppSelector(selectBooks);
  const vinyls = useAppSelector(selectVinyls);
  const currentSelection = useAppSelector(selectCurrentSelection);

  // Map tab index to type
  const tabToType: RandomizerType[] = ["movies", "shows", "books", "vinyls"];
  const currentType = tabToType[tab];

  const history = useAppSelector((state) =>
    selectRandomizerHistory(state, currentType)
  );

  // Get the appropriate list based on current tab
  const getItemsList = (): RandomizableItem[] => {
    switch (currentType) {
      case "movies":
        return movies.map((m) => ({
          id: m.id,
          title: m.title,
          imageSrc: m.imageSrc,
          releaseDate: m.releaseDate,
        }));
      case "shows":
        return tvShows.map((s) => ({
          id: s.id,
          title: s.title,
        }));
      case "books":
        return books.map((b) => ({
          id: b.id,
          title: b.title,
          author: b.author,
          coverUrl: b.coverUrl,
        }));
      case "vinyls":
        return vinyls.map((v) => ({
          id: v.id,
          title: v.title,
          artist: v.artist,
          coverUrl: v.coverUrl,
          year: v.year,
        }));
      default:
        return [];
    }
  };

  const items = getItemsList();
  const availableItems = items.filter((item) => !history.includes(item.id));
  const selectedItem =
    currentSelection.type === currentType && currentSelection.id
      ? items.find((item) => item.id === currentSelection.id)
      : null;

  const handleRandomize = () => {
    if (availableItems.length === 0) {
      return;
    }

    setIsAnimating(true);

    // Animate for a bit before showing result
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableItems.length);
      const randomItem = availableItems[randomIndex];

      dispatch(
        setRandomSelection({
          type: currentType,
          id: randomItem.id,
        })
      );

      setIsAnimating(false);
    }, 800);
  };

  const handleClearHistory = () => {
    dispatch(clearHistory(currentType));
  };

  const handleTabChange = (_: any, val: number) => {
    setTab(val);
    setIsAnimating(false);
  };

  const renderItemDetails = (item: RandomizableItem) => {
    // Determine image source based on type
    const imageUrl = item.imageSrc
      ? `https://image.tmdb.org/t/p/w500${item.imageSrc}`
      : item.coverUrl || null;

    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          mt: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        {imageUrl && (
          <CardMedia
            component="img"
            src={imageUrl}
            alt={item.title}
            sx={{
              width: { xs: 150, md: 250 },
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: 2,
              mb: 3,
              boxShadow: 3,
            }}
          />
        )}
        <Typography variant="h4" color={Colors.black} mb={1} textAlign="center">
          {item.title}
        </Typography>

        {/* Movie-specific info */}
        {item.releaseDate && (
          <Typography variant="h6" color="text.secondary">
            {formatDate(item.releaseDate, "D.M.YYYY")}
          </Typography>
        )}

        {/* Book-specific info */}
        {item.author && (
          <Typography variant="h6" color="text.secondary">
            by {item.author}
          </Typography>
        )}

        {/* Vinyl-specific info */}
        {item.artist && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              {item.artist}
            </Typography>
            {item.year && (
              <Typography variant="body1" color="text.secondary" mt={0.5}>
                {item.year}
              </Typography>
            )}
          </Box>
        )}
      </Card>
    );
  };

  const getEmptyStateEmoji = () => {
    switch (currentType) {
      case "movies":
        return "🎬";
      case "shows":
        return "📺";
      case "books":
        return "📚";
      case "vinyls":
        return "💿";
      default:
        return "🎲";
    }
  };

  const getTypeName = (plural = true) => {
    if (!plural) {
      return currentType.slice(0, -1);
    }
    return currentType;
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
      <Box>
        <Typography variant="h4" mb={3}>
          Randomizer
        </Typography>
      </Box>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Movies" />
        <Tab label="TV Shows" />
        <Tab label="Books" />
        <Tab label="Vinyls" />
      </Tabs>

      {/* Main content area */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Status chips */}
        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          <Chip
            label={`Available: ${availableItems.length}`}
            color="primary"
            variant="outlined"
            size="medium"
          />
          <Chip
            label={`Selected: ${history.length}`}
            color="secondary"
            variant="outlined"
            size="medium"
          />
          <Chip
            label={`Total: ${items.length}`}
            variant="outlined"
            size="medium"
            color="success"
          />
        </Box>

        {/* Action buttons */}
        <Box display="flex" gap={2} width="100%" maxWidth={400}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShuffleIcon />}
            onClick={handleRandomize}
            disabled={availableItems.length === 0 || isAnimating}
            fullWidth
            sx={{ py: 1.5 }}
          >
            {isAnimating ? "Randomizing..." : "Pick Random"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<RestartAltIcon />}
            onClick={handleClearHistory}
            disabled={history.length === 0}
            sx={{ minWidth: 120 }}
          >
            Reset
          </Button>
        </Box>

        {/* Selected item display */}
        <Box sx={{ width: "100%", minHeight: 400 }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {getEmptyStateEmoji()}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                No {getTypeName()} available
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Add some {getTypeName()} to your collection first!
              </Typography>
            </Box>
          ) : isAnimating ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography
                variant="h1"
                sx={{
                  animation: "pulse 0.8s infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 1, transform: "scale(1)" },
                    "50%": { opacity: 0.5, transform: "scale(1.1)" },
                  },
                }}
              >
                {getEmptyStateEmoji()}
              </Typography>
              <Typography variant="h6" color="text.secondary" mt={2}>
                Picking a random {getTypeName(false)}...
              </Typography>
            </Box>
          ) : selectedItem ? (
            renderItemDetails(selectedItem)
          ) : (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {getEmptyStateEmoji()}
              </Typography>
              {availableItems.length === 0 ? (
                <>
                  <Typography variant="h6" color="text.secondary">
                    All {getTypeName()} have been selected!
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Click "Reset" to start over
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6" color="text.secondary">
                    Ready to pick a random {getTypeName(false)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Click "Pick Random" to get started!
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Box>

        {/* Progress stats */}
        {items.length > 0 && history.length > 0 && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              You've selected {history.length} of {items.length} {getTypeName()}{" "}
              ({Math.round((history.length / items.length) * 100)}
              %)
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Randomizer;
