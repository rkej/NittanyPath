package com.school.nittanypath.repository;

import com.school.nittanypath.dto.GradingDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
@EnableJpaRepositories(basePackages = "com.school.nittanypath.repository")

@Repository
@Transactional
public interface GradeRepository extends JpaRepository<GradingDto, Integer> {
    @Query(value = "SELECT * FROM canvaspath.grading_dto where course = :course and email = :email", nativeQuery = true)
    List<GradingDto> getAssInfo(@Param("course") String course, @Param("email") String email);
    @Query(value = "SELECT AVG(hw_grade) FROM canvaspath.grading_dto where course = :course and hw_num = :hw_num", nativeQuery = true)
    float getHWavg(@Param("course") String course, @Param("hw_num") int hw_num);
    @Query(value = "SELECT AVG(exam_grade) FROM canvaspath.grading_dto where course = :course and exam_num = :exam_num", nativeQuery = true)
    float getExamavg(@Param("course") String course, @Param("exam_num") int exam_num);
    @Query(value = "SELECT email FROM canvaspath.grading_dto where course = :course", nativeQuery = true)
    List<Object> getStud(@Param("course") String course);
    @Query(value = "SELECT DISTINCT hw_num FROM canvaspath.grading_dto where course = :course", nativeQuery = true)
    List<Object> getAss(@Param("course") String course);
    @Query(value = "SELECT DISTINCT exam_num FROM canvaspath.grading_dto where course = :course", nativeQuery = true)
    List<Object> getEx(@Param("course") String course);
    @Modifying
    @Query(value = "UPDATE canvaspath.grading_dto SET hw_grade = :hw_grade WHERE email = :email and course = :course and hw_num = :hw_num", nativeQuery = true)
    void changescore(@Param("email") String email, @Param("hw_num") int hw_num, @Param("hw_grade") int hw_grade, @Param("course") String course);
    @Query(value = "UPDATE canvaspath.grading_dto SET exam_grade = :exam_grade WHERE email = :email and course = :course and exam_num = :exam_num", nativeQuery = true)
    void changeexamscore(@Param("email") String email, @Param("exam_num") int exam_num, @Param("exam_grade") int exam_grade, @Param("course") String course);
}
