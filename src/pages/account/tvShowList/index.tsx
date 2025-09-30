import { useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  TextField,
  Checkbox,
  Box,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import { useEffect } from "react";
import {
  fetchTVShows,
  selectTVShows,
  TVShow,
  updateTVShowSeasons,
} from "@tvShows/store/tvShowSlice";
import AddTVShow from "@tvShows/components/AddTVShow";
import EditTVShow from "@tvShows/components/EditTVShow";
import { Colors } from "@app/config/styles";

export default function TVShowList() {
  const dispatch = useAppDispatch();
  const tvShows = useAppSelector(selectTVShows);
  const [search, setSearch] = useState("");
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);

  useEffect(() => {
    // Only fetch if we haven't fetched before and don't have data
    if (!hasInitiallyFetched) {
      //console.log("Fetching TV shows from Firebase...");
      dispatch(fetchTVShows());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched, tvShows.length]);

  // Handle search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  // Search filter
  const filteredTVShows = tvShows.filter((show) =>
    show.title.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle owned for a season and update Firebase
  const handleCheckboxChange = (show: TVShow, seasonNumber: number) => {
    const updatedSeasons = show.seasons.map((s) =>
      s.seasonNumber === seasonNumber ? { ...s, owned: !s.owned } : s
    );
    dispatch(updateTVShowSeasons({ id: show.id, seasons: updatedSeasons }));
  };

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
          {/* Search input */}
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
          <Grid key={show.id} style={{ position: "relative" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: 2, md: 2 },
                p: { xs: 3, md: 2 },
                pt: { xs: 6, md: 2 },
              }}
            >
              <EditTVShow tvshow={show} showEditIcon={false}>
                {/* TV Show title */}
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
                    xs: "repeat(3, 1fr)", // 3 per row on mobile
                    sm: "repeat(4, 1fr)", // 4 per row on small screens
                    md: "repeat(6, 1fr)", // 6 per row on desktop
                  },
                  pointerEvents: "auto", // Ensure checkboxes are clickable
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
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking checkbox
                  >
                    <Checkbox
                      checked={season.owned}
                      onChange={() =>
                        handleCheckboxChange(show, season.seasonNumber)
                      }
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
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
