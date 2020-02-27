import React from "react"; 
import ReactDOM from "react-dom";
import renderer from "react-test-renderer"; 
import App from "./App";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Register from "./components/Register";
import TrainList from "./components/TrainList";
import UserDetails from "./components/UserDetails";

it("renders without crashing", () => {  
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Menu renders correctly", () => {
  const tree = renderer.create(<Menu/>).toJSON;
  expect(tree).toMatchSnapshot();
});

it("Login renders correctly", () => {
  const tree = renderer.create(<Login/>).toJSON;
  expect(tree).toMatchSnapshot();
});

it("Register renders correctly", () => {
  const tree = renderer.create(<Register/>).toJSON;
  expect(tree).toMatchSnapshot();
});

it("TrainList renders correctly", () => {
  const tree = renderer.create(<TrainList/>).toJSON;
  expect(tree).toMatchSnapshot();
});

it("UserDetails renders correctly", () => {
  const tree = renderer.create(<UserDetails/>).toJSON;
  expect(tree).toMatchSnapshot();
});