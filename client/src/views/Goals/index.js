import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../../CurrentUserContext";
import { getAllGoals } from "../../api/GoalApi"
import LoadingSpinner from "../../components/LoadingSpinner";
import GoalView from "../GoalView";

const AllGoalsView = () => {
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
        setGoals(goals);
        setPage(page + 1);
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
                                goals.map(goal => {
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
position: relative;
justify-content: space-around;
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;  
background: url("/images/watercolor-background.jpg");
`

const GoalsRoot = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 1300px;
height: fit-content;
margin-top: 10px;
margin-bottom: 20px;
cursor: pointer;
`

const Titel = styled.h1`
display: flex;
color: #1A1A40;
font-family: 'Caveat', cursive;
font-size: 30px;
padding: 0px;
margin-top: 20px;
/* text-align: center; */

`


