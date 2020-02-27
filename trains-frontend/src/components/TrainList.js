import React, { Component } from "react";
import {SERVER_URL} from "../constants.js";
import { TableContainer, TableHead, TableRow, TableCell, Table,
        Paper, Typography, Button, 
        Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@material-ui/core";

//Component with the list of trains
class TrainList extends Component {

    constructor(props) {
        super(props);
        this.state = { trains: [], openDialog: false, lat: "", lon: "", currentTrainId: "", currentTrain: {} };
    }

    componentDidMount() {
        this.fetchTrains();
    }

    //Fetching trains with the token and saving it to state
    fetchTrains = () => {
        //Get the token from the session storage
        const token = sessionStorage.getItem("jwtToken");
        fetch(SERVER_URL + "trains", {
            headers: {"Authorization": token}
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                trains: responseData,
            });
        })
        .catch(err => console.error(err));
    }

    //When the 'Update Location' button is clicked, fetch the data of this train and open the dialog
    openUpdateDialog = (id) => {
        const token = sessionStorage.getItem("jwtToken");
        fetch(SERVER_URL + "trains/" + id, {
            headers: {"Authorization": token}
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                currentTrain: responseData,
                openDialog: true,
            });
        })
        .catch(err => console.error(err));
    }

    //Closing the dialog
    handleClose = () => {
        this.setState({openDialog: false});
    }

    //Saving the data from the fields from the dialog
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }

    //Update the train's location with HTTP PUT request
    update = () => {

        let currentTrainId = this.state.currentTrain.id;

        //Get the current values of the train
        let train = {...this.state.currentTrain};

        //Parse the Lat and Lon strings, if the strings are empty, this will return NaN
        let newLat = parseFloat((this.state.lat).replace(",", "."));
        let newLon = parseFloat((this.state.lon).replace(",", "."));

        //If the Lat and Lon are both Nan, return and go back to train list without changing anything
        if(isNaN(newLat) && isNaN(newLon)) {
            this.handleClose();
            return;
        }
        //If Lat is NaN, update only the Lon, the Lat stays the same
        else if (isNaN(newLat)) {
            train.coordinates[1] = newLon;
        } 
        //If the Lon is NaN, update only the Lat, the Lon stays the same
        else if(isNaN(newLon)) {
            train.coordinates[0] = newLat;
        } 
        //Otherwise, update both values
        else {
            train.coordinates = [newLat, newLon];
        }

        //Send the train to the server and update the state with the response
        const token = sessionStorage.getItem("jwtToken");
        fetch(SERVER_URL + "trains/" + currentTrainId + "/location", {
            method: "PUT", 
            headers: {"Authorization": token, "Content-Type": "application/json"},
            body: JSON.stringify(train)
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                trains: responseData,
            })

        })
        .catch(err =>console.error(err));
        
        //Close the dialog
        this.handleClose();

        //Reset the dialog's fields
        this.setState({lat: "", lon: ""});
    }

    render() {
        const trainRows = this.state.trains.map((train, index) =>
            <TableRow key={index}>
                <TableCell>{train.name}</TableCell>
                <TableCell>{train.destination}</TableCell>
                <TableCell>{train.speed}</TableCell>
                <TableCell>Latitude: {train.coordinates[0]}
                            <br />
                            Longitude: {train.coordinates[1]}
                </TableCell>
                <TableCell>
                <Button variant="outlined" color="secondary" size="small" onClick={() => this.openUpdateDialog(train.id)}>Update location</Button>
                </TableCell>
            </TableRow>
        );

        return (
            <div className="content">

            {/* Dialog with fields to update train */}
            <Dialog open={this.state.openDialog} onClose={this.handleClose}>
                <DialogTitle>Update location of {this.state.currentTrain.name} train to {this.state.currentTrain.destination}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus
                                name="lat" label="Latitude" 
                                variant="outlined" onChange={this.handleChange} value={this.state.lat}/>
                    <TextField name="lon" label="Longitude"
                                variant="outlined" onChange={this.handleChange} value={this.state.lon}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.update}>Save</Button>
                    <Button onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Train Name</Typography></TableCell>
                            <TableCell><Typography variant="h6">Destination</Typography></TableCell>
                            <TableCell><Typography variant="h6">Speed</Typography></TableCell>
                            <TableCell><Typography variant="h6">Location</Typography></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                            {trainRows}
                    </TableHead>
                </Table>
            </TableContainer>
            </div>
        );
    }
}

export default TrainList;