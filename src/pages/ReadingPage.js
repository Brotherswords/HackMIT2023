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
  const [trackId, setTrackId] = useState("");

  const wordsPerLine = 10;
  const linesPerPage = 20;

  async function getSongIds() {
    if (bookContent) {
      try {
        const currentPageContent = bookContent[currentPage].join(' ');
        const response = await fetch('http://localhost:8000/tim/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: currentPageContent })
        })
        .then(response => response.json());
        console.log("SONGID:" + response.song_id);
        setTrackId(response.song_id);
      } catch (error) {
        console.error('Error fetching track ID:', error);
      }
    }
  }

  useEffect(() => {
    if (book) {
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
                while (page.length < linesPerPage) {
                  page.push(' '.repeat(wordsPerLine)); // fill with whitespace
                }
                pages.push(page);
              }
              setBookContent(pages);
              getSongIds(); // Calling getSongIds here after setting bookContent
            })
            .catch(error => console.error('Error loading book content:', error));
        })
        .catch(error => {
          console.error('Error loading file:', error);
        });
    }
  }, [book]);

  useEffect(() => {
    if (bookContent) {
      console.log(bookContent[currentPage].join('\n'));
      getSongIds(); // Ensures getSongIds is called when currentPage changes
    }
  }, [bookContent, currentPage]);

  if (!book) {
    return <p>Book not found: {bookId}</p>;
  }

  return (
    <div className="ReadingPage">
      <h1>{book.title}</h1>
      <div className='book-container'>
        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', marginBottom: '0' }}>
          {bookContent ? bookContent[currentPage].join('\n') : null}
        </p>
      </div>
      <div className='pagination-container'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={bookContent ? bookContent.length : 0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => {
            setCurrentPage(selected);
            getSongIds();
          }}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      
      {trackId && <WebPlayback trackId={trackId} />}

    </div>
  );
}

export default ReadingPage;
