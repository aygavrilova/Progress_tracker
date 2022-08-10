
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";
import HomePage from "./views/HomePage/HomePage";
import UserPage from "./UserPage";
import People from "./People";
import Goals from "./Goals";
import Footer from "./Footer";
import { Link } from "react-router-dom";
// import SignUp from "./Header/SignUp";
// import LogIn from "./Header/LogIn";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/user" element={<UserPage />} />
        <Route exact path="/people" element={<People />} />
        <Route exact path="/goals" element={<Goals />} />
        {/* <Route exact path="/user/signup" element={<SignUp />} /> */}
        {/* <Route exact path="/user/login" element={<LogIn />} /> */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;



