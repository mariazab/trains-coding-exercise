package com.example.trains;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.trains.domain.User;
import com.example.trains.domain.UserRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTests {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private UserRepository repository;
	
	@Test
	public void saveUser() {
		User user = new User("testuser", "$2y$12$u9FCuAEs9z0G8jWJG/.ZjOytU.kHgLzGBK16HLQXAZ.JsV6y5YI0q\r\n", "Test User", "test@user.com", "user");
		entityManager.persistAndFlush(user);
		assertThat(user.getId()).isNotNull();
	}
	
	@Test
	public void deleteUser() {
		User user = new User("testuser", "$2y$12$u9FCuAEs9z0G8jWJG/.ZjOytU.kHgLzGBK16HLQXAZ.JsV6y5YI0q\r\n", "Test User", "test@user.com", "user");
		entityManager.persistAndFlush(user);
		repository.deleteAll();
		assertThat(repository.findAll()).isEmpty();
	}
	
	@Test
	public void findByUsername() {
		User user = repository.findByUsername("user");
		assertThat(user.getFullName()).isEqualTo("John Doe");
	}

}