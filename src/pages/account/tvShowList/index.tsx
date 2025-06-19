import { useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  TextField,
  Checkbox,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import {
  deleteTVShow,
  fetchTVShows,
  selectTVShows,
  TVShow,
  updateTVShowSeasons,
} from "@tvShows/store/tvShowSlice";
import AddTVShow from "@tvShows/components/addTVShow";
import { Delete } from "@mui/icons-material";

export default function TVShowList() {
  const dispatch = useAppDispatch();
  const tvShows = useAppSelector(selectTVShows);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTVShows());
  }, [dispatch]);

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

  const handleDelete = (id?: string) => {
    if (id) dispatch(deleteTVShow(id));
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
        TV Shows
      </Typography>
      <Box
        sx={{
          marginBottom: 2,
          width: { xs: "100%", md: "85%" },
          display: "flex",
          gap: { xs: 1, md: 1 },
        }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          <AddTVShow />
        </Box>
        <Box sx={{ display: "flex", flex: { xs: 2.8, md: 4 } }}>
          {/* Search input */}
          <TextField
            label="Search TV Shows…"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={search}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      <Box
        sx={{
          marginBottom: 2,
          width: "100%",
          display: "flex",
          gap: 2,
        }}
      >
        {/* TV Shows List */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          {filteredTVShows.map((show) => (
            <li
              key={show.id}
              style={{
                background: "#232527",
                borderRadius: "0.7rem",
                padding: "1rem 1.5rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                position: "relative",
              }}
            >
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
                  onClick={() => handleDelete(show.id)}
                  aria-label="Delete TV Show"
                  size="small"
                >
                  <Delete />
                </IconButton>
              </Box>
              {/* TV Show content */}
              <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                {show.title}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {show.seasons.map((season) => (
                  <Box
                    key={season.seasonNumber}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Checkbox
                      checked={season.owned}
                      onChange={() =>
                        handleCheckboxChange(show, season.seasonNumber)
                      }
                      sx={{
                        color: "#729E65",
                        "&.Mui-checked": {
                          color: "#4e7c4a",
                        },
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
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
