import React from "react";
import Footer from "../../Footer";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import image from "./watch.jpg";


const HomePage = () => {
    return (
        <Wrapper>
            <Wrapper1>
                <Text>
                    Remember all things are possible for those have a goal!
                </Text>
                <SignUpLink to={"/signup"}>Join</SignUpLink>
            </Wrapper1>
        </Wrapper>


    );
};

export default HomePage;


const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh);
background-image: url("images/galaxy-3608029_1280.jpeg");
background-position: center;
background-size: cover;

`

const Wrapper1 = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 50vw;
`

const Text = styled.p`
display: flex;
text-align: center;
color: white;
font-size: 60px;
`

const SignUpLink = styled(Link)`
display: flex;
height: auto;
color: white;
background-color: #4D4C7D;
font-size: 40px;
padding: 15px 30px 15px 30px;
text-align: center;
align-content: center;
border-radius: 8px;
border: 1px solid darkgrey;
text-decoration: none;
:hover {
    border-radius: 50px;
}
:focus {
    border: 5px solid white;
    color: white;
}
`