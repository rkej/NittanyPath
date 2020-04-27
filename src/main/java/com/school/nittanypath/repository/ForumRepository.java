package com.school.nittanypath.repository;

import com.school.nittanypath.dto.ForumDto;
import com.school.nittanypath.dto.GradingDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
@Repository
@Transactional
public interface ForumRepository extends JpaRepository<ForumDto, Integer> {
    @Query(value = "SELECT * FROM canvaspath.forum_dto where course = :course", nativeQuery = true)
    List<ForumDto> getPosts(@Param("course") String course);
    @Modifying
    @Query(value = "INSERT INTO canvaspath.forum_dto (course, post_email, post) VALUES (:course, :post_email, :post)", nativeQuery = true)
    void insertPost(@Param("course") String course, @Param("post_email") String post_email, @Param("post") String post);
}