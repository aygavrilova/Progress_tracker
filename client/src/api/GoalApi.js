
const getAllGoals = async(page, size)=>{
    try {
        return fetch(`/v1/api/goals?page=${page}&size=${size}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then(result => {
                return result.goals
            })
    }
    catch (e) {
        console.log(e.message);
        throw e
    }
}

const getUserGoals = async(profileId) =>{
    if(!profileId){
         throw 'Cannot return user goals, received profile id is incorrect'
    }

    try {
        return fetch(`/v1/api/profile/${profileId}/goals`, {
            method: 'GET',
            // headers: {
            //     Authorization: `Bearer ${accessToken}`,
            // },
        })
            .then((res) => res.json())
            .then(result => {
                return result.goals
            })
    }
    catch (e) {
        console.log(e.message);
        throw e
    }
}

const createGoal = async (accessToken, goal) => {
    try {
        return fetch("/v1/api/goals", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(goal)
        })
            .then((res) => res.json())
            .then(result => {
                return result.goalId
            })
    }
    catch (e) {
        console.log(e.message);
        throw e
    }
}

const updateGoal = async(accessToken, goal) => {
    try {
        return fetch("/v1/api/goals", {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(goal)
        })
            .then((res) => res.json())
            .then(result => {
                return result.goalId
            })
    }
    catch (e) {
        console.log(e.message);
        throw e
    }
}

const getGoal = async (goalId) => {
    try {
        return fetch(`/v1/api/goals/${goalId}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(result => {
                return result.goal;
            })
    } catch (e) {
        console.log(e.message);
        throw e
    }
}

const updateStepStatus = async (accessToken, goalId, stepId, body) => {
    try {
        return fetch(`/v1/api/goals/${goalId}/steps/${stepId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then(result => {
                return result.step;
            })
    }
    catch (e) {
        console.log(e.message);
        throw e;
    }
}

module.exports = { createGoal, getGoal, updateStepStatus,updateGoal,getUserGoals,getAllGoals }
