package com.school.nittanypath.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Entity
public class GradingDto {
    @Id
    private String email;
    @NotNull
    @NotEmpty
    private String course;
    @NotNull
    @NotEmpty
    private int hw_num;
    @NotNull
    @NotEmpty
    private int exam_num;
    @NotNull
    @NotEmpty
    private String hw_details;
    @NotNull
    @NotEmpty
    private String exam_details;
    @NotNull
    @NotEmpty
    private float exam_grade;
    @NotNull
    @NotEmpty
    private float hw_grade;
    @NotNull
    @NotEmpty


    public String getCourse() {
        return course;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(final String email){
        this.email = email;
    }
    public int getHw_num(){return hw_num;}
    public void setHw_num(final int hw_num){
        this.hw_num = hw_num;
    }
    public float getHw_grade(){return hw_grade;}
    public void setHw_grade(final float hw_grade){
        this.hw_grade = hw_grade;
    }
    public int getExam_num(){return exam_num;}
    public void setExam_num(final int exam_num){
        this.exam_num = exam_num;
    }
    public float getExam_grade(){return exam_grade;}
    public void setExam_grade(final float exam_grade){
        this.exam_grade = exam_grade;
    }

    public void setCourse(final String course) {
        this.course = course;
    }
    public String getHw_details(){
        return hw_details;
    }
    public void setHw_details(final String hw_details){
        this.hw_details = hw_details;
    }
    public String getExam_details(){
        return exam_details;
    }
    public void setExam_details(final String exam_details){
        this.exam_details = exam_details;
    }
    public GradingDto(String email, String course, int hw_num, int exam_num, String hw_details, String exam_details, float exam_grade, float hw_grade){
        this.email=email;
        this.course=course;
        this.hw_details=hw_details;
        this.exam_details = exam_details;
        this.exam_grade = exam_grade;
        this.exam_num = exam_num;
        this.hw_num = hw_num;
        this.hw_grade = hw_grade;
    }
    public GradingDto(){}
}
