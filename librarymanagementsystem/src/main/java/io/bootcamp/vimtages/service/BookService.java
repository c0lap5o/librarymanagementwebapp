package io.bootcamp.vimtages.service;

import io.bootcamp.vimtages.model.Book;

import java.util.List;

public interface BookService {

    Book get(Integer id);

    List<Book> getByName(String title);

    List<Book> getAll();

    List<Book> getByAuthor(String author);

    List<Book> getByIsbn(Long isbn);

    Book saveOrUpdate(Book book);

    void delete(Integer id);
}
