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

}
