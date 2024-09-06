const apiUrl = 'http://localhost:8080/lms/api/books/';
var bookData = {};
$(document).ready(function() {
console.log("document loaded");
    $("#test")[0].innerHTML = "i changed this with js";
    
    let editButton = document.querySelector('#edit');
    editButton.addEventListener('click', async function(){
    let book = {
        id: document.querySelector('#editId').innerHTML,
        title: document.querySelector('#editTitle').value,
        author: document.querySelector('#editAuthor').value,
        publishedDate: document.querySelector('#editPublishedDate').value,
        price: document.querySelector('#editPrice').value,
        isbn: document.querySelector('#editIsbn').value
    }
    

    fetch(apiUrl+book.id,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },body: JSON.stringify(book)
    })

});

    
});

document.addEventListener("DOMContentLoaded", async function() {
    bookData = await getData();
    
    loadDataToTable(bookData);

    
    
});

function loadDataToTable(bookData){
    const tableBody = document.querySelector('#tableBody');
   bookData.forEach(book => {
    let row = `<tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${new Date(book.publishedDate).toLocaleDateString()}</td>
    <td>${book.price}</td>
    <td>${book.isbn}</td>
    <td>
    <button onclick="fillEditBookForm(${book.id})">Edit</button>
    <button onclick="">Delete</button>
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






