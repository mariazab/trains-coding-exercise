package com.example.trains.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.trains.domain.User;
import com.example.trains.domain.UserRepository;

@RestController
public class UserController {
	
	@Autowired
	UserRepository repository;

	//REST service to get all users
	@RequestMapping (value="/users", method=RequestMethod.GET)
	public Iterable<User> userList() {
		return repository.findAll();
	}
	
	//REST service to get user by username
	@RequestMapping (value="/users/{username}", method=RequestMethod.GET)
	public User findUser(@PathVariable("username") String username) {
		return repository.findByUsername(username);
	}
	
}