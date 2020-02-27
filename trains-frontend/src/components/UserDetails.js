import React, { Component } from "react";
import {SERVER_URL} from "../constants.js";
import "../App.css";
import Typography from "@material-ui/core/Typography";

//Component with details of the user
class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    componentDidMount() {
        this.fetchUser();
    }

    //Fetch the user information and save it to state
    fetchUser = () => {
        //Get the token and username from the session storage
        const token = sessionStorage.getItem("jwtToken");
        const username = sessionStorage.getItem("username");
        fetch(SERVER_URL + "users/" + username, {
            headers: {"Authorization": token}
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                user: responseData,
            });
    })
        
        .catch(err => console.error(err));
    }

    render() {

        return (
            <div className="content"> 
                <Typography variant="h4">User details</Typography>
                <br /><br />
                <Typography variant="h6">Username: {this.state.user.username}</Typography>
                <Typography variant="h6">Full name: {this.state.user.fullName}</Typography>
                <Typography variant="h6">Email: {this.state.user.email}</Typography>
                
            </div>
        );
    }
}

export default UserDetails;