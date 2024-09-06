package io.bootcamp.vimtages.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;

/**
 * Book Entity Class
 */

@Entity
@Table(name = "books")
public class Book extends AbstractModel {

    private String title;
    private String author;
    private long ISBN;
    @Temporal(TemporalType.DATE)
    private Date publishedDate;
    private double price;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public long getISBN() {
        return ISBN;
    }

    public void setISBN(long ISBN) {
        this.ISBN = ISBN;
    }

    public Date getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(Date publishedDate) {
        this.publishedDate = publishedDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Book{" + "id=" +getId() +
        ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", ISBN=" + ISBN +
                ", publishedDate=" + publishedDate +
                ", price=" + price +

                '}';
    }
}
