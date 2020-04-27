package com.school.nittanypath.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Entity
public class CommentDto {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    @NotNull
    @NotEmpty
    private int post_id;
    @NotNull
    @NotEmpty


    @NotEmpty
    private String comment;
    @NotNull
    @NotEmpty
    private String comment_email;
    @NotNull
    @NotEmpty


    public String getComment(){return comment;}
    public void setComment(final String comment){
        this.comment = comment;
    }

    public String getComment_email(){return comment_email;}
    public void setComment_email(final String comment_email){
        this.comment_email = comment_email;
    }
    public int getPost_id(){return post_id;}
    public void setPost_id(final int post_id){
        this.post_id = post_id;
    }
    public CommentDto(int post_id, String comment_email, String comment){
        this.post_id=post_id;
        this.comment_email = comment_email;
        this.comment = comment;
    }
    public CommentDto(){}
}
