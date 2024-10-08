package io.bootcamp.vimtages.persistence.jpa;

import io.bootcamp.vimtages.model.Model;
import io.bootcamp.vimtages.persistence.Dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

public abstract class GenericJpaDao <T extends Model> implements Dao<T> {
    protected Class<T> modelType;
    @PersistenceContext
    protected EntityManager em;

    /**
     * Initializes a new JPA DAO instance given a model type
     *
     * @param modelType the model type
     */
    public GenericJpaDao(Class<T> modelType) {
        this.modelType = modelType;
    }

    /**
     * Sets the entity manager
     *
     * @param em the entity manager to set
     */
    public void setEm(EntityManager em) {
        this.em = em;
    }

    /**
     * @see Dao#findAll()
     */
    @Override
    public List<T> findAll() {

        CriteriaQuery<T> criteriaQuery = em.getCriteriaBuilder().createQuery(modelType);
        Root<T> root = criteriaQuery.from(modelType);
        return em.createQuery(criteriaQuery).getResultList();
    }

    /**
     * @see Dao#findById(Integer)
     */
    @Override
    public T findById(Integer id) {
        return em.find(modelType, id);
    }

    /**
     * @see Dao#saveOrUpdate(Model)
     */
    @Override
    public T saveOrUpdate(T modelObject) {
        T savedObject = em.merge(modelObject);
        System.out.println("printing from jpa abstract: " + savedObject);
        return savedObject;
    }

    /**
     * @see Dao#delete(Integer)
     */
    @Override
    public void delete(Integer id) {
        em.remove(em.find(modelType, id));
    }
}
