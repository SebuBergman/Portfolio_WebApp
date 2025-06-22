import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import {
  Book,
  deleteBook,
  fetchBooks,
  selectBooks,
  editBook,
} from "@books/store/bookSlice";
import AddBook from "@books/components/AddBook";
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear";
import { Colors } from "@app/config/styles";

type EditingState = { id: string; field: "title" | "author" } | null;

export default function BookList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditingState>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filtering logic
  const booksByTab =
    tab === 0
      ? books
      : books.filter((book: Book) =>
          book.author.toLowerCase().includes("agatha christie")
        );

  const filteredBooks = booksByTab.filter(
    (book: Book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id?: string) => {
    if (id) dispatch(deleteBook(id));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Start editing on click
  const handleEditStart = (
    id: string,
    field: "title" | "author",
    initialValue: string
  ) => {
    if (!id) return;
    setEditing({ id, field });
    setEditValue(initialValue);
  };

  // Save edit (on blur or Enter)
  const handleEditSave = async (book: Book) => {
    if (!editing) {
      return;
    }
    if (!editValue.trim()) {
      setEditing(null);
      return;
    }
    if (
      (editing.field === "title" && editValue.trim() !== book.title) ||
      (editing.field === "author" && editValue.trim() !== book.author)
    ) {
      await dispatch(
        editBook({
          id: book.id,
          title: editing.field === "title" ? editValue.trim() : book.title,
          author: editing.field === "author" ? editValue.trim() : book.author,
          coverUrl: book.coverUrl,
        })
      );
    }
    setEditing(null);
  };

  // Cancel edit on Escape
  const handleEditKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    book: Book
  ) => {
    if (e.key === "Enter") {
      handleEditSave(book);
    } else if (e.key === "Escape") {
      setEditing(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 1175,
        margin: "auto",
        color: "black",
      }}
    >
      <Typography variant="h4" gutterBottom mb={3}>
        Books
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 1, md: 2 },
          mb: 3,
          width: { xs: "100%", md: "80%" },
        }}
      >
        <AddBook />
        <TextField
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title or author…"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 3 }}>
        <Tab label="All Books" />
        <Tab label="Agatha Christie" />
      </Tabs>

      <Grid container spacing={2}>
        {filteredBooks.map((book: Book) => (
          <Grid key={book.id} style={{ position: "relative" }}>
            <Card sx={{ width: { xs: 155, md: 220 } }}>
              {book.coverUrl ? (
                <CardMedia
                  component="img"
                  image={book.coverUrl}
                  alt={book.title}
                  sx={{
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                    height: { xs: "160px", md: "337px" },
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
                {editing &&
                editing.id === book.id &&
                editing.field === "title" ? (
                  <TextField
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleEditSave(book)}
                    onKeyDown={(e) =>
                      handleEditKeyDown(
                        e as KeyboardEvent<HTMLInputElement>,
                        book
                      )
                    }
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    color={Colors.black}
                    sx={{
                      mb: 1,
                      cursor: "pointer",
                      fontSize: { xs: "1em", md: "1.2em" },
                      lineHeight: {
                        xs: "1.4em !important",
                        md: "1.5em !important",
                      },
                    }}
                    onClick={() =>
                      handleEditStart(book.id, "title", book.title)
                    }
                  >
                    {book.title}
                  </Typography>
                )}
                {/* Author */}
                {editing &&
                editing.id === book.id &&
                editing.field === "author" ? (
                  <TextField
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleEditSave(book)}
                    onKeyDown={(e) =>
                      handleEditKeyDown(
                        e as KeyboardEvent<HTMLInputElement>,
                        book
                      )
                    }
                    variant="standard"
                    fullWidth
                  />
                ) : (
                  <Typography
                    variant="subtitle1"
                    color={Colors.black}
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      handleEditStart(book.id, "author", book.author)
                    }
                  >
                    {book.author}
                  </Typography>
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
                    onClick={() => handleDelete(book.id)}
                    sx={{
                      height: "40px",
                      color: "black",
                      bgcolor: "white",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#EB5757",
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
