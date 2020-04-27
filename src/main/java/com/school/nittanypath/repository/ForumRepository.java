package com.school.nittanypath.repository;

import com.school.nittanypath.dto.ForumDto;
import com.school.nittanypath.dto.GradingDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ForumRepository extends JpaRepository<ForumDto, Integer> {
    @Query(value = "SELECT * FROM canvaspath.forum_dto where course = :course", nativeQuery = true)
    List<ForumDto> getPosts(@Param("course") String course);

}