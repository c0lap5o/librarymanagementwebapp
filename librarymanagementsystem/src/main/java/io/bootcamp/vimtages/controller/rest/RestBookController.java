package io.bootcamp.vimtages.controller.rest;

import io.bootcamp.vimtages.model.Book;
import io.bootcamp.vimtages.persistence.BookDao;
import io.bootcamp.vimtages.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/books")
public class RestBookController {
    private BookService bookService;

    @Autowired
    public void setBookService(BookService bookService) {
        this.bookService = bookService;
    }

    @RequestMapping(method = RequestMethod.GET,path = {"/"})
    public ResponseEntity<List<Book>> getAll(){
        List <Book> books = bookService.getAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET,path = {"/name/{title}"})
    public ResponseEntity<List<Book>> getBookByName(@PathVariable String title){
        List<Book> books = bookService.getByName(title);
        return new ResponseEntity<>(books,HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET,path = {"/author/{author}"})
    public ResponseEntity<List<Book>> getBookByAuthor(@PathVariable String author){
        List<Book> books = bookService.getByAuthor(author);
        return new ResponseEntity<>(books,HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET,path = {"/isbn/{isbn}"})
    public ResponseEntity<List<Book>> getBookByIsbn(@PathVariable String isbn){
        List<Book> books = bookService.getByIsbn(Long.parseLong(isbn));
        return new ResponseEntity<>(books,HttpStatus.OK);
    }
}
