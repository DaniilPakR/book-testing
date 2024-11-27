"use client";

import React, { useState } from "react";

import { Button, Accordion, Image } from "react-bootstrap";

export default function BooksTableItem({ book, index }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <React.Fragment>
      <tr>
        <td>{index + 1}</td>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.authors.join(", ")}</td>
        <td>{book.publisher}</td>
        <td>
          <Button
            variant="info"
            size="sm"
            onClick={() =>
              setDetailsVisible((prevDetailsVisible) => !prevDetailsVisible)
            }
          >
            {detailsVisible ? "Hide Details" : "Show Details"}
          </Button>
        </td>
      </tr>
      {detailsVisible && (
        <tr>
          <td colSpan={6}>
            <div className="d-flex">
              <div className="mr-4 w-24 h-36 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg shadow-md p-2 flex flex-col text-xs text-white justify-between">
                <div className="text-center font-bold text-sm">
                  <p>{book.title}</p>
                </div>
                <div className="flex flex-col text-center mt-2 space-y-1">
                  {book.authors.map((author) => (
                    <p key={author} className="text-[10px] italic">
                      {author}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h5>{book.title}</h5>
                <p>
                  <strong>Authors:</strong> {book.authors.join(", ")}
                </p>
                <p>
                  <strong>Publisher:</strong> {book.publisher}
                </p>
                <h6>Reviews</h6>
                <ul>
                  {book.reviews.map((review, idx) => (
                    <li key={idx}>
                      <strong>{review.author}</strong>: {review.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
