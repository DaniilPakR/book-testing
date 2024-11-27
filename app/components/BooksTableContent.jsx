"use server";

import { Container, Table, Form, Button, InputGroup } from "react-bootstrap";

import { generateFakeBooks } from "../utils/utils";
import BooksTableItem from "./BooksTableItem";

export default async function BooksTableContent({
  onLanguageChange,
  onSeedChange,
  onLikesChange,
  onReviewsChange,
  language,
  seed,
  onRandomizeSeed,
  likes,
  reviews,
  onBooksChange,
  moreBooks
}) {
  const books = generateFakeBooks(
    seed,
    reviews,
    likes,
    moreBooks,
    language
  );

  onBooksChange(books);

  return (
    <Container className="books-table flex flex-col">
      <Form className="bg-slate-50 p-4 rounded-xl mb-4 mt-4 flex flex-row gap-1 justify-between">
        <Form.Group className="w-1/5">
          <Form.Label>Language & Region</Form.Label>
          <Form.Select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
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
              onChange={(e) => onSeedChange(e.target.value)}
            />
            <Button variant="secondary" onClick={onRandomizeSeed}>
              🔀
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="w-1/5">
          <Form.Label>Average Likes per Book</Form.Label>
          <Form.Range
            value={likes}
            min={0}
            max={10}
            step={0.1}
            onChange={(e) => onLikesChange(e.target.value)}
          />
          <Form.Text>{likes.toFixed(1)} likes per book</Form.Text>
        </Form.Group>

        <Form.Group className="w-1/5">
          <Form.Label>Average Reviews per Book</Form.Label>
          <Form.Control
            type="number"
            value={reviews}
            step={0.1}
            onChange={(e) => onReviewsChange(e.target.value)}
          />
          <Form.Text>{reviews.toFixed(1)} reviews per book</Form.Text>
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
