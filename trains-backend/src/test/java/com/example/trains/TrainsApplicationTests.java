package com.example.trains;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.trains.web.Controller;
import com.example.trains.web.UserController;

@SpringBootTest
class TrainsApplicationTests {
	
	@Autowired
	private Controller controller;
	
	@Autowired
	private UserController userController;

	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
		assertThat(userController).isNotNull();
	}

}