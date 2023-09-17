import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import SelectBook from './pages/SelectBook';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReadingPage from './pages/ReadingPage';

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let tokenFromStorage = window.localStorage.getItem("token");

    if (!tokenFromStorage && hash) {
      console.log(hash)
      tokenFromStorage = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", tokenFromStorage);
    }

    setToken(tokenFromStorage);

  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={!token ? <HomePage setToken={setToken} /> : <SelectBook setToken={setToken} />} />
          <Route path="select-book" element={<SelectBook setToken={setToken} />} /> {/* Pass setToken as a prop here */}
          <Route path="book-detail/:bookId" element={<ReadingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
