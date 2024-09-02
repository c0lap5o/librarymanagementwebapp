# Library Management System

This project is a simple web application for managing a library's book inventory. It allows users to add, view, update, and delete books from the inventory.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Java, Spring, Hibernate
- Database: MySQL
- Deployment: Docker

## Features

- RESTful API for CRUD operations on books
- Web interface for managing books
- Docker deployment

## API Endpoints

- GET /api/books - Retrieve all books
- GET /api/books/{id} - Retrieve a specific book
- POST /api/books - Add a new book
- PUT /api/books/{id} - Update an existing book
- DELETE /api/books/{id} - Delete a book

## Data Model

Books have the following attributes:
- Id
- Title
- Author
- ISBN
- Published date
- Price
