import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Login } from './pages/Login/Login'
import './App.css';
import {Admin} from "./pages/Admin/Admin";
import {User} from "./pages/User/User";
import {Recipes} from "./pages/Recipes/Recipes";
import {EditRecipe} from "./pages/EditRecipe/EditRecipe";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/admin" component={Admin} exact/>
            <Route path="/user" component={User} exact/>
            <Route path="/admin/recipes" component={Recipes} exact/>
            <Route path="/admin/recipes/edit/:id" component={EditRecipe} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
