package org.sid.cinemajee.Repository;

import java.util.List;


import org.sid.cinemajee.Entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MovieRepository extends JpaRepository <Movie, Long> {
	List<Movie> findAll();
    List<Movie> findByTitle(String title);
     
}
