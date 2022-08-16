import StepView from "./Step";
import styled from "styled-components";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";

const StepsView = ({ goal, id }) => {
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
                    return <StepView key={step.id} goalId={id} step={step} setIsLoading={setIsLoading} />
                })
            }
        </Wrapper>
    )
}

export default StepsView;


const Wrapper = styled.div`

`
