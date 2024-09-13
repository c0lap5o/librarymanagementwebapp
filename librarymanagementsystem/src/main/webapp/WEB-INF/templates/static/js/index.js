const apiUrl = 'http://localhost:8081/lms/api/books/';
var bookData = [];

// Bootstrap event listeners
document.addEventListener("DOMContentLoaded", async function() {
    bookData = await getData();
    loadDataToTable(bookData);
    submitButtonHandler();
    searchHandler();
    addBookHandler();
    clearFormHandler();
});


function loadDataToTable(bookData) {
    
    const tableBody = document.querySelector('#tableBody');
    tableBody.innerHTML = "";
    
    // Creates a table row for each book in the list
    bookData.forEach(book => {
        
        let row = `
            <tr data-book-id="${book.id}">
                <td name="id">${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${new Date(book.publishedDate).toLocaleDateString()}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>${book.isbn}</td>
                <td>
                    <div class="button-container">
                        <button class="btn btn-success w-100" onclick="loadBookData(${book.id})">Edit</button>
                        <button class="btn btn-danger w-100" onclick="deleteBook(${book.id})">Delete</button>
                    </div>        
                </td>
            </tr>`;
        
            tableBody.innerHTML += row;
    });
}
//Fetches the data from the server
async function getData() {
    
    try {
        const response = await fetch(apiUrl);
    
        if (!response.ok) {
            throw new Error('Failed to fetch data from server.');
        }

        return await response.json();
    
    } catch (error) {
        
        console.log(error.message);
        window.alert('Something went wrong, please reload the page and try again.');
        return [];  // Return an empty array in case of failure
    
    }
}

function convertDateFormat(dateString) {
    //stops if string is null
    if (!dateString) return;
    
    const parts = dateString.split('/');
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    const year = parts[2];
    
    return `${year}-${month}-${day}`;
}

//updates row with new book data
function updateRow(updatedBook) {

    let row = document.querySelector(`tr[data-book-id="${updatedBook.id}"]`);
    
    if (row) {
        row.innerHTML = `
            <td>${updatedBook.id}</td>
            <td>${updatedBook.title}</td>
            <td>${updatedBook.author}</td>
            <td>${new Date(updatedBook.publishedDate).toLocaleDateString()}</td>
            <td>${parseFloat(updatedBook.price).toFixed(2)}</td>
            <td>${updatedBook.isbn}</td>
            <td>
                <button class="btn btn-success w-100" onclick="loadBookData(${updatedBook.id})">Edit</button>
                <button class="btn btn-danger w-100" onclick="deleteBook(${updatedBook.id})">Delete</button>
            </td>
        `;
    }
}


function loadBookData(id) {
    const book = bookData.find(book => book.id === id);
    if (!book) return;

    book.publishedDate = new Date(book.publishedDate).toLocaleDateString();
    const form = document.querySelector('#bookForm');
    let formData = form.elements;

    document.querySelector('#id').innerHTML = book.id;

    [...formData].forEach(input => {
        if (input.id in book) {
            input.value = book[input.id];
        }
    });
}

function submitButtonHandler() {
    const submit = document.querySelector('#submit');
    submit.addEventListener('click', async function(event) {
        event.preventDefault();
        
        if (!document.querySelector('#id').innerHTML) {
            window.alert('Book does Not Exist Please Add a New Book');
            return;
        }

        const book = getFormData();
        const bookId = book.id;
        
        // Validate data including ISBN
        if (!validateData(bookId)) {
            return;
        } else {
            await updateBook(book);
            bookData = bookData.map(b => (b.id === book.id ? book : b));
            updateRow(book);
            clearForm();
           
        }
    });
}


function searchHandler() {
    document.querySelector("#searchBar").addEventListener('keyup', search);
}

function search() {
    const searchCriteria = document.querySelector('#dropDownOptions').value;
    const query = document.querySelector("#searchBar").value.trim().toLowerCase();
    
    let result;
    switch (searchCriteria) {
        case 'id':
            result = bookData.filter(book => book.id === parseInt(query));
            break;
        case 'title':
            result = bookData.filter(book => book.title.toLowerCase().includes(query));
            break;
        case 'author':
            result = bookData.filter(book => book.author.toLowerCase().includes(query));
            break;
        case 'isbn':
            result = bookData.filter(book => book.isbn.toString() === query);
            break;
        case 'price':
            result = bookData.filter(book => parseFloat(book.price) === parseFloat(query));
            break;
        case 'publishedDate':
            result = bookData.filter(book => new Date(book.publishedDate).toLocaleDateString() === query);
            break;
        default:
            result = [];
    }
    loadDataToTable(result);
}

