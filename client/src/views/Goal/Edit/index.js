import styled from "styled-components";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { getConfig } from "../../../config";
import { createGoal, updateGoal } from "../../../api/GoalApi"
import { useAuth0, User } from "@auth0/auth0-react";
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { getGoal } from '../../../api/GoalApi'
import { v4 as uuidv4 } from 'uuid';
import Step from "./Step.js"
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";

const config = getConfig();
const createEmptyStep = () => {
    return {
        id: uuidv4(),
        name: "",
        description: "",
        finished: false
    }
}

const EditGoalPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [goal, setGoal] = useState({})
    const [steps, setSteps] = useState([createEmptyStep()])
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [toolbarHidden, setToolbarHidden] = useState(true)
    const [contentState, setContentState] = useState("")
    const [name, setName] = useState("")
    const [accompCriteria, setAccompCriteria] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate();
    const {
        getAccessTokenSilently,
    } = useAuth0();


    useEffect(() => {
        setIsLoading(true)
        fetchGoal(id);
        setIsLoading(false)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        setGoalProperties(goal)
        setIsLoading(false)
    }, [goal])

    const fetchGoal = async (id) => {
        const goal = await getGoal(id);
        setGoal(goal)
    }

    const setGoalProperties = () => {
        if (!goal) {
            return;
        }
        if (goal.description !== undefined) {
            const descObj = JSON.parse(goal.description);
            setContentState(descObj)
        }

        setName(goal.name ? goal.name : "")
        setAccompCriteria(goal.accompCriteria ? goal.accompCriteria : "");
        setSteps(goal.steps ? goal.steps : [])
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        goal.name = name
        goal.accompCriteria = accompCriteria
        goal.description = JSON.stringify(description)
        goal.steps = steps;

        const accessToken = await getAccessTokenSilently({
            audience: `https://${config.domain}/api/v2/`,
            scope: "openid",
        });

        const goalId = await updateGoal(accessToken, goal);
        navigate(`/goal/${goalId}`)
    }

    const addNewStep = () => {
        setSteps(steps.concat([createEmptyStep()]))
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    const onContentStateChange = (contentState) => {
        setDescription(contentState)
    }

    const deleteStep = (id) => {
        setSteps(steps => steps.filter(step => step.id !== id))
    }

    const setStepName = (id, name) => {
        setSteps((currentStep) => currentStep.map(x => x.id === id ? {
            ...x,
            name: name
        } : x))
    }

    const setStepDesc = (id, desc) => {
        setSteps((currentStep) => currentStep.map(x => x.id === id ? {
            ...x,
            description: JSON.stringify(desc)
        } : x))
    }

    return (
        <Wrapper>
            
            <Card onSubmit={onSubmitHandler}>
            <GreyLine>
            <Titel>
                Edit the Goal
            </Titel>
            </GreyLine>
                <Text>Outline your goal</Text>
                <Input type="text"
                    id="name"
                    placeholder="  For Example, to run a marathon"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <Text>Goal Accomplishment Criteria</Text>
                <Input type="text"
                    id="doneCriteria"
                    placeholder="  For Example, the marathon must be finished no matter the time"
                    value={accompCriteria}
                    onChange={(e) => setAccompCriteria(e.target.value)} />
                <Text>Description</Text>
                <EditorWrapper>
                    <Editor
                        editorState={editorState}
                        toolbarHidden={toolbarHidden}
                        contentState={contentState}
                        onFocus={() => setToolbarHidden(false)}
                        onBlur={() => setToolbarHidden(true)}
                        onEditorStateChange={onEditorStateChange}
                        onContentStateChange={onContentStateChange}
                    />
                </EditorWrapper>

                <Text>Action Plan</Text>
                <ActionPlan>
                    {
                        isLoading ? (<LoadingSpinner></LoadingSpinner>) : (steps.map((item, index) => {
                            return (
                                <ActionWrapper key={index}>
                                    <Count>{index + 1}</Count>
                                    <Step step={item} setStepName={setStepName} setStepDesc={setStepDesc} key={item.id} />
                                    <DeleteBtn onClick={() => deleteStep(item.id)}>Delete</DeleteBtn>
                                </ActionWrapper>)
                        }))
                    }
                    <AddBtn onClick={() => addNewStep()} type="button">Add</AddBtn>
                </ActionPlan>


                <GreyLine2>
                    <Btn type="submit">Submit</Btn>
                </GreyLine2>

            </Card>
        </Wrapper>
    );
}

