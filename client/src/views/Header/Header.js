import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Header = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const [dropdown, setDropdown] = useState(false);
    const [isVisible, setIsVisible] = useState(true);


    return <HeaderWrapper>
        <NavBar>
            {isAuthenticated && (<Container>
                <Button1 style={{ display: isVisible ? "block" : " " }} onClick={() => setDropdown(!dropdown)}>
                    <UserImg src={user.picture} width="40"></UserImg>
                </Button1>
                {
                    dropdown ? (
                        <Dropdown onMouseLeave={() => setDropdown(false)}  >
                            <Ul  >
                                <List><Styled href="/create">New Goal</Styled></List>
                                <List><Styled href="#">My friends</Styled></List>
                                <List><Styled href="/mygoals">My Goals</Styled></List>
                                <List><Styled href="/profile">My Account</Styled></List>
                                <List><Styled href="/logout">Log out</Styled></List>
                            </Ul>
                        </Dropdown>
                    ) : ""
                }
            </Container>)}

            <StyledLink href="/">Home Page</StyledLink>
            {
                !isAuthenticated && !isLoading && (<StyledLink href="/goals">Goals</StyledLink>)
            }

            <StyledLink href="/people">People</StyledLink>

            <Wrapper>
                {!isLoading && !isAuthenticated && (
                    <Button
                        id="qsLoginBtn"
                        color="primary"
                        onClick={() => loginWithRedirect()}
                    >
                        Log in
                    </Button>)
                }

            </Wrapper>

        </NavBar>
    </HeaderWrapper>

}

export default Header;

const Button = styled.button`
border: none;
background-color: #9E7777;
font-family: 'Caveat', cursive;
font-size: 18px;
color: white;
margin-right: 10px;
:hover {
    color: #F5E8C7;
    font-size: 20px;
    cursor: pointer;
}
:focus {
    color: #DEBA9D;
} 
`

const HeaderWrapper = styled.header`
display: flex;
`

const Container = styled.div`
position: relative;
display: inline-block;
justify-content: baseline;
`

const Dropdown = styled.div`
position: absolute;
top: 100%;
left: 0;
width: max-content;
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
:hover {
cursor: pointer;
background-color: #FFEDDB;
}
`


const Button1 = styled.button`
border: none;
background-color: #9E7777;
font-size: 15px;
color: white;
margin: 10px;
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
height: 60px;
width: 100%;
background-color: #9E7777;
`
const StyledLink = styled.a`
display: flex;
flex-direction: row;
text-decoration: none;
font-family: 'Caveat', cursive;
font-size: 18px;
margin: 15px 10px 15px 15px;
color: white;
:hover {
    color: #EDCDBB;
    font-size: 20px;
}
:focus {
    color: #6F4C5B;
} 
`
const Styled = styled.a`
text-decoration: none;
color: #1A1A40;
font-size: 18px;
padding: 5px;
color: #6F4C5B;
:hover {
    font-size: 20px;
    color: #6F4C5B;
}
`

const UserImg = styled.img`
border-radius: 8px;

`
