package com.school.nittanypath.repository;

import com.school.nittanypath.dto.GradingDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GradeRepository extends JpaRepository<GradingDto, Integer> {
    @Query(value = "SELECT * FROM canvaspath.grading_dto where course = :course and email = :email", nativeQuery = true)
    List<GradingDto> getAssInfo(@Param("course") String course, @Param("email") String email);
}
