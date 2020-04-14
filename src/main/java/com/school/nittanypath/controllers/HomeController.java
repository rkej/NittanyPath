package com.school.nittanypath.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class HomeController {

    @GetMapping(value = "/signin")
    public String signin_cli() {
        return "index.html";
    }
    @GetMapping(value = "/home{email}")
    public String home_cli() { return "index.html";}
    @GetMapping(value = "/dashTA{email}")
    public String dashTA() { return "index.html";}
    @GetMapping(value = "/dashProf{email}")
    public String dashProf() { return "index.html";}

}
