package com.school.nittanypath.repository;
import com.school.nittanypath.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;


@EnableJpaRepositories(basePackages = "com.school.nittanypath.repository")
@Repository
@Transactional
public interface UserRepository extends JpaRepository<UserDto, Integer> {
    @Query(value = "select * FROM canvaspath.user_dto where email = :email", nativeQuery = true)
    List<UserDto> findByEmail(@Param("email") String email);
    @Query(value = "select * FROM canvaspath.stud_dto where email = :email", nativeQuery = true)
    List<String> studentByEmail(@Param("email") String email);
    @Query(value = "select * FROM canvaspath.prof_dto where email = :email", nativeQuery = true)
    List<String> profByEmail(@Param("email") String email);
    @Query(value = "select Teaching_Team_ID FROM canvaspath.stud_dto where email = :email", nativeQuery = true)
    String isTA(@Param("email") String email);
    @Query(value = "SELECT Courses_1,Course_1_Name, Course_1_Details, Course_1_Section, Courses_2,Course_2_Name, Course_2_Details, Course_2_Section, Courses_3,Course_3_Name, Course_3_Details, Course_3_Section from stud_dto WHERE email = :email", nativeQuery = true)
    List<Object> getCourseInformation(@Param("email") String email);
    @Query(value = "select * FROM canvaspath.prof_dto where email = :email", nativeQuery = true)
    List<String> getProfInformation(@Param("email") String email);
}
