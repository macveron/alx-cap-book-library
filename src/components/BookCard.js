import React from "react";

const BookCard = ({ book }) => {
  const coverId = book.cover_i || null;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150";

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>by {book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
    </div>
  );
};

export default BookCard;
