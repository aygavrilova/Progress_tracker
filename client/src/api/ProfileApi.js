

const getCurrentUserProfile = async (accessToken) => {
    try {
        return fetch("/v1/api/profile", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((res) => res.json())
            .then(result => {
                return result.profile;

            })
    } catch (e) {
        console.log(e.message);
        throw e
    }
}

const updateUserProfile = async (accessToken, data) => {
    try {
        return fetch("/v1/api/profile", {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(result => {
                return result.profile;
            })
        }catch(e){
            console.log(e.message);
            throw e
        }
}

const updateProfileEmailPrefs = async (accessToken, data) => {
    try {
        return fetch("/v1/api/profile/emailPrefs", {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(result => {
                return result.emailPrefs;
            })
        }catch(e){
            console.log(e.message);
            throw e
        }
}

module.exports = { getCurrentUserProfile,updateUserProfile,updateProfileEmailPrefs };
