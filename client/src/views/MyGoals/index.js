import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../../CurrentUserContext";
import { getUserGoals } from "../../api/GoalApi"
import LoadingSpinner from "../../components/LoadingSpinner";
import GoalView from "./Goal";

const MyGoalsView = () => {
    const {
        isUserLoading,
        isUserAuthenticated,
        accessToken,
        loginWithRedirect,
        currentProfile
    } = useContext(CurrentUserContext)

    const [isGoalsLoading, setIsGoalsLoading] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (isUserLoading) {
            return;
        }

        if (!isUserAuthenticated) {
            loginWithRedirect();
        }

    }, [isUserAuthenticated, isUserLoading])

    useEffect(() => {
        
        if (currentProfile._id) {
            fetchMyGoals();
        }
       
    }, [currentProfile])


    const fetchMyGoals = async () => {
        setIsGoalsLoading(true);
        console.log(currentProfile);
        const goals = await getUserGoals(currentProfile._id);
        console.log(goals);
        setGoals(goals);
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

export default MyGoalsView;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 160px);
`

const GoalsRoot = styled.div`
`
