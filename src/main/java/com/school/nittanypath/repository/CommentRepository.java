package com.school.nittanypath.repository;

import com.school.nittanypath.dto.CommentDto;
import com.school.nittanypath.dto.ForumDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.xml.stream.events.Comment;
import java.util.List;

public interface CommentRepository extends JpaRepository<CommentDto, Integer> {
    @Query(value = "SELECT * FROM canvaspath.comment_dto where post_id = :post_id", nativeQuery = true)
    List<CommentDto> getComments(@Param("post_id") int post_id);
}