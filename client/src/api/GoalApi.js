


const createGoal = (accessToken, goal) => {
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
                return result.goal
            })
    }
    catch (e) {
        console.log(e.message);
        throw e
    }
}


module.exports = { createGoal }
