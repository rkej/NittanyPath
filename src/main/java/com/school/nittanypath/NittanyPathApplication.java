package com.school.nittanypath;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Controller;

@SpringBootApplication
@EnableJpaAuditing
@Controller
public class NittanyPathApplication {

	public static void main(String[] args) {
		SpringApplication.run(NittanyPathApplication.class, args);
	}

}
