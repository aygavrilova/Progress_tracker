
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Logout from "./views/Logout";
import Header from "./views/Header/Header";
import HomePage from "./views/HomePage/HomePage";
import UserPage from "./UserPage";
import People from "./People";
import Goals from "./views/Goals";
import Footer from "./Footer";
import CreatePage from "./views/Create";
import Profile from "./views/Profile";
// import SignUp from "./Header/SignUp";
// import LogIn from "./Header/LogIn";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/user" element={<UserPage />} />
        <Route exact path="/logout" element={<Logout/>}/>
        <Route exact path="/people" element={<People />} />
        <Route exact path="/goals" element={<Goals />} />
        <Route exact path="/create" element={<CreatePage />} />
        <Route exact path="/newgoal" element={<CreatePage />} />
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/goal/:id" element={<p>view goal</p>} />
        <Route exact path="/goal/:id/edit" element={<p>edit goal</p>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;



