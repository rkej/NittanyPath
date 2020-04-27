package com.school.nittanypath.controllers;

import com.school.nittanypath.dto.CommentDto;
import com.school.nittanypath.dto.ForumDto;
import com.school.nittanypath.dto.GradingDto;
import com.school.nittanypath.dto.UserDto;
import com.school.nittanypath.repository.CommentRepository;
import com.school.nittanypath.repository.ForumRepository;
import com.school.nittanypath.repository.GradeRepository;
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
    @Autowired
    GradeRepository graderepo;
    @Autowired
    ForumRepository forumrepo;
    @Autowired
    CommentRepository commentrepo;
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
            if(userRepo.studentByEmail(email).size() > 0) {
                try {
                    if (userRepo.isTA(email).equals("")) {
                        return new ResponseEntity<>("Student", HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("TA", HttpStatus.OK);
                    }
                }
                catch(NullPointerException ne){
                    return new ResponseEntity<>("Student", HttpStatus.OK);
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
    @RequestMapping(value = "api/getTACourseInfo", method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    String get_TA_course_info(@RequestParam("team_id") Integer team_id) {
        return userRepo.getTACourseInformation(team_id);
    }
    @RequestMapping(value = "api/getTATeamID", method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    String get_TA_team_id(@RequestParam("email") String email) {
        return userRepo.isTA(email);
    }

    @RequestMapping(value = "api/getProfInfo",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    List<Object> get_prof_data(@RequestParam("course") String  course) {
        List<Object> list1 = userRepo.getProfInfo(course);
        list1.add(userRepo.getDropdead(course));
        return list1;
    }
    @RequestMapping(value = "api/getAssInfo",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    List<GradingDto> get_prof_data(@RequestParam("course") String  course, @RequestParam("email") String  email) {
        return graderepo.getAssInfo(course, email);
    }
    @RequestMapping(value = "api/getHWAvg",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    float get_hw_avg(@RequestParam("course") String  course, @RequestParam("hw_num") int  hw_num) {
        return graderepo.getHWavg(course, hw_num);
    }
    @RequestMapping(value = "api/getExamAvg",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    float get_exam_avg(@RequestParam("course") String  course, @RequestParam("exam_num") int  exam_num) {
        return graderepo.getExamavg(course, exam_num);
    }
    @RequestMapping(value = "api/getPosts",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    List<ForumDto> getPosts(@RequestParam("course") String  course) {
        return forumrepo.getPosts(course);
    }
    @RequestMapping(value = "api/getComments",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    List<CommentDto> getComments(@RequestParam("post_id") int  post_id) {
        return commentrepo.getComments(post_id);
    }
    @RequestMapping(value = "api/addComment",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    List<CommentDto> addComment(@RequestParam("post_id") int post_id, @RequestParam("comment") String comment, @RequestParam("comment_email") String comment_email) {
        commentrepo.insertComment(post_id, comment, comment_email);
        System.out.println(commentrepo.getComments(post_id));
        return commentrepo.getComments(post_id);
    }
    @RequestMapping(value = "api/addPost",  method = RequestMethod.POST, produces = {"application/json"})
    public @ResponseBody
    List<ForumDto> addPost(@RequestParam("post") String post, @RequestParam("post_email") String post_email, @RequestParam("course") String course) {
        forumrepo.insertPost(course, post_email, post);
        return getPosts(course);
    }
}
