import React from 'react';

const BookDetails = ({ book, onClose }) => {
  return (
    <div className="book-details">
      <img src={book.image} alt={`${book.title} cover`} />
      <h2>{book.title}</h2>
      <p className="author">By: {book.author}</p>
      <p className="genre">Genre: {book.genre}</p>
      <p>{book.description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetails;
