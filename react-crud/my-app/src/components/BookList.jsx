import React, { useEffect, useState } from 'react';
import BookModal from './BookModal';
import './BookList.css'

function BookList() {
    const [books, setBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBook,setCurrentBook]=useState(null);


    //get book when the page rander
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

    //add a new book
    const addBook= async(book)=>{
        await fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        getBooks();
        setIsModalOpen(false);
    }

    //delete book by id
    const deleteBook=async(bookId)=>{
        const response = await fetch(`http://localhost:5000/books/${bookId}`,{
            method: 'DELETE',
        });
        if(response.ok){
            const booksDelete=books.filter(book=> book.id!=bookId);
            setBooks(booksDelete);
        }
        else{
            console.error(`Failed to delete book with id ${bookId}: ${response.statusText}`);
        }
    }

    //update book by id
    const updateBook= async(book) => {
        console.log("--", book);
        await fetch(`http://localhost:5000/books/${book.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: book.title,
                author: book.author
            }),
        });
        await getBooks();
        setIsModalOpen(false);
        setCurrentBook(null);
    };

    //open the modal for editing a book
    const openEditModal = (book) => {
        setCurrentBook(book);
        setIsModalOpen(true);
    };

    return (
        <div className="container">
            <h1>Book List</h1>
            <ul className="book-list">
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.id}>
                            <div className="book-info"> 
                                <strong>{book.title}</strong>
                                <span>by {book.author}</span>
                            </div>
                            <div className="button-group"> 
                                <button onClick={()=>deleteBook(book.id)}>deldet</button>
                                <button onClick={()=>openEditModal(book)} className="add-book-button">update</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No books available.</li>
                )}
            </ul>
            <button onClick={() => {setCurrentBook(null);setIsModalOpen(true)}} className="add-book-button">Add Book</button>
            {isModalOpen && 
            <BookModal onClose={() => setIsModalOpen(false)}
            addOrUpdate={currentBook?updateBook:addBook}
            bookUpdate={currentBook}/>}
        </div>
    );
}

export default BookList;
