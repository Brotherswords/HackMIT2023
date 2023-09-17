import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BOOKS } from '../data/books.js';
import '../css/ReadingPage.css';
import WebPlayback from '../components/WebPlayback.js';

function ReadingPage() {
  const { bookId } = useParams();
  const book = BOOKS[bookId];

  const [bookContent, setBookContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if(book) {
      import(`../data/book_info/${book.title}.txt`)
        .then(module => {
          fetch(module.default)
            .then(response => response.text())
            .then(text => {
              const words = text.split(' ');
              const lines = [];
              for (let i = 0; i < words.length; i += 10) {
                lines.push(words.slice(i, i + 10).join(' '));
              }
              const pages = [];
              for (let i = 0; i < lines.length; i += 20) {
                pages.push(lines.slice(i, i + 20));
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
      <pre style={{ padding: '0 20px', whiteSpace: 'pre-wrap' }}>{bookContent ? bookContent[currentPage].join('\n') : null}</pre>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={bookContent ? bookContent.length : 0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <h1>TEST</h1>
      <WebPlayback/>
    </div>
  );
}

export default ReadingPage;
