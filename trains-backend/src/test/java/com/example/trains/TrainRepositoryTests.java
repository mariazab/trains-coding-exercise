package com.example.trains;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.trains.domain.Train;
import com.example.trains.domain.TrainRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TrainRepositoryTests {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private TrainRepository repository;
	
	@Test
	public void saveTrain() {
		Train train = new Train("Intercity 21", "Rovaniemi", 123, 61.687846, 27.278290);
		entityManager.persistAndFlush(train);
		assertThat(train.getId()).isNotNull();
	}
	
	@Test
	public void deleteAllTrains() {
		Train train1 = new Train("Intercity 21", "Rovaniemi", 123, 61.687846, 27.278290);
		Train train2 = new Train("Intercity 21", "Joensuu", 103, 61.687846, 27.278290);
		entityManager.persistAndFlush(train1);
		entityManager.persistAndFlush(train2);
		repository.deleteAll();
		assertThat(repository.findAll()).isEmpty();
	}
		
}