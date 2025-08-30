import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import {
  Vinyl,
  deleteVinyl,
  fetchVinyls,
  editVinyl,
  selectVinyls,
} from "@vinyls/store/vinylSlice";
import {
  Box,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear";
import AddVinyl from "@vinyls/components/addVinyl";

type EditingState = { id: string; field: "title" | "artist" | "year" } | null;

export default function VinylList() {
  const dispatch = useAppDispatch();
  const vinyls = useAppSelector(selectVinyls);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditingState>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    dispatch(fetchVinyls());
  }, [dispatch]);

  const filteredVinyls = vinyls.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.artist.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id?: string) => {
    if (id) dispatch(deleteVinyl(id));
  };

  const handleEditStart = (
    id: string,
    field: "title" | "artist" | "year",
    value: string
  ) => {
    setEditing({ id, field });
    setEditValue(value);
  };

  const handleEditSave = async (v: Vinyl) => {
    if (!editing) return;
    if (!editValue.trim()) {
      setEditing(null);
      return;
    }
    await dispatch(editVinyl({ ...v, [editing.field]: editValue.trim() }));
    setEditing(null);
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>, v: Vinyl) => {
    if (e.key === "Enter") handleEditSave(v);
    else if (e.key === "Escape") setEditing(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 1175,
        margin: "auto",
        color: "black",
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

      <Grid container spacing={2}>
        {filteredVinyls.map((v) => (
          <Grid key={v.id} style={{ position: "relative" }}>
            <Card sx={{ width: { xs: 155, md: 220 } }}>
              {v.coverUrl ? (
                <CardMedia
                  component="img"
                  image={v.coverUrl}
                  alt={v.title}
                  sx={{
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                    height: { xs: 160, md: 337 },
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
                {/* Title */}
                {editing && editing.id === v.id && editing.field === "title" ? (
                  <TextField
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleEditSave(v)}
                    onKeyDown={(e) =>
                      handleEditKeyDown(e as KeyboardEvent<HTMLInputElement>, v)
                    }
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, cursor: "pointer" }}
                    onClick={() => handleEditStart(v.id, "title", v.title)}
                  >
                    {v.title}
                  </Typography>
                )}
                {/* Artist */}
                {editing &&
                editing.id === v.id &&
                editing.field === "artist" ? (
                  <TextField
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleEditSave(v)}
                    onKeyDown={(e) =>
                      handleEditKeyDown(e as KeyboardEvent<HTMLInputElement>, v)
                    }
                    variant="standard"
                    fullWidth
                  />
                ) : (
                  <Typography
                    variant="subtitle1"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleEditStart(v.id, "artist", v.artist)}
                  >
                    {v.artist}
                  </Typography>
                )}
                {/* Year */}
                {editing && editing.id === v.id && editing.field === "year" ? (
                  <TextField
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleEditSave(v)}
                    onKeyDown={(e) =>
                      handleEditKeyDown(e as KeyboardEvent<HTMLInputElement>, v)
                    }
                    variant="standard"
                    fullWidth
                  />
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleEditStart(v.id, "year", v.year || "")}
                  >
                    {v.year}
                  </Typography>
                )}

                <IconButton
                  onClick={() => handleDelete(v.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "white",
                    "&:hover": { color: "#EB5757" },
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
