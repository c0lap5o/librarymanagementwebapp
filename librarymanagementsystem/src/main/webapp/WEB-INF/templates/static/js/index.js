const apiUrl = 'http://localhost:8080/lms/api/books/';
var bookData = {};
  


document.addEventListener("DOMContentLoaded", async function() {
    bookData = await getData();
    
    loadDataToTable(bookData);
    submitButtonHandler();
    searchHandler();
    addBookHandler();
    testHandler();
    
    
});

function loadDataToTable(bookData){
    const tableBody = document.querySelector('#tableBody');
    tableBody.innerHTML = "";
   bookData.forEach(book => {
    let row = `<tr data-book-id="${book.id}">
    <td name="id">${book.id}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${new Date(book.publishedDate).toLocaleDateString()}</td>
    <td>${book.price.toFixed(2)}</td>
    <td>${book.isbn}</td>
    <td>
    <button onclick="loadBookData(${book.id})">Edit</button>
    <button onclick="deleteBook(${book.id})">Delete</button>
    </td>
    </tr>`;
    tableBody.innerHTML += row;
   });
   //console.log("here");
   //var formData = new FormData(tableBody);
        
   //var formBookData = Object.fromEntries(formData.entries());
   //console.log(formBookData);

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

function convertDateFormat(dateString) {
    const parts = dateString.split('/');
    
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    const year = parts[2];
    
    return `${year}-${month}-${day}`;
}

function updateRow(updatedBook){
    let row = document.querySelector(`tr[data-book-id="${id}"]`);
    if (row) {
        row.innerHTML = `
            <td>${updatedBook.id}</td>
            <td>${updatedBook.title}</td>
            <td>${updatedBook.author}</td>
            <td>${new Date(updatedBook.publishedDate).toLocaleDateString()}</td>
            <td>${parseFloat(updatedBook.price)}</td>
            <td>${updatedBook.isbn}</td>
            <td>
                <button onclick="loadBookData(${updatedBook.id})">Edit</button>
                <button onclick="deleteBook(${updatedBook.id})">Delete</button>
            </td>
        `;
    }



}
//Loads bookData into the edit pannel
function loadBookData(id){
    const book = bookData.filter(book => book.id === id )[0];
    book.publishedDate = new Date(book.publishedDate).toLocaleDateString();
    const form = document.querySelector('#bookForm');
    let formData = form.elements;

    document.querySelector('#id').innerHTML=book.id;


    console.log(formData);
    [...formData].forEach(input => {
        if (input.id in book) {
            input.value = book[input.id];
        }
        
      });
}
function submitButtonHandler(){
   
    const submit = document.querySelector('#submit');
    submit.addEventListener('click', async function(event){
        event.preventDefault();
        console.log(document.querySelector('#id').innerHTML);
        if(!document.querySelector('#id').innerHTML){
            window.alert('Book does Not Exist Please Add a New Book');
            return;
        }
         if(!validateForm()){
            return;
         }
        let book = {
            id:document.querySelector('#id').innerHTML,
            title: document.querySelector('#title').value,
            author: document.querySelector('#author').value,
            isbn: parseFloat(document.querySelector('#isbn').value),
            publishedDate: convertDateFormat(document.querySelector('#publishedDate').value),
            price: parseFloat(document.querySelector('#price').value).toFixed(2)
            
        }
        if(Object.values(book).includes(null)){
            window.alert('You must fill all requirements');
            return;
        }
        console.log(book);  
        await updateBook(book);
        bookData[book.id] = book;
        updateRow(book);
    });

}
function searchHandler(){
    document.querySelector("#searchBar").addEventListener('keyup', function(){    
        search();
    }); 
}
function search(){
    var searchCriteria = document.querySelector('#dropDownOptions').value;
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
            
            );
            loadDataToTable(result);
            break;    

           
    }

}


async function addBookHandler(){
    const addBookButton = document.querySelector('#addbook');
    addBookButton.addEventListener('click', async function(){
     
        let book = getFormData();

        if(!validateData(book)){
            return;
        }
        await addBook(book);
        bookData = getData();
    });
}


async function addBook(book){
    try{
        await fetch(apiUrl,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },body: JSON.stringify(book)
        });
    }catch{
            window.alert("It's not possible to edit the book");
    }
}


async function updateBook(book){
    try{
        await fetch(apiUrl+book.id,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },body: JSON.stringify(book)
        });
        updateRow(book);
    }catch{
            window.alert("It's not possible to edit the book");
    }
}
async function deleteBook(id){
    try{
        await fetch(apiUrl+id,{
            method: "DELETE",
        });
    }catch{
            window.alert("It wasn't possible to delete the book");
        }
    
    let row = document.querySelector(`tr[data-book-id="${id}"]`);
    if (row) {
        row.innerHTML = ``;
    }
}
//check if author and title are not empty
//check if price has 2 decimal
//check if date is in the requested date format
//check if isbn has between 10 and 13 characters
//might need to change the isbn to string
    function validateData(book) {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        
        
        //let hasEmptyField = book.values().includes(null);
        //console.log(book.values());
          //if (!hasEmptyField) {
          //  window.alert('All Requirements Must Be Filled');
          //  return false;
        //}

        if(book.publishedDate.match(dateRegex)){
            window.alert('Date should be in dd-mm-yyyy');
            return false;
        }  
        
        
        


        
        return true;
    }
    function getFormData(){
        const form = document.querySelector('#bookForm');
        let formData = form.elements;
        var bookData = [];
        
        
        [...formData].forEach(input => {
            if(input.value){
                bookData.push(input.value);
            }

                

                });
     
           return new Book(bookData);           

    }
    class Book {
        constructor([ id, title, author, publishedDate, isbn,price]) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.publishedDate = publishedDate;
            this.price=price;
            this.isbn = isbn;
            
        }

        values(){
            return[
                this.id,
                this.title,
                this.author,
                this.publishedDate,
                this.isbn,
                this.price
            ]
        }

        
    }
function testHandler(){
    const test = document.querySelector('#testbut');
    
    test.addEventListener('click',function(){
        console.log('clicked');
        const book = getFormData();
        console.log(book)
    });
}
