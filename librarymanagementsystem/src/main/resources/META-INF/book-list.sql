-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS mylibrary;
USE mylibrary;

-- Insert sample data
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780061120084, 'Harper Lee', 12.99, '1960-07-11', 'To Kill a Mockingbird');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780141439518, 'Jane Austen', 9.99, '1813-01-28', 'Pride and Prejudice');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780743273565, 'F. Scott Fitzgerald', 15.00, '1925-04-10', 'The Great Gatsby');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780451524935, 'George Orwell', 11.50, '1949-06-08', '1984');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780618640157, 'J.R.R. Tolkien', 22.99, '1954-07-29', 'The Lord of the Rings');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780316769174, 'J.D. Salinger', 8.99, '1951-07-16', 'The Catcher in the Rye');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780062315007, 'Paulo Coelho', 14.99, '1988-01-01', 'The Alchemist');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780141439693, 'Charlotte Bronte', 7.99, '1847-10-16', 'Jane Eyre');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780060935467, 'Gabriel García Márquez', 13.50, '1967-05-30', 'One Hundred Years of Solitude');
INSERT INTO books (ISBN, author, price, publishedDate, title) VALUES (9780307277671, 'Stieg Larsson', 16.00, '2005-08-01', 'The Girl with the Dragon Tattoo');

