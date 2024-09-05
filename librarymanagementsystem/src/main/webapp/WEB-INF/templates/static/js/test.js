$(document).ready(function() {
console.log("document loaded");
    $("#test")[0].innerHTML = "i changed this with js";
});

document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.querySelector('#tableBody');
    const row = document.createElement('td');
    row.innerHTML=`<tr>batata</tr>`;

});


