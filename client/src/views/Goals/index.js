import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../../CurrentUserContext";
import { getAllGoals } from "../../api/GoalApi"
import LoadingSpinner from "../../components/LoadingSpinner";
import GoalView from "./Goal";

const AllGoalsView = ()=>{
    const {
        isUserLoading,
        isUserAuthenticated,
        accessToken,
        loginWithRedirect,
        currentProfile
    } = useContext(CurrentUserContext)

    const [isGoalsLoading, setIsGoalsLoading] = useState(false);
    const [goals, setGoals] = useState([]);
    const [page, setPage] = useState(0);
    const size = 20;

    useEffect(() => {
        fetchMyGoals();

    }, [])


    const fetchMyGoals = async () => {
        setIsGoalsLoading(true);
        const goals = await getAllGoals(page, size);
        console.log(goals)
        setGoals(goals);
        setPage(page+1);
        setIsGoalsLoading(false);
    }

    return (<>
        {
            isGoalsLoading ?
                (<LoadingSpinner></LoadingSpinner>)
                : (
                    <Wrapper>
                        <GoalsRoot>
                            {
                                goals.map(goal=>{
                                    return <GoalView goal={goal} key={goal._id}></GoalView>
                                })
                            }
                        </GoalsRoot>
                    </Wrapper>
                )
        }

    </>)
}

export default AllGoalsView;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 160px);
`


const GoalsRoot = styled.div`
`

const Name = styled.h3`
`
