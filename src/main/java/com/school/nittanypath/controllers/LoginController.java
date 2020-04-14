package com.school.nittanypath.controllers;

import com.school.nittanypath.dto.UserDto;
import com.school.nittanypath.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;
import org.mindrot.jbcrypt.BCrypt;
@RestController
@EnableJpaRepositories("com.school.nittanypath.repository")
public class LoginController{
    @Autowired UserRepository userRepo;

    @PostMapping(value = "/api/signin")
    public @ResponseBody
    ResponseEntity<String> login(@RequestParam("email") String email, @RequestParam("password") String password, UserRepository  repo) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encoded_password = encoder.encode(password);
        List<UserDto> login = userRepo.findByEmail(email);
        UserDto user = login.get(0);
        System.out.println(BCrypt.hashpw(password, BCrypt.gensalt()));
        boolean bool = encoder.matches(password, user.getPassword());

        if ((BCrypt.checkpw(password, user.getPassword()))){
            if(userRepo.studentByEmail(email).size() > 0){
                if(userRepo.isTA(email).equals("")) {
                    return new ResponseEntity<>("Student", HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<>("TA", HttpStatus.OK);
                }
            }
            else if(userRepo.profByEmail(email).size() > 0) {
                return new ResponseEntity<>("Professor", HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>( "Login Failed", HttpStatus.NOT_FOUND );
        }
        return new ResponseEntity<>( "Login Failed", HttpStatus.NOT_FOUND );
    }
    @RequestMapping(value = "api/getCourseInfo", method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    List<Object> get_course_info(@RequestParam("email") String email) {
        return userRepo.getCourseInformation(email);
    }


}
