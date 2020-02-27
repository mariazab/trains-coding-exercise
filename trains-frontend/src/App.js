import React from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <div className="main-header">
          <Typography variant="h3">Location of trains</Typography>
        </div>
      <Login />
    </div>
  );
}

export default App;