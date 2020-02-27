import React, { Component } from "react";
import {SERVER_URL} from "../constants";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Login from "./Login";

//Component for Registration
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", passwordCheck: "", fullName: "", email: "", 
                        userAlreadyExists: false, succeeded: false, openDialog: false, dialogText: ""};
    }

    //Save values from the fields to state
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }

    //Check if any of the fields were empty
    checkIfEmtpyFields = () => {
        let username = (this.state.username).trim(); 
        let password = (this.state.password).trim();
        let fullName = (this.state.fullName).trim();
        let email = (this.state.email).trim();
        
        if(username === "" || password === "" || fullName === "" | email === "") {
            return true;
        }
    
        return false;
    }

    //Check if the password and passwordCheck match
    checkPassword = () => {
        let password = this.state.password;
        let passwordCheck = this.state.passwordCheck;

        if(password === passwordCheck) {
            return true;
        }
        else {
            return false;
        }
    }

    //Create a hash from the password
    hashPassword = () => {
        let password = this.state.password;
        let passwordHash = "";
        let bcrypt = require("bcryptjs");

        let salt = bcrypt.genSaltSync(12);
        passwordHash = bcrypt.hashSync(password, salt);

        return passwordHash;
    }

    //Send the new user to the server
    register = () => {

        //First check if passwords match and there are no empty fields
        let passwordMatch = this.checkPassword();
        let emptyFields = this.checkIfEmtpyFields();

        //If so, proceed with the registration
        if(passwordMatch === true && emptyFields === false) {

            let passwordHash = this.hashPassword();

            const user = {username: (this.state.username).trim(), password: passwordHash, fullName: (this.state.fullName).trim(), email: (this.state.email).trim(), role: "user", loadLogin: false};

            fetch(SERVER_URL + "api/users", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })
            .then(res => {
                //Based on different response status, set the dialog message
                //Success
                if (res.status === 201) {
                   this.setState({openDialog: true, dialogText: "Registration successful!", succeeded: true});                    
                }
                //Conflict of PK username
                else if (res.status === 409) {
                    this.setState({openDialog: true, dialogText: "This username already exists."});
                }
                //Failure
                else {
                    this.setState({openDialog: true, dialogText: "Registration failed, try again"});
                }
    
            })
            .catch(err => console.error(err))

        }
        //If passwords don't match, prompt user to try again
        else if (passwordMatch === false){
            this.setState({openDialog: true, dialogText: "Passwords don't match, try again."});
        }
        //If any fields are empty, prompt user to try again
        else if(emptyFields === true) {
            this.setState({openDialog: true, dialogText: "None of the fields can be empty, try again."});
        }

    }

    //Handling dialog close, if registration succeeded, go to Login
    handleClose = () => {
        this.setState({openDialog: false});
        if (this.state.succeeded === true) {
            this.setState({loadLogin: true});
        }
    }

    //If 'Go to Login' button is clicked, load Login
    goToLoginBtn = () => {
        this.setState({loadLogin: true});
    }

    render() {

        if (this.state.loadLogin === true) {
            return <Login />;
        }
        else {
            return (
                <div>
                    {/* Dialog with the message if the registration was successful or not */}
                    <Dialog open={this.state.openDialog} onClose={this.handleClose}>
                        <DialogTitle id="title">{this.state.dialogText}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                    
                    <div className="login-header">
                        <Typography variant="h5">Create an account</Typography>
                    </div>
                
                    <div className="form">
                        <TextField required 
                                name="username" label="Username" 
                                variant="outlined" onChange={this.handleChange} value={this.state.username} />
                    </div>
                    
                    <div className="form">
                        <TextField required 
                                type="password" name="password" 
                                label="Password" variant="outlined" 
                                onChange={this.handleChange} value={this.state.password} />
                    </div>
                    
                    <div className="form">
                        <TextField required 
                                type="password" name="passwordCheck" 
                                label="Confirm password" variant="outlined" 
                                onChange={this.handleChange} value={this.state.passwordCheck} />
                    </div>
                    
                    <div className="form">
                        <TextField required 
                                name="fullName" label="Full Name" 
                                variant="outlined" onChange={this.handleChange} value={this.state.fullName} />
                    </div>
                    
                    <div className="form">
                        <TextField required 
                                type="email" name="email" 
                                label="Email" variant="outlined" 
                                onChange={this.handleChange} value={this.state.email} />
                    </div>
                    
                    <div className="form">
                    <Button variant="contained" color="primary" size="large" onClick={this.register}>Register</Button>
                    </div>

                    <div className="form">
                    <Button variant="outlined" color="primary" size="small" onClick={this.goToLoginBtn}>Go to Login</Button>
                    </div>
                </div>
            )
        }
    }   
    
}

export default Register;