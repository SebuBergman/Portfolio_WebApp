import { useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import { Book, fetchBooks, selectBooks } from "@books/store/bookSlice";
import AddBook from "@books/components/AddBook";
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Colors } from "@app/config/styles";
import EditBook from "@features/movieLibrary/books/components/EditBook";

export default function BookList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [hasInitiallyFetched, setHasInitiallyFetched] = useState(false);

  useEffect(() => {
    // Only fetch if we haven't fetched before and don't have data
    if (!hasInitiallyFetched) {
      //console.log("Fetching books from Firebase...");
      dispatch(fetchBooks());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched, books.length]);

  // Sorting function for books (by author, then by title)
  const sortBooksByAuthorThenTitle = (books: Book[]) => {
    return books.sort((a, b) => {
      // First sort by author
      const authorComparison = a.author
        .toLowerCase()
        .localeCompare(b.author.toLowerCase());

      // If authors are the same, sort by title
      if (authorComparison === 0) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }

      return authorComparison;
    });
  };

  // Filtering logic
  const booksByTab =
    tab === 0
      ? books
      : books
          .filter((book: Book) =>
            book.author.toLowerCase().includes("agatha christie")
          )
          .sort((a: { title: string }, b: { title: string }) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );

  const filteredBooks = sortBooksByAuthorThenTitle(
    booksByTab.filter((book: Book) =>
      book.author.toLowerCase().includes(search.toLowerCase())
    )
  );

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
          Books
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 2 },
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
      </Box>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 3 }}>
        <Tab label="All Books" />
        <Tab label="Agatha Christie" />
      </Tabs>

      {/* Books grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "1fr 1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr 1fr",
            xxl: "1fr 1fr 1fr 1fr 1fr",
            xxxl: "1fr 1fr 1fr 1fr 1fr 1fr",
          },
          gap: { xs: 2, md: 2 },
          width: "100%",
          justifyContent: "center",
        }}
      >
        {filteredBooks.map((book: Book) => (
          <Grid key={book.id} style={{ position: "relative" }}>
            {/* Single EditBook wrapper for the entire card */}
            <EditBook book={book} showEditIcon={false}>
              <Card
                sx={{
                  width: { xs: "100%", md: "100%" },
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                {/* Cover image */}
                {book.coverUrl ? (
                  <CardMedia
                    component="img"
                    image={book.coverUrl}
                    alt={book.title}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      width: "100%",
                      aspectRatio: "2 / 3",
                      objectFit: "cover",
                      borderRadius: 2,
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
                  <Typography
                    variant="h6"
                    color={Colors.black}
                    sx={{
                      mb: 1,
                      fontSize: { xs: "1em", md: "1.2em" },
                      lineHeight: {
                        xs: "1.4em !important",
                        md: "1.5em !important",
                      },
                    }}
                  >
                    {book.title}
                  </Typography>

                  {/* Author */}
                  <Typography variant="subtitle1" color={Colors.black}>
                    {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </EditBook>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
