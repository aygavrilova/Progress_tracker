import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Goals from "./Goals";
import People from "./People";
import HomePage from "./HomePage/HomePage";




const Footer = () => {
    return (

        <Wrapper>
            <Wrapper1>
                <HomePageLink to={"/goals"}>Home Page</HomePageLink>
                <GoalsLink to={"/goals"}>Goals</GoalsLink>
                <PeopleLink to={"/people"}>People</PeopleLink>
            </Wrapper1>
        </Wrapper>

    )
}

export default Footer;


const Wrapper = styled.div`
    /* display: block; */
    display: flex;
    bottom: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    background-color: violet;
    `

const Wrapper1 = styled.div`
display: flex;
flex-direction: column;
font-size: 8px;
/* margin: 0px; */
`
const GoalsLink = styled(Link)`
 /* display: flex;
  justify-content: center; */
  color: darkblue;
  font-size: 16px;
  /* line-height: 30px; */
  text-decoration: none;
  cursor: pointer;
  margin: 5px;
`
const PeopleLink = styled(Link)`
  color: darkblue;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  margin: 5px;
`
const HomePageLink = styled(Link)`
 color: darkblue;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  margin: 5px;
`