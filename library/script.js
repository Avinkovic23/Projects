const addBtn = document.querySelector('#addBtn');
const closeBtn = document.querySelector('#closeBtn');
const submitBtn = document.querySelector('#submitBtn');
const modal = document.querySelector('#modal');
const authorName = document.querySelector('#authorName');
const bookTitle = document.querySelector('#bookTitle');
const numPages = document.querySelector('#numPages');
const readCheck = document.querySelector('#readCheck')
const grid = document.querySelector('.grid-container');

let bookArray = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks() {
    grid.innerHTML = '';
    bookArray.forEach((book, index) => {
        let bookElement = document.createElement('div');
        bookElement.classList.add('grid-element');
        bookElement.innerHTML = `
            <button class="delete-btn" data-index="${index}">X</button>
            <p>Author: ${book.author}</p>
            <p>Book Title: ${book.title}</p>
            <p>Number of Pages: ${book.pages}</p>
            <p>Read: ${book.read}</p>
        `;
        grid.appendChild(bookElement);
        let deleteBtn = bookElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            const bookIndex = parseInt(deleteBtn.getAttribute('data-index'));
            bookArray.splice(bookIndex, 1);
            localStorage.setItem('books', JSON.stringify(bookArray));
            displayBooks();
        });
    });
}

displayBooks();

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let read;
    if(readCheck.checked) {
        read = 'YES';
    }
    else {
        read = 'NO';  
    };
    let book = new Book(authorName.value, bookTitle.value, numPages.value, read);
    bookArray.push(book);
    localStorage.setItem('books', JSON.stringify(bookArray));
}

addBtn.addEventListener('click', () => {
    modal.showModal();
});

closeBtn.addEventListener('click', () => {
    modal.close();
});

submitBtn.addEventListener('click', () => {
    if(authorName.value && bookTitle.value && numPages.value) {
        addBookToLibrary();
    }
});