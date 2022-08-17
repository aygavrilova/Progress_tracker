import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthHomePage from "./AuthHomePage";
import LoadingSpinner from "../../components/LoadingSpinner";



const HomePage = () => {
    const {
        isLoading,
        isAuthenticated,
    } = useAuth0();

    return <>

        {
            isLoading && (<LoadingSpinner></LoadingSpinner>)
        }

        {
            isAuthenticated && !isLoading && (
                <AuthHomePage></AuthHomePage>
            )
        }

        {!isAuthenticated && !isLoading && (
            <Wrapper>
                <Wrapper1>
                    <Text>
                        Remember all things are possible for those have a goal!
                    </Text>
                    <SignUpLink to={"/signup"}>Join</SignUpLink>
                </Wrapper1>
            </Wrapper>
        )
        }
    </>
};

export default HomePage;


const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 160px);
background: url("images/background.jpg");
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
color: #6F4C5B;
font-family: 'Caveat', cursive;
font-size: 60px;
`

const SignUpLink = styled(Link)`
display: flex;
height: auto;
font-family: 'Caveat', cursive;
color: #9E7777;
background-color: #EDCDBB;
font-size: 40px;
padding: 15px 30px 15px 30px;
margin-top: 20px;
text-align: center;
align-content: center;
border-radius: 25px;
border: 1px solid darkgrey;
text-decoration: none;
:hover {
    border-radius: 50px;
    background-color: #9E7777;
    color: white;
}
:focus {
    border: 5px solid white;
    color: white;
}
`
