package io.bootcamp.vimtages.persistence.jpa;

import io.bootcamp.vimtages.model.Book;
import io.bootcamp.vimtages.persistence.BookDao;
import io.bootcamp.vimtages.persistence.Dao;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * A JPA {@link BookDao} implementation
 */
@Repository
public class JpaBookDao extends GenericJpaDao<Book> implements BookDao {
    /**
     * @see GenericJpaDao#GenericJpaDao(Class)
     */
    public JpaBookDao(){super(Book.class);}

    public List<Book> getBookByName(String title){
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Book> criteriaQuery = criteriaBuilder.createQuery(Book.class);
        Root<Book> root = criteriaQuery.from(Book.class);

        // Specify the condition
        criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("title"), title));

       return  em.createQuery(criteriaQuery).getResultList();


    }
}