async function addBookHandler() {
    const addBookButton = document.querySelector('#addbook');
    addBookButton.addEventListener('click', async function() {
        let book = getFormData();
        if (!validateData()) {
            return;
        }
        
        const newBook = await addBook(book);
        if (newBook) {
            bookData.push(newBook);
            loadDataToTable(bookData);
            window.alert('Added book successfully!');
            clearForm();
        }
    });
}

async function addBook(book) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        
        if (!response.ok) {
            throw new Error("Failed to add the book.");
        }
        
        return await response.json();
    } catch (error) {
        window.alert("It's not possible to add the book.");
        return null;
    }
}

async function updateBook(book) {
    try {
        const response = await fetch(apiUrl + book.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });

        if (!response.ok) {
            throw new Error("Failed to update the book.");
        }
        
        const updatedBook = await response.json();
        bookData = bookData.map(b => (b.id === updatedBook.id ? updatedBook : b));
        loadDataToTable(bookData);
        window.alert('Updated Successfully');

    } catch (error) {
        console.log(error);
        window.alert("It's not possible to update the book.");
    }
}

async function deleteBook(id) {
    try {
        const response = await fetch(apiUrl + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete the book.");
        }

        bookData = bookData.filter(book => book.id !== id);
        loadDataToTable(bookData);
        window.alert('Deleted Successfully');
    } catch (error) {
        window.alert("It wasn't possible to delete the book.");
    }
}

function validateData(bookId) {
    if (!isTitleValid()) return false;
    if (!isAuthorValid()) return false;
    if (!isPublishedDateValid()) return false;
    if (!isPriceValid()) return false;
    if (!isISBNValid(parseInt(bookId))) return false;
    return true;
}


function getFormData() {
    return {
        id: document.querySelector('#id').innerHTML,
        title: document.querySelector('#title').value,
        author: document.querySelector('#author').value,
        isbn: parseFloat(document.querySelector('#isbn').value),
        publishedDate: convertDateFormat(document.querySelector('#publishedDate').value),
        price: parseFloat(document.querySelector('#price').value).toFixed(2)
    };
}function clearForm() {
    // Select the form by its ID
    const form = document.querySelector('#bookForm');
    
    // Reset all form fields to their default values
    form.reset();
    document.querySelector('#id').innerHTML="";

}

function clearFormHandler(){
    document.querySelector('#clearFormButton').addEventListener('click',function(){
        clearForm();
    });
    
}

//Tests to book data
function isTitleValid() {
    const title = document.querySelector('#title').value;
    if (!title.trim()) {
        window.alert("Title is required.");
        return false;
    }
    return true;
}

function isAuthorValid() {
    const author = document.querySelector('#author').value;
    if (!author.trim()) {
        window.alert("Author is required.");
        return false;
    }
    return true;
}

function isPublishedDateValid() {
    const date = document.querySelector('#publishedDate').value;
    const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!date.trim()) {
        window.alert("Published Date is required.");
        return false;
    }
    if (!datePattern.test(date)) {
        window.alert("Published Date must be in the format DD/MM/YYYY.");
        return false;
    }
    return true;
}

function isPriceValid() {
    const price = parseFloat(document.querySelector('#price').value);
    if (isNaN(price) || price <= 0) {
        window.alert("Price must be a positive number.");
        return false;
    }
    return true;
}

function isISBNValid(bookId) {
    
    const isbn = document.querySelector('#isbn').value.trim();
    
    // Check if ISBN is a number and at least 10 digits
    if (!isbn || isNaN(isbn) || isbn.length < 10) {
        window.alert("ISBN must be a number and at least 10 digits.");
        return false;
    }

    // Check if the ISBN already exists in bookData
    const existingBooks = bookData.filter(book => book.id !== bookId);
    console.log(existingBooks);
    const existingIsbns = existingBooks.map(book => book.isbn.toString());
    console.log(existingIsbns);
    if (existingIsbns.includes(isbn)) {
        window.alert("This ISBN already exists. Please provide a unique ISBN.");
        return false;
    }

    return true;
}
