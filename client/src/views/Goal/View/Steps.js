import StepView from "./Step";
import styled from "styled-components";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";

const StepsView = ({ goal, id,onStepStatusChanged, isReadOnly }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [steps, setSteps] = useState([])

    useEffect(() => {
        if (goal.steps !== undefined) {
            setSteps(goal.steps);
        }
    }, [])

    return (
        <Wrapper>
            {
                isLoading && (<LoadingSpinner></LoadingSpinner>)
            }
            {
                steps.map((step) => {
                    return <StepView isReadOnly={isReadOnly} key={step.id} goalId={id} step={step} setIsLoading={setIsLoading} onStepStatusChanged={onStepStatusChanged} />
                })
            }
        </Wrapper>
    )
}

export default StepsView;


const Wrapper = styled.div`

`
