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
import {AddRecipe} from "./pages/AddRecipe/AddRecipe";
import {UserRecipes} from "./pages/UserRecipes/UserRecipes";
import {AdminCategories} from "./pages/AdminCategories/AdminCategories";
import {UserCategories} from "./pages/UserCategories/UserCategories";
import {EditCategory} from "./pages/EditCategories/EditCategories";
import {AddCategory} from "./pages/AddCategory/AddCategory";
import {Users} from "./pages/Users/Users";
import {UserUsers} from "./pages/UserUsers/UserUsers";

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
            <Route path="/admin/recipes/add" component={AddRecipe} />
            <Route path="/admin/categories" component={AdminCategories} exact/>
            <Route path="/admin/categories/edit/:id" component={EditCategory} />
            <Route path="/admin/categories/add" component={AddCategory} />
            <Route path="/admin/users" component={Users} />
            <Route path="/user/recipes" component={UserRecipes} exact/>
            <Route path="/user/categories" component={UserCategories} exact/>
            <Route path="/user/users" component={UserUsers} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
