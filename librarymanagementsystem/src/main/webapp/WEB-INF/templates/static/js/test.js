$(document).ready(function() {
console.log("document loaded");
    $("#test").innerHTML = "i changed this with js";
});

document.addEventListener("DOMContentLoaded", function() {
    //document.getElementById('#test').innerHTML="<h1>changed this</h1>";
    console.log("doc loaded from eventlistener");
});


