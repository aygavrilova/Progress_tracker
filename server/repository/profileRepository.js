const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const dbName = "progress_tracker";
const dbColl = "profiles";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllProfiles = async()=>{

    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db(dbName);
        const cursor = await db.collection(dbColl).find()
        const users = await cursor.toArray();

        const result = {ok:true, users:users}
        return result;
    }
    catch(err){
        console.log(err);
        return {
            ok:false,
            error:err
        };
    }finally{
        await client.close();
    }
};

const getProfileById = async(profileId)=>{
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db(dbName);
        const profile = await db.collection(dbColl).findOne({_id:ObjectId(profileId)})
        const result = {ok:true, profile:profile}
        return result;
    }
    catch(err){
        console.log(err);
        return {
            ok:false,
            error:err
        };
    }finally{
        await client.close();
    }
}

const getProfileByUserId = async(userId, projection) =>{
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db(dbName);
        const query = {user_id:userId}

        if(projection){
            const options = {projection : projection}
        }

        const profile = await db.collection(dbColl).findOne({user_id:userId})
        
        const result = {ok:true, profile:profile}
        return result;
    }
    catch(err){
        console.log(err);
        return {
            ok:false,
            error:err
        };
    }finally{
        await client.close();
    }
}


const updateProfile = async(userId, updateObject)=>{
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db(dbName);
        await db.collection(dbColl).updateOne({user_id  : userId}, {$set: updateObject})
        const result = {
            ok:true, 
        }
        return result;
    }
    catch(err){
        console.log(err);
        return {
            ok:false,
            error:err
        };
    }finally{
        await client.close();
    }
}

module.exports = { getAllProfiles,getProfileByUserId,updateProfile,getProfileById };
