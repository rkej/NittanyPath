package com.school.nittanypath.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Entity
public class ForumDto {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
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



    public String getCourse() {
        return course;
    }
    public String getPost_email(){
        return post_email;
    }
    public void setPost_email(final String email){
        this.post_email = post_email;
    }
    public String getPost(){return post;}
    public void setPost(final String post){
        this.post = post;
    }
    public int getPost_id(){return post_id;}
    public void setPost_id(final int post_id){
        this.post_id = post_id;
    }
    public ForumDto(int post_id, String post_email, String course, String post){
        this.post_id=post_id;
        this.course=course;
        this.post_email=post_email;
        this.post = post;
    }
    public ForumDto(){}
}
