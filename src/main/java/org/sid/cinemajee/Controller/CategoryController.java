package org.sid.cinemajee.Controller;

import org.sid.cinemajee.Entity.Category;

import org.sid.cinemajee.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/category") 
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories); // Return list of categories with HTTP 200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

//    @PostMapping("/add") 
//    public ResponseEntity<String> createCategory(@RequestBody Category category) {
//        Category savedCategory = categoryRepository.save(category);
//        return ResponseEntity.ok("id= " + savedCategory.getId() + " name= " + savedCategory.getName() + " Bien ajoutée !!");
//    }
    
    @PostMapping("/add")
    public ResponseEntity<?> createCategories(@RequestBody List<Category> categories) {
        // Initialize response messages
        StringBuilder response = new StringBuilder();
        List<String> existingNames = categoryRepository.findAll()
            .stream()
            .map(Category::getName)
            .collect(Collectors.toList());

        for (Category category : categories) {
            // Check if category with the same name already exists
            if (existingNames.contains(category.getName())) {
                // If category exists, append to response message
                response.append("Error: Category with name '").append(category.getName()).append("' already exists!\n");
            } else {
                // If category does not exist, save the new category
                Category savedCategory = categoryRepository.save(category);
                response.append("id= ").append(savedCategory.getId())
                        .append(" name= ").append(savedCategory.getName())
                        .append(" Bien ajoutée !!\n");
                existingNames.add(category.getName()); // Update the list to include the newly added category
            }
        }
        
        if (response.toString().contains("Error:")) {
            return ResponseEntity.badRequest().body(response.toString());
        }
        return ResponseEntity.ok(response.toString());
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setName(categoryDetails.getName());
                    // Further updates can be made here
                    categoryRepository.save(existingCategory);
                    return ResponseEntity.ok("id= " + existingCategory.getId() + " name= " + existingCategory.getName() + " Bien modifiée !!");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(category -> {
                    categoryRepository.delete(category);
                    return ResponseEntity.ok("id= " + category.getId() + " name= " + category.getName() + " Bien supprimée !!");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
