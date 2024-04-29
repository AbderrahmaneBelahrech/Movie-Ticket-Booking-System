package org.sid.cinemajee.Repository;

import java.util.List;

import org.sid.cinemajee.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	List<Category> findByName(String name);
}
