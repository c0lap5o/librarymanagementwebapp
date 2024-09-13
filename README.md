# Library Management System

This project is a simple web application for managing a library's book inventory. It allows users to add, view, update, and delete books from the inventory.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Java, Spring, Hibernate
- Database: MySQL
- Run: Docker

## Features

- RESTful API for CRUD operations on books
- Web interface for managing books
- Run with Docker

## API Endpoints

- GET /api/books - Retrieve all books
- GET /api/books/{id} - Retrieve a specific book
- POST /api/books - Add a new book
- PUT /api/books/{id} - Update an existing book
- DELETE /api/books/{id} - Delete a book
- Some more commented features in the RestController available

## Data Model

Books have the following attributes:
- Id
- Title
- Author
- ISBN
- Published date
- Price
  
## Run

1. Ensure Docker and Docker Compose are installed on your system.

2. Navigate to the project root directory containing the docker directory and the docker-compose.yml file.

3. Build and start the containers in detached mode using ./start.sh:
  ```bash
   $ cd docker 
  ```

  ```bash
   $ sudo chmod +x start.sh stop.sh clean.sh 
  ```

```bash
   $ ./start.sh 
  ```

   This commands do the following:
   - Change to the docker dir
   - Add execution permission to start,stop and clean bash scripts
   - Changes the RESTApi URL in the index.js file according to env variables in .env file
   - Builds the project .war app with the command $ mvn clean package -Dapp.name=${APP_NAME}
   - Copies the app from the target dir to myapps dir
   - Builds the Docker images defined in your docker-compose.yml file
   - Creates and starts the containers
   - Runs them in detached mode (-d flag), allowing them to run in the background

5. Check the status of your containers:
```bash
   $ docker-compose ps
```
   You should see two containers running:
   - A Tomcat container with your application
   - A MySQL container for the database

7. View logs (if needed):
```bash
   $ docker-compose logs -f
```
```bash
   $ docker-compose logs <container_name> -f
```
   This shows the logs from all services or specific container. Use Ctrl+C to exit.

9. Access your application:
   Open a web browser and go to http://localhost:8081
   (Assuming you've mapped port 8081 on the host to Tomcat's port 8080 in the .env file)

10. To stop the application:
```bash
  $ ./stop.sh
```
9.To clean all data created by the containers in the root project file:
  ```bash
  $ ./clean.sh
```
Note: Ensure your docker-compose.yml file is correctly configured with:
- The correct build context for your application
- Proper port mappings
- Environment variables mappings
- Volume mounts for persistent data (if needed)

If you encounter issues, check the Docker logs and ensure all necessary files 
(like WAR file, Dockerfile, etc.) are in the correct locations and the .env variables are well set.

## Bugs
  1. DB not available when the containers start
    Description: When you try to access your web app you get a connection refused from the db

## License

[MIT](https://choosealicense.com/licenses/mit/)

