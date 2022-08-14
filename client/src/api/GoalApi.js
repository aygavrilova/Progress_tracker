


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


// const updateUserProfile = async (accessToken, data) => {
//     try {
//         return fetch("/v1/api/profile", {
//             method: 'PATCH',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//             body: JSON.stringify(data)
//         })
//         .then((res) => res.json())
//         .then(result => {
//                 return result.profile;
//             })
//         }catch(e){
//             console.log(e.message);
//             throw e
//         }
// }

module.exports = { createGoal }
