import styled from "styled-components";
import ToggleSwitch from '../../../components/ToggleSwitch'
import draftToHtml from 'draftjs-to-html'
import { useEffect, useState, useContext } from "react";
import { updateStepStatus } from '../../../api/GoalApi'
import { CurrentUserContext } from "../../../CurrentUserContext";

const StepView = ({ step, goalId,setIsLoading, onStepStatusChanged,isReadOnly }) => {
    const [stepDescription, setStepDescription] = useState("")
    const [finished, setFinished] = useState(false)
    const [name, setName] = useState("")
    const stepId = step.id;
   
    const {
        currentProfile, isUserLoading, isUserAuthenticated,
        accessToken,
    } = useContext(CurrentUserContext)

    const isOwner = currentProfile !== null && currentProfile._id === goalId;

    useEffect(() => {
        if (!step) {
            return;
        }
        setStepProperties(step)
    }, [])

    const setStepProperties = (currentStep) => {
        if (step.description) {
            const desc = JSON.parse(step.description);
            setStepDescription(draftToHtml(desc));
        }

        if (currentStep.name) {
            setName(currentStep.name);
        }

        setFinished(currentStep.finished);
    }

    const changeStepStatus = async (e) => {
        setIsLoading(true)
        const finished = e.target.checked;

        const updateObj = {
            finished: finished
        }
        const step = await updateStepStatus(accessToken, goalId, stepId, updateObj)
        setStepProperties(step)
        onStepStatusChanged(step);
        setIsLoading(false)
    }

    const createDescMarkup = () => {
        return { __html: `${stepDescription}` }
    }

    const onChange = (e) => {
        changeStepStatus(step.id, e.target.checked);
    }

    return (<Wrapper >
        {
            !isUserLoading && isUserAuthenticated && !isReadOnly && (<ToggleSwitch  checked={finished} onChange={changeStepStatus}></ToggleSwitch>)
        }
        <StepBody>
            {
                finished ? (<Name><s>{name}</s></Name>): (<Name>{name}</Name>)
            }
            <Description dangerouslySetInnerHTML={createDescMarkup()} ></Description>
        </StepBody>
    </Wrapper>)
}

export default StepView;

const Wrapper = styled.div`
display:flex;
flex-direction: row;
width: 90vw;
height: auto;
/* margin: 10px 30px 10px 30px; */
`

const StepBody = styled.div`
display: flex;
flex-direction: column;
padding-left: 10px;
`

const Description = styled.p`
font-size: 20px;
`
const Name = styled.p`
font-size: 30px;
margin: 0px;
`
