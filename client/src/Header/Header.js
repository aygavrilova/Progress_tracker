import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import People from "../People";
import Goals from "../Goals";

const Header = () => {
    return <HeaderWrapper>
        {/* <TheName>The Name</TheName> */}
        <NavBar>
            <StyledLink to="/goals">Goals</StyledLink>
            <StyledLink to="/people">People</StyledLink>
            <StyledLink to="/">Home Page</StyledLink>
            <Wrapper>
                <StyledLink to="/signup">Sign Up</StyledLink>
                <StyledLink to="/login">Log In</StyledLink>
            </Wrapper>
        </NavBar>
    </HeaderWrapper>
   
}

export default Header;

const HeaderWrapper = styled.header`
display: flex;
`
const Wrapper = styled.div`
display: flex;
justify-content: flex-end;
margin-right: 5px;
`

const NavBar = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
height: 50px;
width: 100%;
background-color: violet;
`
const StyledLink = styled(Link)`
display: flex;
flex-direction: row;
text-decoration: none;
margin: 15px 10px 15px 15px;
color: darkblue;
`
