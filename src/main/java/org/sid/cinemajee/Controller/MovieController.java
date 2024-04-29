package org.sid.cinemajee.Controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.sid.cinemajee.Entity.Category;
import org.sid.cinemajee.Entity.Movie;
import org.sid.cinemajee.Repository.CategoryRepository;
import org.sid.cinemajee.Repository.MovieRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
public class MovieController {
	@Autowired
    private MovieRepository movieRepository;
	@Autowired
    private CategoryRepository categoryRepository;

	@PostMapping("/save/movie")
	public ResponseEntity<?> saveMovie(@RequestBody Movie movie) {
		
	    List<Movie> existingMovies = movieRepository.findByTitle(movie.getTitle());
	    if (!existingMovies.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body("A movie with the same title already exists.");
	    }

	    Set<Category> managedCategories = new HashSet<>();
	    for (Category category : movie.getCategories()) {
	        // Retrieve all categories that match the given name
	        List<Category> existingCategories = categoryRepository.findByName(category.getName());

	        if (existingCategories.isEmpty()) {
	            
	            Category newCategory = new Category();
	            newCategory.setName(category.getName());
	            managedCategories.add(categoryRepository.save(newCategory));
	        } else {
	            managedCategories.add(existingCategories.get(0));
	        }
	    }

	    movie.setCategories(managedCategories); 
	    Movie savedMovie = movieRepository.save(movie); 
	    return ResponseEntity.ok(savedMovie);
	}

	
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    @GetMapping(value = "/movies/{id}")
    public Movie getMovieById(@PathVariable("id") Long id) {
        return movieRepository.findById(id).orElse(null); 
    }
    @GetMapping("/search/movie/{title}") 
    public List<Movie> getMovieByTitle(@PathVariable String title) {
        return movieRepository.findByTitle(title);
    }

    @GetMapping("/search/category/{name}") 
    public List<Category> getCategoryByName(@PathVariable String name) {
        return categoryRepository.findByName(name);
    }
}
