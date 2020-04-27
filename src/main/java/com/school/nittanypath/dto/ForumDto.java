package com.school.nittanypath.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Entity
public class ForumDto {
    @Id
    private int post_id;
    @NotNull
    @NotEmpty
    private String course;
    @NotNull
    @NotEmpty
    private String post;
    @NotNull
    @NotEmpty
    private String post_email;
    @NotNull
    @NotEmpty
    private String comment;
    @NotNull
    @NotEmpty
    private String comment_email;
    @NotNull
    @NotEmpty



    public String getCourse() {
        return course;
    }
    public String getPost_email(){
        return post_email;
    }
    public void setPost_email(final String email){
        this.post_email = post_email;
    }
    public String getComment(){return comment;}
    public void setComment(final String comment){
        this.comment = comment;
    }
    public String getPost(){return post;}
    public void setPost(final String post){
        this.post = post;
    }
    public String getComment_email(){return comment_email;}
    public void setComment_email(final String comment_email){
        this.comment_email = comment_email;
    }
    public int getPost_id(){return post_id;}
    public void setPost_id(final int post_id){
        this.post_id = post_id;
    }
    public ForumDto(int post_id, String post_email, String course, String post, String comment_email, String comment){
        this.post_id=post_id;
        this.course=course;
        this.post_email=post_email;
        this.post = post;
        this.comment_email = comment_email;
        this.comment = comment;
    }
    public ForumDto(){}
}
