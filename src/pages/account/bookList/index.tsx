import { useEffect, useState, useMemo, ChangeEvent, memo } from "react";
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

// Memoized Book Card Component
const BookCard = memo(({ book }: { book: Book }) => (
  <EditBook book={book} showEditIcon={false}>
    <Card
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
    >
      {book.coverUrl ? (
        <CardMedia
          component="img"
          loading="lazy"
          image={book.coverUrl}
          alt={book.title}
          sx={{
            backgroundColor: "#f0f0f0",
            width: "100%",
            aspectRatio: "2 / 3",
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

        <Typography variant="subtitle1" color={Colors.black}>
          {book.author}
        </Typography>
      </CardContent>
    </Card>
  </EditBook>
));

BookCard.displayName = "BookCard";

export default function BookList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const [tab, setTab] = useState(0);
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

  // Fetch books only once
  useEffect(() => {
    if (!hasInitiallyFetched) {
      dispatch(fetchBooks());
      setHasInitiallyFetched(true);
    }
  }, [dispatch, hasInitiallyFetched]);

  // Memoized sorting and filtering
  const sortedAndFilteredBooks = useMemo(() => {
    // Filter by tab
    const booksByTab =
      tab === 0
        ? books
        : books.filter((book: Book) =>
            book.author.toLowerCase().includes("agatha christie")
          );

    // Filter by search (both title and author)
    const searchLower = debouncedSearch.toLowerCase();
    const filtered = booksByTab.filter(
      (book: Book) =>
        book.author.toLowerCase().includes(searchLower) ||
        book.title.toLowerCase().includes(searchLower)
    );

    // Sort by author, then by title
    return filtered.sort((a, b) => {
      const authorCmp = a.author
        .toLowerCase()
        .localeCompare(b.author.toLowerCase());
      if (authorCmp === 0) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      return authorCmp;
    });
  }, [books, tab, debouncedSearch]);

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

      {/* Optimized books grid with standard CSS Grid */}
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
        {sortedAndFilteredBooks.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Box>
    </Box>
  );
}
