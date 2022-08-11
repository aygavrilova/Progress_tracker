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
            {/* <Wrapper> */}
                {/* <StyledLink to="/userpage">Anna</StyledLink> */}
            {/* </Wrapper> */}
            <Wrapper>
                {/* <StyledLink to="/signup">Sign Up</StyledLink> */}
                <Container>
                <Button1>Anna</Button1>
                {/* <StyledLink to="/signup">Sign Up</StyledLink> */}

                    <Dropdown>
                        <Ul>
                            <List>New Goal</List>
                            <List>My friends</List>
                            <List>My Goals</List>
                            <List>My Account</List>
                            <List>Log Out</List>
                        </Ul>
                    </Dropdown>
                </Container>




                {/* 
                <div className="container">
  <button type="button" class="button">
    ☰
  </button>
  <div class="dropdown">
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
      <li>Option 4</li>
    </ul>
  </div>
</div> */}



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
/* display: flex;
align-content: center; */
/* padding:10px; */
/* margin: 5px 0px 5px 0px; */
/* border: 2px solid white;
/* border-radius: 25px; */
/* :focus {
    color: #51C4D3;
}  */
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

const Ul = styled.div`
background-color: white;
list-style: none;
padding: 0;
margin: 0;
`

const List = styled.li`
padding: 8px 12px;
:hover {
background-color: white;
font-size: 20px;
cursor: pointer;
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

// .dropdown {
//     position: absolute;
//     top: 100%;
//     left: 0;
//     width: 300px;
//     z-index: 2;
//     border: 1px solid rgba(0, 0, 0, 0.04);
//     box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
//   }
  
//   ul {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//   }
//   li {
//     padding: 8px 12px;
//   }
  
//   li:hover {
//     background-color: rgba(0, 0, 0, 0.14);
//     cursor: pointer;
//   }

// .container {
//     position: relative;
//     display: inline-block;
//   }
//   .button {
//     padding: 0;
//     width: 50px;
//     border: 0;
//     background-color: #fff;
//     color: #333;
//     cursor: pointer;
//     outline: 0;
//     font-size: 40px;
//   }


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
:hover {
    color: #51C4D3;
    font-size: 18px;
}
:focus {
    color: #51C4D3;
} 
`
