package com.example.trains.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.trains.domain.Train;
import com.example.trains.domain.TrainRepository;

@RestController
public class Controller {

	@Autowired
	TrainRepository repository;
	
	//REST service to get all trains
	@RequestMapping (value="/trains", method=RequestMethod.GET)
	public Iterable<Train> trainList() {
		return repository.findAll();
	}
	
	//REST service to get train by id
	@RequestMapping (value="/trains/{id}", method=RequestMethod.GET)
	public Optional<Train> train(@PathVariable("id") Long id) {
		return repository.findById(id);
	}
	
	//REST Service to update train's location, returns updated list of all trains
	@RequestMapping (value="/trains/{id}/location", method=RequestMethod.PUT)
	public Iterable<Train> updatedTrain(@PathVariable("id") Long id, @RequestBody Train newTrain) {
		
		//Check if train with this id is found
		boolean trainFound = repository.findById(id).isPresent();
		
		//If the train exists, update the information with the new ones and return all trains
		if(trainFound) {
			Optional<Train> trainOpt = repository.findById(id);
			Train train = trainOpt.get();
			train.setName(newTrain.getName());
			train.setDestination(newTrain.getDestination());
			train.setSpeed(newTrain.getSpeed());
			train.setCoordinates(newTrain.getCoordinates());
			repository.save(train);
			return repository.findAll();
		} 
		//Otherwise, throw exception with the status code 404 Not Found
		else {
			throw new NotFoundException();
		}

	}
	
}