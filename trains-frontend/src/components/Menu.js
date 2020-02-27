import React, { useState } from "react";
import "../App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TrainList from "./TrainList";
import UserDetails from "./UserDetails";
import Login from "./Login";

//Menu after the user is logged in, links to TrainList and UserDetails and logout button
const Menu = () => {

    const [isLoggedIn, setLoginState] = useState(true);

    const logout = () => {
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("usernmame");
        setLoginState(false);
    }

    if (isLoggedIn === false) {
        return <Login />;
    }
    else {
    return (
        <div>       
            <BrowserRouter>
                <div>
                    <ButtonGroup variant="contained" color="primary" size="medium">
                        <Button><Link className="link" to="/">Train List</Link></Button>
                        <Button><Link className="link" to="/user">User details</Link></Button>
                    </ButtonGroup>
                    <Switch>
                        <Route exact path="/" component={TrainList} />
                        <Route path="/user" component={UserDetails} />
                    </Switch>
                </div>
            </BrowserRouter>
            
            <div className="logout-btn">
                <Button variant="outlined" color="secondary" size="medium" onClick={logout}>Logout</Button>
            </div>
        </div>
    )}
}

export default Menu;