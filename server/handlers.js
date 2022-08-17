const { getProfileById,getProfileByUserId,updateProfile,getProfileEmailPrefs } = require("./repository/profileRepository.js")

const { createGoal, getGoal,updateStepStatus,updateGoal,getGoals,getAllGoals } = require("./repository/goalRepository.js")

const { uploadFile,getFileStream } = require('./api/awsApi')
const fs = require('fs')
const util = require('util')
const unlinkFile= util.promisify(fs.unlink)

const jwt_decode = require('jwt-decode');
const { create } = require("domain");

const {v4 } = require('uuid');
const { ObjectID } = require("bson");

const getCurrProfileHandler = async (req, res) => {
    const decoded = jwt_decode(req.token)["sub"]
    let id = ""
    if (decoded.startsWith("auth0|")) {
        id = decoded.slice("auth0|".length);
    }

    const result = await getProfileByUserId(id);

    if (result.ok) {

        return result.profile !== null
            ? res.status(200).json({ status: 200, profile: result.profile })
            : res.status(404).json({ status: 404, message: "Profile not found" });

    } else {
        return res.status(500).json({ status: 500, message: result.error });
    }
}

const patchCurrProfileHandler = async (req, res) => {
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

    result = await getProfileByUserId(id);
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

    result = await getProfileByUserId(id, {projection : {emailPrefs:1}});
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
    

    updateObj["firstName"]= body.firstName ? body.firstName : "";
    updateObj["lastName"] = body.lastName ? body.lastName : "";
    updateObj["country"]=body.country ? body.country : "";

    let result = await updateProfile(id, updateObj)
    if(!result.ok){
        return res.status(500).json({status:500, message:result.error});
    }

    result = await getProfileByUserId(id, {projection : {emailPrefs:1}});
    
    if (result.ok) {

        return result.profile !== null
            ? res.status(200).json({ status: 200, emailPrefs: result.emailPrefs })
            : res.status(404).json({ status: 404, message: "Profile not found" });

    } else {
        return res.status(500).json({ status: 500, message: result.error });
    }
}

const getGoalsHandler = async(req, res)=>{
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);

    if (isNaN(page) || isNaN(size)) {
        page = 0;
        size=20;
    }

    const result = await getAllGoals(page, size);
    if(!result.ok){
        return res.status(500).json({status:500, message: result.error});
    }else{
        return res.status(200).json({status:200, goals:result.goals, hasNext: result.hasNext});
    }

}

const getProfileGoalsHandler = async(req, res) => {
    // const decoded = jwt_decode(req.token)["sub"];
    // let id = "";
    // if (decoded.startsWith("auth0|")) {
    //     id = decoded.slice("auth0|".length);
    // }

    const id = req.params.id;

    let result = await getProfileById(id);
    if(!result.ok){
        return res.status(500).json({status:500, message: result.error});
    }else{

        const profile = result.profile;
        if(profile === null){
            return res.status(404).json({status:404, message: "Profile not found"});
        }

        result = await getGoals(profile._id)
        return res.status(200).json({status:200, goals:result.goals});
    }
}

const getGoalHandler = async (req, res) => {
    const goalId = req.params.id

    const result = await getGoal(goalId)
    if(!result.ok){
        return res.status(500).json({status:500, message: result.error})
    }else{

        return result.goal !== null 
                            ? res.status(200).json({status:200, goal: result.goal})
                            : res.status(404).json({status:404, message: "Goal not found"});

    }
}

const createGoalHandler = async (req, res) => {
    const decoded = jwt_decode(req.token)["sub"];
    let id = "";
    if (decoded.startsWith("auth0|")) {
        id = decoded.slice("auth0|".length);
    }

    const body = req.body;

    if(!body.profileId){
        return res.status(400).json({status:400, message: "Goal owner is missing"})
    }

    let updateObj = {
        name: body.name ? body.name : "",
        accompCriteria: body.accompCriteria ? body.accompCriteria : "",
        description: body.description ? body.description : "",
        steps: body.steps ? body.steps: [],
        profileId: ObjectID(body.profileId),
        imagePath : body.imagePath ? body.imagePath : ""
    }

    const insertResult = await createGoal(updateObj)
    if(!insertResult.ok){
        return res.status(500).json({status:500, message:insertResult.error})
    }else{
        return res.status(200).json({status:200, goalId:insertResult.goalId})
    }
}

const updateGoalHandler = async (req, res) =>{
    const decoded = jwt_decode(req.token)["sub"];
    let userId = ""
    if (decoded.startsWith("auth0|")) {
        userId = decoded.slice("auth0|".length);
    }

    const body = req.body;
    const id = body._id;

    if(!body.profileId){
        return res.status(400).json({status:400, message: "Goal owner is missing"})
    }

    let updateObj = {
        name: body.name ? body.name : "",
        accompCriteria: body.accompCriteria ? body.accompCriteria : "",
        description: body.description ? body.description : "",
        steps: body.steps ? body.steps: [],
        profileId: ObjectID(body.profileId),
        imagePath : body.imagePath ? body.imagePath : ""
        // _id: id
    }

    const updateRes = await updateGoal(updateObj, id);
    if(!updateRes.ok){
        return res.status(500).json({status:500, message:updateRes.error})
    }else{
        return res.status(200).json({status:200, goalId:id})
    }
}

const patchGoalStepHandler = async (req, res)=>{
    const decoded = jwt_decode(req.token)["sub"];
    let id = "";
    if (decoded.startsWith("auth0|")) {
        id = decoded.slice("auth0|".length);
    }

    const goalId = req.params.id;
    const stepId = req.params.stepId;
    
    let result = await updateStepStatus(goalId, stepId, req.body["finished"])
    const end = Date.now();

    if(!result.ok){
        return res.status(500).json({status:500, message: result.error})
    }else{

        result = await getGoal(goalId);
        if(!result.ok){
            return res.status(500).json({status:500, message: result.error})
        }

        if(!result.goal){
            return res.status(500).json({status:500, message: "An error occurred"});
        }else{
            const steps = result.goal.steps;
            const step = steps.find(x=>x.id === stepId);
            return res.status(200).json({status:200, step: step})
        }
    }
}

const getImageHandler = async (req, res)=>{
    const key = req.params.key;
    const readStream = getFileStream(key)
    readStream.pipe(res)
}

const uploadImageHandler = async(req, res)=>{
    const file = req.file;
    const info = req.body.description
    const result = await uploadFile(file);
    await unlinkFile(file.path)
    return res.status(200).json({status:200, imagePath : `/v1/api/images/${result.Key}`});
}

module.exports = {
    getCurrProfileHandler,
    getProfileGoalsHandler,
    getGoalsHandler,
    getGoalHandler,
    createGoalHandler,
    patchCurrProfileHandler,
    patchProfileEmailsPrefsHandler,
    patchProfileUserInfoHandler,
    patchGoalStepHandler,
    updateGoalHandler,
    uploadImageHandler,
    getImageHandler
};
