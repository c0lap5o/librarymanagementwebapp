package io.bootcamp.vimtages.controller.rest;

import io.bootcamp.vimtages.model.Book;

import io.bootcamp.vimtages.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

/**
 *Rest controller returns json data
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/books")
public class RestBookController {
    private BookService bookService;

    @Autowired
    public void setBookService(BookService bookService) {
        this.bookService = bookService;
    }

    @RequestMapping(method = RequestMethod.GET,path = {""})
    public ResponseEntity<List<Book>> getAll(){
        List <Book> books = bookService.getAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
    @RequestMapping(method = RequestMethod.GET,path = {"/{id}"})
    public ResponseEntity<Book> getBookById(@PathVariable Integer id){
        if(id < 0 || bookService.get(id) == null){
         return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Book book = bookService.get(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST,path = {""})
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(book.getId() != null){
            System.out.println(book.getId());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Book createdBook = bookService.saveOrUpdate(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    @RequestMapping(method = RequestMethod.DELETE,path = "/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Integer id){
        if (bookService.get(id) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        bookService.delete(id);
        return new ResponseEntity<Book>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT,path = "/{id}")
    public ResponseEntity<Book> updateBook(@Valid @RequestBody Book book, BindingResult bindingResult, @PathVariable Integer id ){
        if (bookService.get(id) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        book.setId(id);
        Book updatedBook = bookService.saveOrUpdate(book);
        return new ResponseEntity<>(updatedBook,HttpStatus.OK);
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
