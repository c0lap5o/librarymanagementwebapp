package io.bootcamp.vimtages;

import io.bootcamp.vimtages.model.Book;
import io.bootcamp.vimtages.persistence.jpa.JpaBookDao;
import io.bootcamp.vimtages.service.BookServiceImpl;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.Date;
import java.util.List;

public class TestMain {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("mylibrary");
        EntityManager em = emf.createEntityManager();
        //CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        Book book = em.find(Book.class,1);
        System.out.println("book index 1: " + book);

        JpaBookDao jpaBookDao = new JpaBookDao();
        jpaBookDao.setEm(em);

        System.out.println("Book List");
        List<Book> books = jpaBookDao.findAll();
        books.forEach(System.out::println);

        Book book1 = new Book();
        book1.setTitle("new book");
        book1.setAuthor("me");
        book1.setPublishedDate(new Date());
        book1.setISBN(1321654865);
        book1.setPrice(19.0);
        book1.setId(1);
        System.out.println("here");
        System.out.println(book1);

        BookServiceImpl bookService = new BookServiceImpl();
        bookService.setBookDao(jpaBookDao);

        Book createdBook = bookService.saveOrUpdate(book);

        System.out.println("here");
        System.out.println(createdBook);

        jpaBookDao.delete(1);

        /*
        Book book2 = new Book();
        bookService.saveOrUpdate(book2);

        books = bookService.getAll();
        System.out.println("contains" + books.contains(book2));
*/
        //books = jpaBookDao.findAll();
        //books.forEach(System.out::println);
        //System.out.println("Testing getting book by name");

        //System.out.println(jpaBookDao.getBookByName("The Girl with the Dragon Tattoo"));


    }


}
