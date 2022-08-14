import React from "react";
import styled from "styled-components";


const NewGoal = () => {
    return (
        <Wrapper>
            <Titel>
                Setting a Goal
            </Titel>
            {/* <Blue></Blue> */}
            <Card>
                <GreyLine>
                    <Buttons>
                        <GoalBtn>Goal</GoalBtn>
                    </Buttons>
                    <ResetBtn>Reset</ResetBtn>
                </GreyLine>
                <Text>Outline your goal</Text>
                <Input type="text"  placeholder="  For Example, to run a marathon"/>
                <Text>Goal Accomplishment Criteria</Text>
                <Input type="text"  placeholder="  For Example, the marathon must be finished no matter the time"/>                
                <Text>Description</Text>
                <Input type="text"  placeholder="  "/>                

            </Card>

        </Wrapper>

    );
};

export default NewGoal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
/* justify-content: center; */
/* align-items: center; */
height: calc(100vh - 160px);
background-color: #EEEEEE;

  `
const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 60vw;
  background-color: white;
  border-radius: 25px;
  
  `

const GreyLine = styled.div`
display: flex;
  justify-content: space-between;
  background-color: #B2B1B9;
  height: 60px;
  width: auto;
  border-radius: 25px 25px 0px 0px ;


  /* z-index: 2; */
  `

//   const Blue = styled.div`
//   display: flex;
//   height: 60vh;
//   width: 80vw;
//   z-index: -5;
//   background-color: #51C4D3;
//   `

const Titel = styled.h1`
  display: flex;
  color: #1A1A40;
  font-size: 30px;
  padding: 0px;
  `

const Buttons = styled.div`
  margin-left: 30px;
  display: flex;
  margin-top: 15px;
  border-radius: 10px;
  `

const GoalBtn = styled.button`
  background-color: #B4A5A5;
  font-size: 10px;
  color: white;
  height: 30px;
  width: 80px;
  border: 1px solid gray;
  border-radius: 5px 5px 5px 5px;
  :focus {
    background-color: #51C4D3;
  }
  `

  const ResetBtn = styled.button`
  color: white;
  background-color: #B4A5A5;
  font-size: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  height: 30px;
  width: 50px;
  margin-top: 15px;
margin-right: 30px;
:focus {
    background-color: #51C4D3;
  }
  `

  const Input = styled.input`
  background-color: #EEEEEE;
text-align: left;
border: 1px solid #1A1A40;
border-radius: 5px;
font-size: 20px;
height: 50px;
margin: 0px 30px 10px 30px;
:hover {
    border: 2px solid #51C4D3;
}
:focus {
    border: 2px solid #1A1A40;
}
`

const Text = styled.h2`
font-size: 20px;
color: #1A1A40;
margin: 20px 30px 10px 30px;

`