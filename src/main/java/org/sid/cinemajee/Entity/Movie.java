package org.sid.cinemajee.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name= "movie")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String title;
    private String description;
    private double duration;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date releaseDate;
    private double rating;
    private int minAge;
    private String director;
    private String cover;
    private String trailer;
    //private Boolean available;

   
    //@JsonIgnoreProperties("movies")
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
        name = "movie_category",
        joinColumns = {@JoinColumn(name = "movie_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "category_id", referencedColumnName = "id")}
    )
    
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Reservation> reservations = new HashSet<>();
}
