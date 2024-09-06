const apiUrl = 'http://localhost:8080/lms/api/books/';
var bookData = {};
$(document).ready(function() {
    document.querySelector("#searchBar").addEventListener('keyup', function(){
        let searchCriteria = document.querySelector('#dropDownOptions').value;
        //console.log(searchCriteria);
        //console.log(document.querySelector("#searchBar").value);
        
        switch(searchCriteria){
            case 'id':
                var query =document.querySelector("#searchBar").value;
                var result = bookData.filter(book =>
                
                    book.id === parseInt(query)
                );
                loadDataToTable(result);
                break;
            case 'title':
               
                var query = document.querySelector("#searchBar").value;
                var result = bookData.filter(book => 
                    book.title.toLowerCase().includes(query.toLowerCase())
                )
                loadDataToTable(result);
                break;
            case 'author':
                var query = document.querySelector("#searchBar").value;
                var result = bookData.filter(book => 
                    book.author.toLowerCase().includes(query.toLowerCase())
                )
                loadDataToTable(result);
                break;  
            case 'isbn':
                var query = parseFloat(document.querySelector("#searchBar").value);
                var result = bookData.filter(book => 
                    book.isbn === query
                )
                loadDataToTable(result);
                break;  
            case 'price':
                var query = parseFloat(document.querySelector("#searchBar").value);
               
                var result = bookData.filter(book => 
                    
                    book.price === query
                )
                loadDataToTable(result);
                break;  
            case 'publishedDate':
                var query = document.querySelector("#searchBar").value;
               
                var result = bookData.filter(book => 
                    
                    new Date(book.publishedDate).toLocaleDateString() === query
                )
                
                loadDataToTable(result);
                break;    

               
        }
    });
    
    
    let editButton = document.querySelector('#edit');
    
    editButton.addEventListener('click', async function(){
    let id = document.querySelector('#editId').innerHTML;
    let book = {
    title: document.querySelector('#editTitle').value,
        author: document.querySelector('#editAuthor').value,
        isbn: parseFloat(document.querySelector('#editIsbn').value),
        publishedDate: convertDateFormat(document.querySelector('#editPublishedDate').value),
        price: parseFloat(document.querySelector('#editPrice').value).toFixed(2)
        
    }
    try{
        await fetch(apiUrl+id,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },body: JSON.stringify(book)
        })
        updateRow(parseInt(id), book);
        }catch{
            window.alert("It wasn't possible to edit the book");
        }

    

   
    
});

    
});

document.addEventListener("DOMContentLoaded", async function() {
    bookData = await getData();
    
    loadDataToTable(bookData);

    
    
});

function loadDataToTable(bookData){
    const tableBody = document.querySelector('#tableBody');
    tableBody.innerHTML = "";
   bookData.forEach(book => {
    let row = `<tr data-book-id="${book.id}">
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${new Date(book.publishedDate).toLocaleDateString()}</td>
    <td>${book.price.toFixed(2)}</td>
    <td>${book.isbn}</td>
    <td>
    <button onclick="fillEditBookForm(${book.id})">Edit</button>
    <button onclick="deleteBook(${book.id})">Delete</button>
    </td>
    </tr>`;
    tableBody.innerHTML += row;
        
   });
}

async function getData(){
    try{
        var response = await fetch(`${apiUrl}`);
    }catch{
        console.log('Failed to fetch data to server');
        window.alert('Something went wrong, please reload the page and try again');
    }

    try{
        var data = await response.json();
    }catch{
        console.log('Something went wrong while trying to parse the data');
        window.alert('Something went wrong, please reload the page and try again');
    }
    
    return data;
}

//USE FORM METHOD USED IN ADD CLIENT REFACTOR
function fillEditBookForm(id){

    let book = bookData.find(book => book.id === id);
    let idParagraph = document.querySelector('#editId');
    idParagraph.innerHTML=book.id;

    let titleForm = document.querySelector('#editTitle');
    titleForm.value=book.title;

    let authorForm = document.querySelector('#editAuthor');
    authorForm.value=book.author;

    let publishedDateForm = document.querySelector('#editPublishedDate');
    publishedDateForm.value=new Date(book.publishedDate).toLocaleDateString();

    let priceForm = document.querySelector('#editPrice');
    priceForm.value=book.price;

    let isbnForm = document.querySelector('#editIsbn');
    isbnForm.value=book.isbn;    
}

function convertDateFormat(dateString) {
    const parts = dateString.split('/');
    
    // Pad month and day with leading zeros if necessary
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    const year = parts[2];
    
    return `${year}-${month}-${day}`;
}

function updateRow(id,updatedBook){
    let row = document.querySelector(`tr[data-book-id="${id}"]`);
    if (row) {
        row.innerHTML = `
            <td>${id}</td>
            <td>${updatedBook.title}</td>
            <td>${updatedBook.author}</td>
            <td>${new Date(updatedBook.publishedDate).toLocaleDateString()}</td>
            <td>${parseFloat(updatedBook.price)}</td>
            <td>${updatedBook.isbn}</td>
            <td>
                <button onclick="fillEditBookForm(${updatedBook.id})">Edit</button>
                <button onclick="deleteBook(${updatedBook.id})">Delete</button>
            </td>
        `;
    }



}

async function deleteBook(id){
    try{
        fetch(apiUrl+id,{
            method: "DELETE",
        })
        }catch{
            window.alert("It wasn't possible to delete the book");
        }
    
        let row = document.querySelector(`tr[data-book-id="${id}"]`);
        if (row) {
            row.innerHTML = ``;
        }  

}




