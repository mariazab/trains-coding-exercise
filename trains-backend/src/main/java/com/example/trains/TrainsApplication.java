package com.example.trains;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.trains.domain.Train;
import com.example.trains.domain.TrainRepository;
import com.example.trains.domain.User;
import com.example.trains.domain.UserRepository;


@SpringBootApplication
public class TrainsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrainsApplication.class, args);
	}
	
	@Bean
	CommandLineRunner cmdRunner(UserRepository userRepository, TrainRepository trainRepository) {
		 return args -> {
			 
			 //Save data into H2 in-memory database
			 
			 //user with username: user, password: user
			 userRepository.save(new User("user", "$2y$12$BvZLVDXdlItvwpmHnY6W7eVV7yhBO8bN2o7VsHkbGNksfy8HB6r.q", "John Doe", "john@gmail.com", "user"));
			 //user with username: admin, password: admin
			 userRepository.save(new User("admin", "$2y$12$HWfhQJ1crCFRQRtlaIW9zer25dS9WA2WzaXyi.ny.3Q6hoWRNen6q", "Jane Doe", "jane@gmail.com", "admin"));
			 
			 trainRepository.save(new Train("Intercity 61", "Kuopio", 53, 61.687846, 27.278290));
			 trainRepository.save(new Train("Intercity 1", "Joensuu", 130, 61.867294, 29.790280));
			 trainRepository.save(new Train("Intercity 21", "Oulu", 101, 62.990038, 22.240595));
			 trainRepository.save(new Train("Intercity 945", "Turku", 100, 60.4518,22.2666));
			 trainRepository.save(new Train("Z", "Lahti", 0, 60.976448, 25.658437));
			 trainRepository.save(new Train("R", "Riihimäki", 120, 60.649390, 24.840584));
			 trainRepository.save(new Train("K", "Kerava", 90, 60.341736, 25.073556));
			 trainRepository.save(new Train("L", "Kirkkonummi", 70, 60.216136, 24.753532));
			 
		 	}; 
		 }
}