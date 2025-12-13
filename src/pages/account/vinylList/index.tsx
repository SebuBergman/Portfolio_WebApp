import { useEffect, useState, useMemo, ChangeEvent, memo } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import { fetchVinyls, selectVinyls, Vinyl } from "@vinyls/store/vinylSlice";
import {
  Box,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Colors } from "@app/config/styles";
import AddVinyl from "@vinyls/components/AddVinyl";
import EditVinyl from "@vinyls/components/EditVinyl";

// Memoized Vinyl Card Component
const VinylCard = memo(({ vinyl }: { vinyl: Vinyl }) => (
  <EditVinyl vinyl={vinyl} showEditIcon={false}>
    <Card sx={{ width: "100%", height: "100%", cursor: "pointer" }}>
      {vinyl.coverUrl ? (
        <CardMedia
          component="img"
          loading="lazy"
          image={vinyl.coverUrl}
          alt={vinyl.title}
          sx={{
            backgroundColor: "#f0f0f0",
            width: "100%",
            aspectRatio: "2 / 2",
            objectFit: "cover",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            No Cover
          </Typography>
        </Box>
      )}

      <CardContent>
        <Typography
          variant="h6"
          color={Colors.black}
          sx={{ mb: 1, cursor: "pointer", wordWrap: "break-word" }}
        >
          {vinyl.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color={Colors.black}
          sx={{ cursor: "pointer" }}
        >
          {vinyl.artist}
        </Typography>
        <Typography
          variant="body2"
          color={Colors.black}
          sx={{ cursor: "pointer" }}
        >
          {vinyl.year}
        </Typography>
      </CardContent>
    </Card>
  </EditVinyl>
));

VinylCard.displayName = "VinylCard";

export default function VinylList() {
  const dispatch = useAppDispatch();
  const vinyls = useAppSelector(selectVinyls);
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

  // Fetch vinyls only once
  useEffect(() => {
    if (!hasInitiallyFetched) {
      dispatch(fetchVinyls());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched]);

  // Memoized filtering and sorting
  const filteredVinyls = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();
    return vinyls
      .filter(
        (v) =>
          v.artist.toLowerCase().includes(searchLower) ||
          v.title.toLowerCase().includes(searchLower)
      )
      .sort((a, b) =>
        a.artist.toLowerCase().localeCompare(b.artist.toLowerCase())
      );
  }, [vinyls, debouncedSearch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        color: "black",
      }}
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
        <Typography variant="h4" gutterBottom mb={3}>
          Vinyl Collection
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 3,
            width: { xs: "100%", md: "80%" },
          }}
        >
          <AddVinyl />
          <TextField
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search by title or artist…"
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>

      {/* Vinyl grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "1fr 1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr 1fr",
          },
          gap: { xs: 2, md: 2 },
          width: "100%",
          justifyContent: "center",
        }}
      >
        {filteredVinyls.map((v) => (
          <div key={v.id} style={{ position: "relative" }}>
            <VinylCard vinyl={v} />
          </div>
        ))}
      </Box>
    </Box>
  );
}
