import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Goals from "./views/Goals";
import People from "./People";
import HomePage from "./views/HomePage/HomePage";




const Footer = () => {
    return (
        <Wrapper>
            <Wrapper1>
                <StyledLink to={"/"}>Home Page</StyledLink>
                <StyledLink to={"/goals"}>Goals</StyledLink>
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
    background-color: #4D4C7D;
    `




const Wrapper1 = styled.div`
display: flex;
flex-direction: column;
font-size: 8px;
`
const StyledLink = styled(Link)`
color: white;
font-size: 16px;
text-decoration: none;
cursor: pointer;
margin: 5px 0px 5px 15px;
:hover {
    color: #51C4D3;
    font-size: 18px;
}
:focus {
    color: #51C4D3;
} 
`


