import React from 'react';
import '../css/SelectBook.css';
import frankensteinThumbnail from '../assets/frankenstein.jpg';
import shakespeareThumbnail from '../assets/shakespeare.jpg';
import draculaThumbnail from '../assets/dracula.jpg';
import mobyDickThumbnail from '../assets/moby.jpg';
import pridePrejudice from '../assets/pride.jpg';


function SelectBook() {
    const books = [
      { id: 1, title: 'Dracula', thumbnail: draculaThumbnail },
      { id: 2, title: 'Shakespeare', thumbnail: shakespeareThumbnail },
      { id: 3, title: 'Frankenstein', thumbnail: frankensteinThumbnail },
      { id: 4, title: 'Moby Dick', thumbnail: mobyDickThumbnail },
      { id: 5, title: 'Pride & Prejudice', thumbnail: pridePrejudice },
    ];
  
    const handleTileClick = (book) => {
      alert(`You selected ${book.title}`);
      history.push(`/book-detail/${book.id}`);  // Navigate to book detail page with the book id
    };
  
    return (
      <div className="SelectBook">
        <h1>Select Book</h1>
        <div className="book-grid">
          {books.map(book => (
            <div 
              key={book.id} 
              className="book-tile" 
              onClick={() => handleTileClick(book)}  // Adding click handler here
            >
              <img src={book.thumbnail} alt={`${book.title} Thumbnail`} />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SelectBook;