package io.bootcamp.vimtages.service;

import io.bootcamp.vimtages.model.Book;
import io.bootcamp.vimtages.persistence.BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class BookServiceImpl implements BookService {

    private BookDao bookDao;

    @Autowired
    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }


    @Override
    public Book get(Integer id) {
        return bookDao.findById(id);
    }

    @Override
    public List<Book> getByName(String title) {
        List<Book> books = bookDao.findAll();
        return books.stream().filter(book -> book.getTitle().equals(title)).collect(Collectors.toList());
    }
    @Override
    public List<Book> getAll(){
        return bookDao.findAll();
    }

    @Override
    public List<Book> getByAuthor(String author) {
        List<Book> books = bookDao.findAll();
        return books.stream().filter(book -> book.getAuthor().equals(author)).collect(Collectors.toList());
    }

    @Override
    public List<Book> getByIsbn(Long isbn) {
        List<Book> books = bookDao.findAll();
        return books.stream().filter(book -> (book.getISBN() == isbn)).collect(Collectors.toList());
    }
}
