const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const dbName = "progress_tracker";
const dbColl = "goals";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};





const createGoal = async (goal)=>{
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db(dbName);
        const insertResult = await db.collection(dbColl).insertOne(goal)

        const result = {ok:insertResult.acknowledged, goalId:insertResult.insertedId}
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

module.exports = {createGoal}
