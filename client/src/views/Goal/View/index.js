import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import { getGoal } from '../../../api/GoalApi'
import { useContext, useEffect, useState } from "react";
import draftToHtml from 'draftjs-to-html'
import StepsView from "./Steps";
import { CurrentUserContext } from "../../../CurrentUserContext";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ProgressBar from "./ProgressBar";
const ViewGoal = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [goal, setGoal] = useState({})
  const [steps, setSteps] = useState([])
  const [descHtml, setDescHtml] = useState("")
  const navigate = useNavigate();
  const [isReadOnly, setIsReadonly] = useState(true)
  const {isUserLoading,currentProfile} = useContext(CurrentUserContext)
  const [img, setImg] = useState("")

  useEffect(() => {
    fetchGoal(id);
  }, [])

  const fetchGoal = async (id) => {
    setIsLoading(true);

    const goal = await getGoal(id);
    if (goal) {
      setSteps(goal.steps);

      const descObj = JSON.parse(goal.description);
      const descriptionHtml = draftToHtml(descObj)

      setGoal(goal)
      setDescHtml(descriptionHtml)

      if(goal.imagePath !== undefined && goal.imagePath !== ""){
        setImg(goal.imagePath);
      }

      if(currentProfile._id){
        setIsReadonly(currentProfile._id !== goal.profileId);
      }
    }

    setIsLoading(false);
  }

  useEffect(()=>{

    if(!currentProfile._id){
      return
    }

    setIsReadonly(currentProfile._id !== goal.profileId);

  }, [currentProfile])

  const onStepStatusChanged = (step) => {
    setSteps((currentStep) => currentStep.map(x => x.id === step.id ? {
      ...x,
      finished: step.finished
    } : x))
  }

  const createDescMarkup = () => {
    return { __html: `${descHtml}` }
  }

  const editWithRedirect = () => {
    const url = `/goal/${id}/edit`;
    navigate(url);
  }

  return <Wrapper>
    {
      isLoading || isUserLoading ? (<LoadingSpinner></LoadingSpinner>) : (
        <Wrapper1>
          <ProgressBar steps={steps}></ProgressBar>
          <Card>
            <GreyLine>
              <Name>{goal.name}</Name>
            </GreyLine>
            <Text>{goal.accompCriteria}</Text>
            <Image src={img}></Image>
            <Text dangerouslySetInnerHTML={createDescMarkup()} ></Text>
            <StepsView goal={goal} id={id} onStepStatusChanged={onStepStatusChanged} isReadOnly={isReadOnly} ></StepsView>
            <GreyLine2>
              <Button onClick={editWithRedirect}>Edit</Button>
            </GreyLine2>
          </Card>
        </Wrapper1>
      )
    }
  </Wrapper>

}

export default ViewGoal;

const Wrapper = styled.div`
position: relative;
  display: flex;
  background: url("/images/watercolor-background.jpg");
  justify-content: baseline;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const Wrapper1 = styled.div`
display: flex;
flex-direction: column;
`

const Card = styled.div`
display: flex;
  flex-direction: column;
  height: auto;
  width: 60vw;
  background-color: #FFFBE9;
  border-radius: 25px;
  margin-top: 30px;
margin-bottom: 15px;
box-shadow: 5px 20px 24px 15px rgba(160,188,194,0.42);

`

const Name = styled.h1`
display: flex;
  color: #1A1A40;
  font-size: 30px;
`

const Text = styled.p`
margin: 10px 30px 10px 30px;
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
flex-direction: row;
justify-content: flex-end;
background-color: #DEBA9D;
height: 60px;
width: auto;
border-radius: 0px 0px 25px 25px;
margin-top: 20px;
`

const Image = styled.img`
margin: 10px 30px 10px 30px;
`

const Button = styled.button`
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
