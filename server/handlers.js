const { getProfile,updateProfile,getProfileEmailPrefs } = require("./repository/profileRepository.js")

const { createGoal } = require("./repository/goalRepository.js")

const jwt_decode = require('jwt-decode');

const getUsersHandler = async (req, res) => {
    // const users =await getAllUsers();
    // return res.status(200).json({ status: 200, users:users});
}

const getProfileHandler = async (req, res) => {
    const id = req.params.id
    const result = await getProfile(id)

    if (!result.ok) {
        return res.status(500).json({ status: 500, message: "An error occurred, please contact administrator" })
    } else {
        return result.profile !== null
            ? res.status(200).json({ status: 200, profile: result.profile })
            : res.status(404).json({ status: 404, message: "Profile not found" })
    }
}

const getCurrProfileHandler = async (req, res) => {
    const decoded = jwt_decode(req.token)["sub"]
    let id = ""
    if (decoded.startsWith("auth0|")) {
        id = decoded.slice("auth0|".length);
    }

    const result = await getProfile(id);

    if (result.ok) {

        return result.profile !== null
            ? res.status(200).json({ status: 200, profile: result.profile })
            : res.status(404).json({ status: 404, message: "Profile not found" });

    } else {
        return res.status(500).json({ status: 500, message: result.error });
    }
}

const patchCurrProfileHandler = async (req, res) => {
    console.log("hier, patch")
    const decoded = jwt_decode(req.token)["sub"];
    let id = "";
    if (decoded.startsWith("auth0|")) {
        id = decoded.slice("auth0|".length);
    }
    let body = req.body;

    let result = await updateProfile(id, body)
    if(!result.ok){
        return res.status(500).json({status:500, message:result.error});
    }

    result = await getProfile(id);
    if (result.ok) {

        return result.profile !== null
            ? res.status(200).json({ status: 200, profile: result.profile })
            : res.status(404).json({ status: 404, message: "Profile not found" });

    } else {
        return res.status(500).json({ status: 500, message: result.error });
    }
}

const patchProfileEmailsPrefsHandler = async(req, res) =>{
    const decoded = jwt_decode(req.token)["sub"];
    let id = "";
    if (decoded.startsWith("auth0|")) {
        id = decoded.slice("auth0|".length);
    }
    let body = req.body;
    let emailPrefs = {}

    emailPrefs["friendBirthday"]= body.emailPrefs.friendBirthday ? body.emailPrefs.friendBirthday : false;
    emailPrefs["friendRequest"] = body.emailPrefs.friendRequest ? body.emailPrefs.friendRequest : false;
    emailPrefs["goalComment"]=body.emailPrefs.goalComment ? body.emailPrefs.goalComment : false;

    const updateObj = {
        emailPrefs : emailPrefs
    }
    let result = await updateProfile(id, updateObj)
    if(!result.ok){
        return res.status(500).json({status:500, message:result.error});
    }

    result = await getProfile(id, {projection : {emailPrefs:1}});
    if(!result.ok){
        return res.status(500).json({status:500, message:result.error});
    }

    if (result.ok) {

        return result.profile !== null
            ? res.status(200).json({ status: 200, emailPrefs: result.profile.emailPrefs })
            : res.status(404).json({ status: 404, message: "Profile not found" });

    } else {
        return res.status(500).json({ status: 500, message: result.error });
    }
}

const patchProfileUserInfoHandler = async(req, res) =>{
    const decoded = jwt_decode(req.token)["sub"];
    let id = "";
    if (decoded.startsWith("auth0|")) {
        id = decoded.slice("auth0|".length);
    }
    let body = req.body;
    let updateObj = {}

    updateObj["firstName"]= body.firstName ? body.firstName : "";
    updateObj["lastName"] = body.lastName ? body.lastName : "";
    updateObj["country"]=body.country ? body.country : "";

    let result = await updateProfile(id, updateObj)
    if(!result.ok){
        return res.status(500).json({status:500, message:result.error});
    }

    result = await getProfile(id, {projection : {emailPrefs:1}});
    if (result.ok) {

        return result.profile !== null
            ? res.status(200).json({ status: 200, emailPrefs: result.emailPrefs })
            : res.status(404).json({ status: 404, message: "Profile not found" });

    } else {
        return res.status(500).json({ status: 500, message: result.error });
    }
}

const getGoalsHandler = (req, res) => {

}

const getGoalHandler = (req, res) => {

}

const createGoalHandler = (req, res) => {

    const goalTemplate = {
        id: "",
        name: "",
        description: "",
        settings:{
            access : "me"
        }
    
    }
    
    const body = req.body;
    console.log(body);
    const steps = {
        id: "",
        name: "",
        description: ""
    }

    return res.status(200).json({status:200, goal: "ok"})
    
}

module.exports = {
    getUsersHandler,
    getCurrProfileHandler,
    getProfileHandler,
    getGoalsHandler,
    getGoalHandler,
    createGoalHandler,
    patchCurrProfileHandler,
    patchProfileEmailsPrefsHandler,
    patchProfileUserInfoHandler
};




//     Goal[descr]: <p><strong>asdfasdfasdf</strong></p>
// Goal[team_enable]: false
// Goal[ecology]: 
// Goal[personal_resources]: 
// Goal[comment_privacy]: 0
// Goal[promise_cost_type]: 1
// Goal[privacy]: 0
// Goal[price]: 
// Goal[name]: test goal
// Goal[promise_cost]: 0
// Goal[end_date]: 
// Goal[status]: active
// Goal[sale_for_my_templates]: 0
// Goal[habit][days][0]: Mon
// Goal[habit][days][1]: Tue
// Goal[habit][days][2]: Wed
// Goal[habit][days][3]: Thu
// Goal[habit][days][4]: Fri
// Goal[habit][days][5]: Sat
// Goal[habit][days][6]: Sun
// Goal[habit][start_goal]: 1
// Goal[habit][promise_sale]: 0
// Goal[habit][count_days]: 21
// Goal[bgimage]: 
// Goal[expert_help]: 0
// Goal[ending_criteria]: <p>bla</p><p>bla</p><p>bla</p><p>blaas</p>
// Goal[images]: 
// Goal[language]: en
// Goal[special]: 0
// Goal[team_type]: 1
// Goal[create_type]: 1
// Goal[category]: 0
// Goal[bgcolor]: 
