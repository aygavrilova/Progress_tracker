import styled from "styled-components";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { getConfig } from "../../../config";
import { createGoal } from "../../../api/GoalApi"
import { useAuth0, User } from "@auth0/auth0-react";
import { Editor } from 'react-draft-wysiwyg';
import { v4 as uuidv4 } from 'uuid';
import Step from "./Step.js"


const config = getConfig();
const createEmptyStep = () => {
  return {
    id: uuidv4(),
    name: "",
    description: ""
  }
}

const CreatePage = () => {
  const [steps, setSteps] = useState([createEmptyStep()])
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [toolbarHidden, setToolbarHidden] = useState(true)

  const [name, setName] = useState("")
  const [accompCriteria, setAccompCriteria] = useState("")
  const [description, setDescription] = useState("")

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("submit")
    const newGoal = {
      name: name,
      accompCriteria: accompCriteria,
      description: JSON.stringify(description)
    }
    const accessToken = await getAccessTokenSilently({
      audience: `https://${config.domain}/api/v2/`,
      scope: "openid",
    });

    const goal = await createGoal(accessToken, newGoal);
    console.log(goal)
  }

  const addNewStep = () => {
    setSteps(steps.concat([createEmptyStep()]))
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  const onContentStateChange = (contentState) => {
    console.log(contentState);
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
      <Titel>
        Setting a Goal
      </Titel>
      <Card onSubmit={onSubmitHandler}>
        <GreyLine>
          <Btn>Reset</Btn>
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
            onFocus={() => setToolbarHidden(false)}
            onBlur={() => setToolbarHidden(true)}
            onEditorStateChange={onEditorStateChange}
            onContentStateChange={onContentStateChange}
          />
        </EditorWrapper>

        <Text>Action Plan</Text>
        <ActionPlan>
          {
            steps.map((item, index) => {
              return (
              <ActionWrapper key={index}>
                <Count>{index + 1}</Count>
                <Step step={item} setStepName={setStepName} setStepDesc={setStepDesc} key={item.id} />
                <DeleteBtn onClick={() => deleteStep(item.id)}>Delete</DeleteBtn>
              </ActionWrapper>)
            })
          }
          <AddBtn onClick={() => addNewStep()} type="button">Add</AddBtn>
        </ActionPlan>


<GreyLine2>
<Btn type="submit">Submit</Btn>
<Btn>Reset</Btn>
</GreyLine2>

      </Card>
    </Wrapper>
  );
}

export default CreatePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
background-color: #EEEEEE;
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
  font-size: 15px;
  color: white;
  height: 30px;
  width: 80px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 0px 30px 0px 45px;
  :hover {
    border: 2px solid #51C4D3;
  }
  :focus {
    background-color: #51C4D3;
  }`


const Card = styled.form`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 60vw;
  background-color: white;
  border-radius: 25px;
  `


const GreyLine = styled.div`
display: flex;
flex-direction: row;
  justify-content: flex-end;
  background-color: #B2B1B9;
  height: 60px;
  width: auto;
  border-radius: 25px 25px 0px 0px ;
 `
 const GreyLine2 = styled.div`
 display: flex;
flex-direction: row;
  justify-content: flex-end;
  background-color: #B2B1B9;
  height: 60px;
  width: auto;
  border-radius: 0px 0px 25px 25px;
  margin-top: 20px;
 `

const Titel = styled.h1`
  display: flex;
  color: #1A1A40;
  font-size: 30px;
  padding: 0px;
  `

const Btn = styled.button`
  background-color: #B4A5A5;
  font-size: 15px;
  color: white;
  height: 30px;
  width: 80px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 15px 30px 15px 0px;
  :hover {
    border: 2px solid #51C4D3;
  }
  :focus {
    background-color: #51C4D3;
  }
  `

const DeleteBtn = styled.button`
  background-color: #B4A5A5;
  font-size: 15px;
  color: white;
  height: 30px;
  width: 80px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 0px 30px 0px 10px;
  :hover {
    border: 2px solid #51C4D3;
  }
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
const EditorWrapper = styled.div`
background-color: #EEEEEE;
border: 1px solid #1A1A40;
border-radius: 5px;
margin: 0px 30px 10px 30px;
:hover {
    border: 2px solid #51C4D3;
}
:focus {
    border: 2px solid #1A1A40;
}
`
