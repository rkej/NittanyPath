package com.school.nittanypath.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Entity
public class UserDto {
    @Id
    private String email;
    @NotNull
    @NotEmpty
    private String password;
    @NotNull
    @NotEmpty
    
    public String getPassword() {
        return password;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(final String email){
        this.email = email;
    }
    public void setPassword(final String password) {
        this.password = password;
    }
    public UserDto(String email, String password){
        this.email=email;
        this.password=password;
    }
}
