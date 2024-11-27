"use client";

import { useEffect, useState, useRef } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  InputGroup,
  Accordion,
  Image,
} from "react-bootstrap";

import BooksTableItem from "./BooksTableItem";

export default function BooksTable() {
  const [language, setLanguage] = useState("EN");
  const [seed, setSeed] = useState(42);
  const [likesPerBook, setLikesPerBook] = useState(3.7);
  const [reviewsPerBook, setReviewsPerBook] = useState(0);
  const [books, setBooks] = useState([]);
  const [generateMoreBooks, setGenerateMoreBooks] = useState(0);
  const isFirstRender = useRef(true);

  async function fetchBooks(pageIndex = 0) {
    const query = new URLSearchParams({
      seed: seed.toString(),
      pageIndex: pageIndex.toString(),
      reviews: reviewsPerBook.toString(),
      likes: likesPerBook.toString(),
      language: language,
    }).toString();

    const response = await fetch(`/api/books?${query}`);
    const newBooksData = await response.json();
    return newBooksData;
  }

  useEffect(() => {
    async function getBooks() {
      const newBooks = await fetchBooks();
      setBooks(newBooks);
    }
    getBooks();
  }, [language, seed, likesPerBook, reviewsPerBook]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    async function addMoreBooks() {
      const additionalBooks = await fetchBooks(generateMoreBooks);
      setBooks((oldBooks) => [...oldBooks, ...additionalBooks]);
    }
    addMoreBooks();
  }, [generateMoreBooks]);

  function randomizeSeed() {
    setSeed(Math.floor(Math.random() * 1000000));
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setGenerateMoreBooks((prev) => {
        const updated = prev + 1;
        console.log(`Previous: ${prev}, Updated: ${updated}`);
        return updated;
      });
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container className="books-table flex flex-col">
      <Form className="bg-slate-50 p-4 rounded-xl mb-4 mt-4 flex flex-row gap-1 justify-between">
        <Form.Group className="w-1/5">
          <Form.Label>Language & Region</Form.Label>
          <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="EN">English (USA)</option>
            <option value="RU">Russian (Russia)</option>
            <option value="JA">Japanese (Japan)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="w-1/5">
          <Form.Label>Seed Value</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
            />
            <Button variant="secondary" onClick={randomizeSeed}>
              🔀
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="w-1/5">
          <Form.Label>Average Likes per Book</Form.Label>
          <Form.Range
            value={likesPerBook}
            min={0}
            max={10}
            step={0.1}
            onChange={(e) => setLikesPerBook(Number(e.target.value))}
          />
          <Form.Text>{likesPerBook.toFixed(1)} likes per book</Form.Text>
        </Form.Group>

        <Form.Group className="w-1/5">
          <Form.Label>Average Reviews per Book</Form.Label>
          <Form.Control
            type="text" // Keep text type for flexible input handling
            value={reviewsPerBook.toString()} // Ensure the value is always a string
            onChange={(e) => {
              let value = e.target.value;

              // Allow only valid characters (digits, one ".", and no extra characters)
              if (/^\d*\.?\d*$/.test(value)) {
                setReviewsPerBook(value); // Temporarily store as string
              }
            }}
            onBlur={() => {
              // Convert back to a float on blur
              if (reviewsPerBook !== "") {
                setReviewsPerBook(parseFloat(reviewsPerBook) || 0); // Fallback to 0 if input is invalid
              }
            }}
          />
          <Form.Text>
            {reviewsPerBook && !isNaN(parseFloat(reviewsPerBook))
              ? parseFloat(reviewsPerBook).toFixed(1) + " reviews per book"
              : "0.0 reviews per book"}
          </Form.Text>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <BooksTableItem book={book} key={index} index={index} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
