const myLibrary = [];
const form = document.querySelector('.book-form');
const addBookButton = document.querySelector('.add-book');

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    return book;
};

function removeBookFromLibrary(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        return true;
    }
    return false;
};

function displayBooks() {
    const container = document.querySelector('.book-container');
    container.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.dataset.index = index;

        // add the book content
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.hasRead ? 'Read' : 'Unread'}</p>
            <button class="toggle">Toggle Read</button>
            <button class="remove">Remove</button>`;

        // add event listeners for buttons
        bookDiv.querySelector('.toggle').addEventListener('click', () => {
            book.hasRead = !book.hasRead;
            displayBooks();
        });
        bookDiv.querySelector('.remove').addEventListener('click', () => {
            removeBookFromLibrary(book.id);
            displayBooks();
        });
        container.appendChild(bookDiv);
    })
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = form.querySelector('.title').value;
    const author = form.querySelector('.author').value;
    const pages = form.querySelector('.pages').value;
    const hasRead = form.querySelector('.read').checked;

    addBookToLibrary(title, author, pages, hasRead);
    form.reset();
    displayBooks();
});