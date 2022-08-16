import styled from "styled-components";

const GoalView = ({goal})=>{
    return (
        <GoalRoot>
            <Name>{goal.name}</Name>
        </GoalRoot>
    )
}

export default GoalView;

const GoalRoot = styled.div`

`

const Name = styled.h3`
`
