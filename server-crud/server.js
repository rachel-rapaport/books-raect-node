const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 5, title: "Moby-Dick", author: "Herman Melville" },
];

//CRUD-READ
app.get("/books", (req, res) => {
    res.status(200).json({ message: "Books retrieved successfully", books: books });
});

//CRUD-READ BY ID
app.get("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find((book) => book.id == bookId);
    if (book) {
        console.log(`book ${book.title} found`);
        res.status(200).json({ message: "Books retrieved successfully",book: book });
    } else {
        console.log("book not found");
        res.status(404).json({ message: "book not found" });
    }
});

//CRUD-CREATE
app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
    };
    books.push(newBook);
    console.log("Another new book", newBook);
    res.status(201).json({ message: "Book created successfully", book: newBook });
});

//CRUD-UPDATE
app.put("/books/:id", (req, res)=>{
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex((book) => book.id == bookId);
    if(bookIndex!=-1){
        const updateBook={
            id:bookId,
            title:req.body.title||books[bookIndex].title,
            author:req.body.author||books[bookIndex].author
        };
        books[bookIndex]=updateBook;
        console.log(`book ${bookId} update`,updateBook);
        res.status(200).json({ message: "Book updated successfully", book: updateBook });
    }
    else{
        console.log(`book ${bookId} not update`);
        res.status(404).json({ message: "book not found" });
    }
});

//CRUD-DELETE
app.delete('/books/:id',(req,res)=>{
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex((book) => book.id == bookId);
    if(bookIndex!=-1){
        const deleteBook=books.splice(bookIndex,1);
        console.log(`book ${bookId} delete`,deleteBook);
        res.status(200).json({ message: "Book deleted successfully", book: deleteBook[0] });
    }
    else{
        console.log(`book ${bookId} not delete`);
        res.status(404).json({ message: "book not found" });
    }
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
