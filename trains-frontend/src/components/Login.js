import React, { useState } from "react";
import {SERVER_URL} from "../constants";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import Menu from "./Menu";
import Register from "./Register";

//Login page
const Login = () => {

    const [user, setUser] = useState({username: "", password: ""});
    const [isAuthenticated, setAuth] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    const [isRegistering, setRegistration] = useState(false);

    //Save values from login fields
    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    //Login the user and save the received token
    const login = () => {
        fetch(SERVER_URL + "login", {
            method: "POST",
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get("Authorization");
            if(jwtToken !== null) {
                sessionStorage.setItem("jwtToken", jwtToken);
                sessionStorage.setItem("username", user.username);
                setAuth(true);
            }
            else {
                setFailedLogin(true);
            }
        })
        .catch(err => console.error(err))
    }

    //When Register button is clicked, go to registration
    const register = () => {
        setRegistration(true);
    }

    //Render different components
    //If login is successfull, go to '/' path with TrainList and Menu
    if (isAuthenticated === true) {
        return (<Menu />);
    }
    else if(isRegistering === true) {
        return <Register />;
    }
    else {
        //Alert div for unsuccessful login
        let alert;
        if (failedLogin) {
            alert = <div className="alert"><Alert severity="error"><AlertTitle>Invalid username or password.</AlertTitle></Alert></div>;
        }
        return (
            <div>
                <div className="login-header">
                    <Typography variant="h4">Welcome!</Typography>
                </div>
                
                {alert}
                
                <div className="form">
                    <TextField name="username" label="Username" variant="outlined" className="login-form" onChange={handleChange} />
                </div>
                
                <div className="form"> 
                    <TextField type="password" name="password" label="Password" variant="outlined" className="login-form" onChange={handleChange} />
                </div>
                
                <div className="form">
                    <Button variant="contained" color="primary" size="large" onClick={login}>Login</Button>
                </div>
                
                <div className="form">
                    <Button variant="outlined" color="primary" size="small" onClick={register}>Register</Button>
                </div>
            </div>
        );
    }
}

export default Login;