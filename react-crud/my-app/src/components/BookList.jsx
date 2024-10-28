import React, { useEffect, useState } from 'react';
import BookModal from './BookModal';
import './BookList.css'

function BookList() {
    const [books, setBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        getBooks()
    },[])

    const getBooks = async () => {
        const response = await fetch('http://localhost:5000/books');
        if (response.ok) {
            const data = await response.json();
            setBooks(data.books);
        } else {
            console.error(`Error fetching books: ${response.status} - ${response.statusText}`);
        }
    };

    const addBook= async(book)=>{
        await fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        getBooks();
        setIsModalOpen(false);
    }


    const handleAddBook = (newBook) => {
        setBooks([...books, { id: books.length + 1, ...newBook }]);
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <h1>Book List</h1>
            <ul className="book-list">
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.id}>
                            <strong>{book.title}</strong> by {book.author}
                        </li>
                    ))
                ) : (
                    <li>No books available.</li>
                )}
            </ul>
            <button onClick={() => setIsModalOpen(true)} className="add-book-button">Add Book</button>
            {isModalOpen && <BookModal onClose={() => setIsModalOpen(false)} onAddBook={addBook} />}
        </div>
    );
}

export default BookList;
