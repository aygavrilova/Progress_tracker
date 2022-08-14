import styled from "styled-components";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { getConfig } from "../../config";
import { createGoal } from "../../api/GoalApi"
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
    console.log(accessToken);
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


  const removeLastStep = () => {
    setSteps(steps.slice(0, -1))
  }

  const deleteStep =(id)=>{
    setSteps(steps => steps.filter(step=> step.id !== id))
  }

  const setStepName = (id, name)=>{
    setSteps((currentStep)=>currentStep.map(x=>x.id === id?{
      ...x,
      name:name
    }:x))
  }

  const setStepDesc = (id, desc)=>{
    setSteps((currentStep)=>currentStep.map(x=>x.id === id?{
      ...x,
      description:JSON.stringify(desc)
    }:x))
  }

  return (
    <Wrapper>
      <Titel>
        Setting a Goal
      </Titel>
      <Card onSubmit={onSubmitHandler}>
        <GreyLine>
          <Btn>Goal</Btn>
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
              return <>
                <ActionWrapper>
                  <Count>{index + 1}</Count>
                  <Step step={item} setStepName={setStepName} setStepDesc={setStepDesc}
                    key={item.id}>
                  </Step>
                  <Btn onClick={()=>deleteStep(item.id)}>Delete</Btn>
                </ActionWrapper>
              </>
            })
          }

          <AddBtn onClick={() => addNewStep()} type="button">Add</AddBtn>

        </ActionPlan>


        <Submit type="submit"></Submit>

      </Card>

    </Wrapper>

  );
}

export default CreatePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: min-content; */
  height: 100vh;
  /* height: calc(100vh - 160px); */
background-color: #EEEEEE;
  `

const ActionPlan = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  /* width: 60vw; */
  background-color: white;
  border-radius: 25px;
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

const AddBtn = styled.button``
const DelBtn = styled.button``

const Submit = styled.button`
width: 50px;
height:40px;
`

// const GoalForm = styled.form`
// `

const Card = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 60vw;
  background-color: white;
  border-radius: 25px;
  `


const GreyLine = styled.div`
display: flex;
flex-direction: row;
  justify-content: space-between;
  background-color: #B2B1B9;
  height: 60px;
  width: auto;
  border-radius: 25px 25px 0px 0px ;
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
  margin: 15px;
  :focus {
    background-color: #51C4D3;
  }

  `

const StepName = styled.input`
`

// const StepDescription = styled.textarea`
// `


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



// const TextArea = styled.textarea`
// `

const Text = styled.h2`
font-size: 20px;
color: #1A1A40;
margin: 20px 30px 10px 30px;
`
const EditorWrapper = styled.div`
/* height: 50px; */
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

// Goal[descr]: <p>asdfasd</p>
// Goal[team_enable]: false
// Goal[ecology]: 
// Goal[personal_resources]: 
// Goal[steps][0][descr]: <p>asdf</p>
// Goal[steps][0][price]: 0
// Goal[steps][0][start_date]: 
// Goal[steps][0][name]: asdf
// Goal[steps][0][uid]: 43c8aaf0-193c-11ed-89a7-55566583d679
// Goal[steps][0][end_date]: 0
// Goal[steps][0][status]: active
// Goal[steps][0][images]: 
// Goal[comment_privacy]: 0
// Goal[promise_cost_type]: 1
// Goal[privacy]: 0
// Goal[price]: 
// Goal[name]: asdf
// Goal[promise_cost]: 0
// Goal[end_date]: 
// Goal[status]: active
// Goal[sale_for_my_templates]: 0
// Goal[habit][days][0]: Mon
// Goal[habit][days][1]: Tue
// Goal[habit][days][2]: Wed
// Goal[habit][days][3]: Thu
// Goal[habit][days][4]: Fri
// Goal[habit][days][5]: Sat
// Goal[habit][days][6]: Sun
// Goal[habit][start_goal]: 1
// Goal[habit][promise_sale]: 0
// Goal[habit][count_days]: 21
// Goal[bgimage]: 
// Goal[expert_help]: 0
// Goal[ending_criteria]: 
// Goal[images]: 
// Goal[language]: en
// Goal[special]: 0
// Goal[team_type]: 1
// Goal[create_type]: 1
// Goal[category]: 0
// Goal[bgcolor]: 


