import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomePage from "../views/HomePage/HomePage";
import People from "../People";
import Goals from "../views/HomePage/Goals";
import { useAuth0 } from "@auth0/auth0-react";
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


    return <HeaderWrapper>
        {/* <TheName>The Name</TheName> */}
        <NavBar>
            <StyledLink to="/">Home Page</StyledLink>
            <StyledLink to="/goals">Goals</StyledLink>
            <StyledLink to="/people">People</StyledLink>
            <Wrapper>
                {/* <StyledLink to="/signup">Sign Up</StyledLink> */}

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
cursor: pointer;
}

`

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
background-color: #4D4C7D;
`
const StyledLink = styled(Link)`
display: flex;
flex-direction: row;
text-decoration: none;
margin: 15px 10px 15px 15px;
color: white;
`
