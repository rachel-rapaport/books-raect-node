import React, { useEffect, useState } from 'react';
import './BookModal.css';

function BookModal({ onClose, addOrUpdate,bookUpdate }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');


    //resets the inputs when updating a book
    useEffect(()=>{
        if(bookUpdate){
            setTitle(bookUpdate.title);
            setAuthor(bookUpdate.author);
        }
    },[bookUpdate])


    //submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = { title, author }; 
        if (bookUpdate) {
            newBook.id = bookUpdate.id;
        }
        addOrUpdate(newBook);
        setTitle('');
        setAuthor('');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{bookUpdate?"update book":"Add a New Book"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            e.target.setCustomValidity('');
                        }}
                        onInvalid={(e) => e.target.setCustomValidity('Title is required')}
                    />
                    <label>Author:</label>
                    <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                            e.target.setCustomValidity('');
                        }}
                        onInvalid={(e) => e.target.setCustomValidity('Author is required')}
                    />
                    <button  type="submit" className="save-button">{bookUpdate?"update":"add"}</button>
                    <button onClick={onClose} className="close-button">Close</button>
                </form>
            </div>
        </div>
    );
}

export default BookModal;
