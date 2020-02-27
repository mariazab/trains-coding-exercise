package com.example.trains;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RestTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void testAuthentication() throws Exception {
		//Testing authentication with valid credentials
		this.mockMvc.perform(post("/login").content("{\"username\":\"user\",\"password\":\"user\"}"))
			.andDo(print()).andExpect(status().isOk());
		
		//Testing with wrong credentials
		this.mockMvc.perform(post("/login").content("{\"username\":\"user\",\"password\":\"User123\"}"))
			.andDo(print()).andExpect(status().is4xxClientError());
	}
	
	@Test
	public void testAccessToSecureEndpointsWithoutAuthentication() throws Exception {
		this.mockMvc.perform(get("/trains")).andDo(print()).andExpect(status().is4xxClientError());
		this.mockMvc.perform(get("/users")).andDo(print()).andExpect(status().is4xxClientError());
	}
	
	@Test
	public void testGetTrainWithToken() throws Exception {
		//First, login with credentials and get the token from the response	
		MvcResult result = this.mockMvc.perform(post("/login")
		            .content("{\"username\":\"user\",\"password\":\"user\"}")).andDo(print())
		            .andExpect(status().isOk()).andReturn();
		
		String token = result.getResponse().getHeader("Authorization");
		
		//Testing fetching one train with the acquired token
        this.mockMvc.perform(get("/trains/3").header("Authorization", token)).andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.destination").value("Kuopio"));
        
        //Testing fetching all trains with the acquired token
        this.mockMvc.perform(get("/trains").header("Authorization", token)).andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"));
	}
	
	@Test
	public void testGetUserWithToken() throws Exception {
		//First, login with credentials and get the token from the response	
		MvcResult result = this.mockMvc.perform(post("/login")
		            .content("{\"username\":\"user\",\"password\":\"user\"}")).andDo(print())
		            .andExpect(status().isOk()).andReturn();
		
		String token = result.getResponse().getHeader("Authorization");
		
		//Testing fetching user by username with the acquired token
		this.mockMvc.perform(get("/users/user").header("Authorization", token)).andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$.fullName").value("John Doe"));
	}

}