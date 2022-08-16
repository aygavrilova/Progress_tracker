import { useState } from "react";
import Step from "./Step";
import styled from "styled-components";

const Steps = ({steps, addNewStep, removeLastStep}) => {

    return <>
        <Text>Action Plan</Text>

        <ActionPlan>

            {
                steps.map((item, index) => {
                    return <>
                        <ActionWrapper>
                            <Count>{index + 1}</Count>
                            <Step name={item.name}
                                key={item.id}>
                            </Step>
                        </ActionWrapper>
                    </>
                })
            }

            <AddBtn onClick={() => addNewStep()} type="button">Add</AddBtn>
            <DelBtn onClick={() => removeLastStep()} type="button">Remove</DelBtn>

        </ActionPlan></>
}

export default Steps;

const Text = styled.h2`
font-size: 20px;
color: #1A1A40;
margin: 20px 30px 10px 30px;
`

const ActionWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: baseline;
width: 100%;
height: 50px;
`

const Count = styled.p`
margin: 0px 10px 0px 30px;
font-size: 15px;
font-weight: bold;
color: #1A1A40;
`

const ActionPlan = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  /* width: 60vw; */
  background-color: white;
  border-radius: 25px;
`
const AddBtn = styled.button``
const DelBtn = styled.button``
