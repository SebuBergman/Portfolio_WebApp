import { useEffect, useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Colors } from "@app/config/styles";

export default function BookList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editBookObj, setEditBookObj] = useState<Book | null>(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks =
    tab === 0
      ? books
      : books.filter((book: Book) =>
          book.author.toLowerCase().includes("agatha christie")
        );

  const handleDelete = (id?: string) => {
    if (id) dispatch(deleteBook(id));
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
        color: "black",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 3 }}>
        <Tab label="All Books" />
        <Tab label="Agatha Christie" />
      </Tabs>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {
          setEditBookObj(null);
          setOpenDialog(true);
        }}
        sx={{ mb: 4 }}
      >
        Add Book
      </Button>
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