export default EditGoalPage;

const Wrapper = styled.div`
position: relative;
  display: flex;
  background: url("/images/watercolor-background.jpg");
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  `

const ActionPlan = styled.div`
display: flex;
  flex-direction: column;
  width: 60vw;
`

const ActionWrapper = styled.div`
display: flex;
flex-direction: row;
margin: 0px 10px 30px 30px;
`

const Count = styled.p`
margin: 0px 10px 0px 0px;
font-size: 15px;
font-weight: bold;
color: #1A1A40;
`

const AddBtn = styled.button`
background-color: #B4A5A5;
 font-family: 'Caveat', cursive;
  font-size: 15px;
  color: white;
  height: 30px;
  width: 80px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 0px 30px 0px 45px;
  :hover {
    border: 2px solid #6F4C5B;
  }
  :focus {
    background-color: #9E7777;
  }
  `


const Card = styled.form`
   display: flex;
  flex-direction: column;
  height: auto;
  width: 60vw;
  background-color: #FFFBE9;
  border-radius: 25px;
  margin-top: 50px;
  margin-bottom: 15px;
  box-shadow: 5px 20px 24px 15px rgba(160,188,194,0.42);
  `


const GreyLine = styled.div`
   display: flex;
  justify-content: center;
  background-color: #DEBA9D;
  height: 60px;
  width: auto;
  border-radius: 25px 25px 0px 0px ;
  padding-bottom: 10px;
 `
const GreyLine2 = styled.div`
display: flex;
  justify-content: center;
  background-color: #DEBA9D;
  height: 60px;
  width: auto;
  border-radius:  0px 0px 25px 25px;
  padding-bottom: 10px;
 `

const Titel = styled.h1`
   display: flex;
  color: #1A1A40;
  font-family: 'Caveat', cursive;
  font-size: 30px;
  padding: 0px;
  `

const Btn = styled.button`
 background-color: #B4A5A5;
  font-family: 'Caveat', cursive;
  font-size: 15px;
  color: white;
  height: 30px;
  width: 80px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 15px 15px 15px 0px;
  :hover {
    border: 2px solid #6F4C5B;
  }
  :focus {
    background-color: #9E7777;
  }
  `

const DeleteBtn = styled.button`
   background-color: #B4A5A5;
  font-family: 'Caveat', cursive;
  font-size: 15px;
  color: white;
  height: 30px;
  width: 80px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 0px 30px 0px 10px;
  :hover {
    border: 2px solid #6F4C5B;
  }
  :focus {
    background-color: #9E7777;
  }
  `


const Input = styled.input`
background-color: #EEEEEE;
text-align: left;
border: 1px solid #1A1A40;
border-radius: 5px;
font-family: 'Caveat', cursive;
font-size: 20px;
margin: 0px 30px 10px 30px;
:hover {
    border: 2px solid #6F4C5B;
}
:focus {
    border: 2px solid #9E7777;
}
`

const Text = styled.h2`
font-family: 'Caveat', cursive;
font-size: 25px;
color: #1A1A40;
margin: 20px 30px 10px 30px;
`
const EditorWrapper = styled.div`
background-color: #EEEEEE;
border: 1px solid #1A1A40;
border-radius: 5px;
margin: 0px 30px 10px 30px;
:hover {
    border: 2px solid #6F4C5B;
}
:focus {
    border: 2px solid #9E7777;
}
`
