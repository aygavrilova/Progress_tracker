
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Logout from "./views/Logout";
import Header from "./views/Header/Header";
import HomePage from "./views/HomePage/HomePage";
import People from "./People";
import Goals from "./views/Goals";
import Footer from "./Footer";
import CreatePage from "./views/Goal/Create";
import Profile from "./views/Profile";
import ViewGoal from "./views/Goal/View";
import EditGoalPage from "./views/Goal/Edit";
import MyGoalsView from "./views/MyGoals";
import AllGoalsView from "./views/Goals";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
// import SignUp from "./Header/SignUp";
// import LogIn from "./Header/LogIn";

const App = () => {
  return ( 
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/logout" element={<Logout/>}/>
        <Route exact path="/people" element={<People />} />
        <Route exact path="/goals" element={<AllGoalsView />} />
        <Route exact path="/mygoals" element={<MyGoalsView/>}/> 
        <Route exact path="/create" element={<CreatePage />} />
        <Route exact path="/newgoal" element={<CreatePage />} />
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/goal/:id" element={<ViewGoal></ViewGoal>} />
        <Route exact path="/goal/:id/edit" element={<EditGoalPage></EditGoalPage>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;



