const apiUrl = 'http://localhost:8080/lms/api/books/'
$(document).ready(function() {
    document.querySelector("#saveForm").addEventListener('submit',function(e){
        e.preventDefault();

        const formData = new FormData(this);
        const bookData = Object.fromEntries(formData.entries());
        console.log(bookData);
        fetch(apiUrl,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },body: JSON.stringify(bookData)
        });
    });
    

});

