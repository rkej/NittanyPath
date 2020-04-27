package com.school.nittanypath.repository;

import com.school.nittanypath.dto.GradingDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GradeRepository extends JpaRepository<GradingDto, Integer> {
    @Query(value = "SELECT * FROM canvaspath.grading_dto where course = :course and email = :email", nativeQuery = true)
    List<GradingDto> getAssInfo(@Param("course") String course, @Param("email") String email);
    @Query(value = "SELECT AVG(hw_grade) FROM canvaspath.grading_dto where course = :course and hw_num = :hw_num", nativeQuery = true)
    float getHWavg(@Param("course") String course, @Param("hw_num") int hw_num);
    @Query(value = "SELECT AVG(exam_grade) FROM canvaspath.grading_dto where course = :course and exam_num = :exam_num", nativeQuery = true)
    float getExamavg(@Param("course") String course, @Param("exam_num") int exam_num);
}
