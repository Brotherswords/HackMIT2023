import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BOOKS } from '../data/books.js';
import '../css/ReadingPage.css';
import WebPlayback from '../components/WebPlayback.js';

function ReadingPage() {
  const { bookId } = useParams();
  const book = BOOKS[bookId-1];

  const [bookContent, setBookContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [trackId, setTrackId] = useState("7ovUcF5uHTBRzUpB6ZOmvt");  // You can set initial track ID here

  
  const wordsPerLine = 10;
  const linesPerPage = 20;

  function getSongIds() {
    //Replace with API call to get song ids
    return ["7ovUcF5uHTBRzUpB6ZOmvt"]
  }
  

  useEffect(() => {
    if(book) {
      import(`../data/book_info/${book.title}.txt`)
        .then(module => {
          fetch(module.default)
            .then(response => response.text())
            .then(text => {
              const words = text.split(' ');
              const lines = [];
              for (let i = 0; i < words.length; i += wordsPerLine) {
                lines.push(words.slice(i, i + wordsPerLine).join(' '));
              }
              const pages = [];
              for (let i = 0; i < lines.length; i += linesPerPage) {
                const page = lines.slice(i, i + linesPerPage);
                while(page.length < linesPerPage) {
                  page.push(' '.repeat(wordsPerLine)); // fill with whitespace
                }
                pages.push(page);
              }
              setBookContent(pages);
            })
            .catch(error => console.error('Error loading book content:', error));
        })
        .catch(error => {
          console.error('Error loading file:', error);
        });
    }
  }, [book]);

  if(!book) {
    return <p>Book not found: {bookId}</p>;
  }

  return (
    <div className="ReadingPage">
      <h1 style={{ textAlign: 'center' }}>{book.title}</h1>
      <div className='book-container'>
        <p style={{ padding: '0 20px', whiteSpace: 'pre-wrap', fontFamily: 'Consolas' }}>{bookContent ? bookContent[currentPage].join('\n') : null}</p>
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={bookContent ? bookContent.length : 0}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={({ selected }) => {
          if(selected === 0 || selected === bookContent.length - 1) {
            setCurrentPage(selected);
          } else {
            setCurrentPage(selected);
            // You might add some logic here to manipulate forcePage prop to maintain a strict range
          }
        }}
        forcePage={currentPage}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

    <WebPlayback trackId="7ovUcF5uHTBRzUpB6ZOmvt" />

    </div>
  );
}

export default ReadingPage;
