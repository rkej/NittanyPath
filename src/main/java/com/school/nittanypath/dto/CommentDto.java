package com.school.nittanypath.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Entity
public class CommentDto {
    @Id
    private int post_id;
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

    public String getPost_email(){
        return post_email;
    }

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
