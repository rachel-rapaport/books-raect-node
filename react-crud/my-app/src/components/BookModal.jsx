import React, { useState } from 'react';
import './BookModal.css';

function BookModal({ onClose, onAddBook }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleAdd = () => {
        const newBook = { title, author };
        onAddBook(newBook);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add a New Book</h2>
                <form onSubmit={(e) => e.preventDefault()}>
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
                    <button onClick={handleAdd} className="save-button">Save</button>
                    <button onClick={onClose} className="close-button">Close</button>
                </form>
            </div>
        </div>
    );
}

export default BookModal;
