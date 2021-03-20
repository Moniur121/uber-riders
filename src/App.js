import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './component/Home/Home';
import React, { createContext, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './component/Header/Header';
import LogIn from './component/LogIn/LogIn';
import Destination from './component/Destination/Destination';
import Blog from './component/Blog/Blog';
import Contact from './component/Contact/Contact';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
 
import SearchingPage from './component/SearchingPage/SearchingPage';

export const UserContext = createContext();
function App() {
  
  const[loggedInUser,setLoggedInUser]= useState({});
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/destination/:name">
              <Destination></Destination>
            </PrivateRoute>
            <PrivateRoute path="/blog">
              <Blog></Blog>
            </PrivateRoute>
             
            <Route path="/searchingPage">
              <SearchingPage></SearchingPage>
            </Route>
            <Route path="/contact">
              <Contact></Contact>
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Router>

      </UserContext.Provider>
    </div>
  );
}

export default App;
