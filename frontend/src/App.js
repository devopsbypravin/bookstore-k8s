import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get('/api/books').then(res => setBooks(res.data));
  }, []);

  const addBook = () => {
    axios.post('/api/books', { title }).then(res => {
      setBooks([...books, res.data]);
      setTitle("");
    });
  };

  return (
    <div>
      <h2>Bookstore</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addBook}>Add</button>
      <ul>
        {books.map(book => <li key={book._id}>{book.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
