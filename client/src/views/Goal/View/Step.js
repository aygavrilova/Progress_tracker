import styled from "styled-components";
import ToggleSwitch from '../../../components/ToggleSwitch'
import draftToHtml from 'draftjs-to-html'
import { useEffect, useState } from "react";
import { getConfig } from "../../../config";
import { updateStepStatus } from '../../../api/GoalApi'
import { useAuth0, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const config = getConfig();

const StepView = ({ step, goalId,setIsLoading }) => {
    const [stepDescription, setStepDescription] = useState("")
    const [finished, setFinished] = useState(false)
    const [name, setName] = useState("")
    const stepId = step.id;
    const {
        getAccessTokenSilently,
    } = useAuth0();

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

        const accessToken = await getAccessTokenSilently({
            audience: `https://${config.domain}/api/v2/`,
            scope: "openid",
        });

        const updateObj = {
            finished: finished
        }
        const step = await updateStepStatus(accessToken, goalId, stepId, updateObj)
        setStepProperties(step)
        setIsLoading(false)
    }

    const createDescMarkup = () => {
        return { __html: `${stepDescription}` }
    }

    const onChange = (e) => {
        changeStepStatus(step.id, e.target.checked);
    }

    return (<Wrapper >
        <ToggleSwitch  checked={finished} onChange={changeStepStatus}></ToggleSwitch>
        <StepBody>
            <Name>{name}</Name>
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