package io.bootcamp.vimtages;

import io.bootcamp.vimtages.model.Book;
import io.bootcamp.vimtages.persistence.jpa.JpaBookDao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
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

        System.out.println("Testing getting book by name");

        System.out.println(jpaBookDao.getBookByName("The Girl with the Dragon Tattoo"));
    }


}
