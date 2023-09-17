import React from 'react';
import '../css/SelectBook.css';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BOOKS } from '../data/books.js';

function SelectBook({ setToken }) {
  const navigate = useNavigate();

  const books = BOOKS;
  const handleTileClick = (book) => {
    //alert(`You selected ${book.title}`);
    navigate(`/book-detail/${book.id}`);
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="SelectBook">
      <h1>Select Book</h1>

      <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
            <button 
        onClick={logout}
        style={{
            background: '#f0f0f0', 
            border: 'none',
            borderRadius: '50%', 
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s, box-shadow 0.3s',  // Added transition for smooth animation
        }}
        onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
            e.currentTarget.style.transform = 'scale(1)';
        }}
        >
        <i className="fa fa-sign-out"></i>
        </button>
      </div>
      <div className="book-grid">
        {books.map(book => (
          <div 
            key={book.id} 
            className="book-tile" 
            onClick={() => handleTileClick(book)}
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
