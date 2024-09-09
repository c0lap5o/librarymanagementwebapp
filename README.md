# Library Management System

This project is a simple web application for managing a library's book inventory. It allows users to add, view, update, and delete books from the inventory.
The project is still in development, deploying the application with docker is still in progress.

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
  
## Deploy

1. Ensure Docker and Docker Compose are installed on your system.

2. Navigate to the project root directory containing the docker directory and the docker-compose.yml file.

3. Build and start the containers in detached mode:
   $ docker-compose up -d --build

   This command does the following:
   - Builds the Docker images defined in your docker-compose.yml file
   - Creates and starts the containers
   - Runs them in detached mode (-d flag), allowing them to run in the background

4. Check the status of your containers:
   $ docker-compose ps

   You should see two containers running:
   - A Tomcat container with your application
   - A MySQL container for the database

5. View logs (if needed):
   $ docker-compose logs -f

   This shows the logs from all services. Use Ctrl+C to exit.

6. Access your application:
   Open a web browser and go to http://localhost:8081
   (Assuming you've mapped port 8081 on the host to Tomcat's port 8080)

7. To stop the application:
   $ docker-compose down

Note: Ensure your docker-compose.yml file is correctly configured with:
- The correct build context for your application
- Proper port mappings
- Environment variables for database connection
- Volume mounts for persistent data (if needed)

If you encounter issues, check the Docker logs and ensure all necessary files 
(like WAR file, Dockerfile, etc.) are in the correct locations.

Note: Since the docker deployment is not implmented, create a tomcat server and set the credentials for maven in a settings.xml in the .m2 dir. Then run the application with mvn tomcat7:deploy.

