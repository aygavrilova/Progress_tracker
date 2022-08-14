import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomePage from "../views/HomePage/HomePage";
import People from "../People";
import Goals from "../views/HomePage/Goals";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

// import React, { Component } from 'react';

const Header = () => {
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin,
        });

    const [dropdown, setDropdown] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const onDropDownBlur =()=>{
        setDropdown(false)
    }


    return <HeaderWrapper>
        <NavBar>
            <Container>
                <Button1 style={{ display: isVisible ? "block" : " " }} onClick={()=>setDropdown(!dropdown)}>
                    Anna 
                </Button1>
                {
                    
                    dropdown ? (
                        <Dropdown onMouseLeave={()=>setDropdown(false)}  >
                        <Ul  >
                            <List>New Goal</List>
                            <List>My friends</List>
                            <List>My Goals</List>
                            <List>My Account</List>
                            <List>Log Out</List>
                        </Ul>
                    </Dropdown>
                    ) : ""
                }
            </Container>
            <StyledLink to="/">Home Page</StyledLink>
            <StyledLink to="/goals">Goals</StyledLink>
            <StyledLink to="/people">People</StyledLink>

            <Wrapper>
                {!isAuthenticated && (
                    <Button
                        id="qsLoginBtn"
                        color="primary"
                        onClick={() => loginWithRedirect()}
                    >
                        Log in
                    </Button>)
                }
                {isAuthenticated && (
                    <Button
                        id="qsLoginBtn"
                        // color="primary"
                        onClick={() => logoutWithRedirect()}
                    >
                        Log out
                    </Button>)
                }
            </Wrapper>

        </NavBar>
    </HeaderWrapper>

}

export default Header;

const Button = styled.button`
border: none;
background-color: #4D4C7D;
color: white;
:hover {
    color: #51C4D3;
    font-size: 18px;
    cursor: pointer;
}
:focus {
    color: #51C4D3;
} 
`

const HeaderWrapper = styled.header`
display: flex;
`

const Container = styled.div`
position: relative;
display: inline-block;
`

const Dropdown = styled.div`
position: absolute;
top: 100%;
left: 0;
width: 300px;
z-index: 5;
border: 1px solid rgba(0, 0, 0, 0.04);
box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`

const Ul = styled.ul`
width: max-content;
background-color: white;
list-style: none;
padding: 0;
margin: 0;
`

const List = styled.li`
font-size: 15px;
padding: 8px 12px;
background-color: white;
:hover {
cursor: pointer;
color: white;
background-color: #51C4D3;
}
`


const Button1 = styled.button`
border: none;
background-color: #4D4C7D;
color: white;
margin-top: 17px;
:hover {
    color: #51C4D3;
    font-size: 18px;
    cursor: pointer;
}
:focus {
    color: #51C4D3;
} 
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
background-color: #4D4C7D;
`
const StyledLink = styled.li`
display: flex;
flex-direction: row;
text-decoration: none;
margin: 15px 10px 15px 15px;
color: white;
:hover {
    color: #51C4D3;
    font-size: 18px;
}
:focus {
    color: #51C4D3;
} 
`
