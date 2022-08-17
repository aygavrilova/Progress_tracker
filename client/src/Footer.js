import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Goals from "./views/Goals";
import People from "./People";
import HomePage from "./views/HomePage/HomePage";

import { useAuth0 } from "@auth0/auth0-react";


const Footer = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
    } = useAuth0();
    return (
        <Wrapper>
            <Wrapper1>
                <StyledLink to={"/"}>Home Page</StyledLink>
                {
                    !isAuthenticated && !isLoading && (<StyledLink to="/goals">Goals</StyledLink>)
                }
                <StyledLink to={"/people"}>People</StyledLink>
            </Wrapper1>
        </Wrapper>

    )
}

export default Footer;


const Wrapper = styled.div`
    display: flex;
    bottom: 0;
    height: 100px;
    width: 100%;
    background-color: #9E7777;
    `




const Wrapper1 = styled.div`
display: flex;
flex-direction: column;
font-size: 8px;
`
const StyledLink = styled(Link)`
color: white;
font-family: 'Caveat', cursive;
font-size: 16px;
text-decoration: none;
cursor: pointer;
margin: 10px 0px 5px 15px;
:hover {
    color: #EDCDBB;
    font-size: 18px;
}
:focus {
    color: #6F4C5B;
} 
`


