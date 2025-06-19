import { useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import {
  Book,
  deleteBook,
  fetchBooks,
  selectBooks,
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
  Button,
  TextField, // <-- Import TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Colors } from "@app/config/styles";

export default function BookList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState(""); // <-- Add search state
  const [openDialog, setOpenDialog] = useState(false);
  const [editBookObj, setEditBookObj] = useState<Book | null>(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filtering logic: filter by tab and then by search
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
          gap: 1,
          mb: 3,
          width: "100%",
        }}
      >
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
          onClick={() => {
            setEditBookObj(null);
            setOpenDialog(true);
          }}
        ></Button>
        {/* Add search box here */}
        <TextField
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title or author…"
          variant="outlined"
          sx={{ width: { xs: "100%", md: 400 } }}
        />
      </Box>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 3 }}>
        <Tab label="All Books" />
        <Tab label="Agatha Christie" />
      </Tabs>

      <Grid container spacing={2}>
        {filteredBooks.map((book: Book) => (
          <Grid container key={book.id}>
            <Card sx={{ width: { xs: 160, md: 220 } }}>
              {book.coverUrl ? (
                <CardMedia
                  component="img"
                  height="337"
                  image={book.coverUrl}
                  alt={book.title}
                  sx={{ objectFit: "cover", backgroundColor: "#f0f0f0" }}
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
                <Typography variant="h6" color={Colors.black} sx={{ mb: 1 }}>
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color={Colors.black}>
                  {book.author}
                </Typography>
                <Box mt={1}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditBookObj(book);
                      setOpenDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(book.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddBook
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        editBookObj={editBookObj}
      />
    </Box>
  );
}
