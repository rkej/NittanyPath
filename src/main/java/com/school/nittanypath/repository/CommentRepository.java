package com.school.nittanypath.repository;

import com.school.nittanypath.dto.CommentDto;
import com.school.nittanypath.dto.ForumDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import javax.xml.stream.events.Comment;
import java.util.List;
@Repository
@Transactional
public interface CommentRepository extends JpaRepository<CommentDto, Integer> {
    @Query(value = "SELECT * FROM canvaspath.comment_dto where post_id = :post_id", nativeQuery = true)
    List<CommentDto> getComments(@Param("post_id") int post_id);
    @Modifying
    @Query(value = "INSERT INTO canvaspath.comment_dto (post_id, comment, comment_email) VALUES (:post_id, :comment, :comment_email)", nativeQuery = true)
    void insertComment(@Param("post_id") int post_id, @Param("comment") String comment, @Param("comment_email") String comment_email);
}