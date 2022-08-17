const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const dbName = "progress_tracker";
const dbColl = "goals";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createGoal = async (goal) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(dbName);
        const insertResult = await db.collection(dbColl).insertOne(goal)

        const result = { ok: insertResult.acknowledged, goalId: insertResult.insertedId }
        return result;
    }
    catch (err) {
        console.log(err);
        return {
            ok: false,
            error: err
        };
    } finally {
        await client.close();
    }
}

const updateGoal = async (goal, id) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(dbName);
        const updateResult = await db.collection(dbColl).replaceOne({ _id: ObjectId(id) }, goal)
        const result = { ok: updateResult.acknowledged, goalId: updateResult.modifiedCount > 0 }
        return result;
    }
    catch (err) {
        console.log(err);
        return {
            ok: false,
            error: err
        };
    } finally {
        await client.close();
    }
}

const getGoal = async (goalId) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(dbName);
        const goal = await db.collection(dbColl).findOne({ _id: ObjectId(goalId) })
        const result = { ok: true, goal: goal }
        return result;
    }
    catch (err) {
        console.log(err);
        return {
            ok: false,
            error: err
        };
    } finally {
        await client.close();
    }
}

const getAllGoals = async(page, size)=>{
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(dbName);
        const cursor = await db.collection(dbColl).find().skip(page * size).limit(size);
        const hasNext = await cursor.hasNext();
        const goals = await cursor.toArray();
        return { ok: true, goals: goals, hasNext:hasNext }
    }
    catch (err) {
        console.log(err);
        return {
            ok: false,
            error: err
        };
    } finally {
        await client.close();
    }
}

const getGoals = async (profileId) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(dbName);
        const goals = await db.collection(dbColl).find({ profileId: ObjectId(profileId)}).toArray()
        const result = { ok: true, goals: goals }
        return result;
    }
    catch (err) {
        console.log(err);
        return {
            ok: false,
            error: err
        };
    } finally {
        await client.close();
    }
}

const updateStepStatus = async (goalId, stepId, finished) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db(dbName);
        const query = { _id: ObjectId(goalId), "steps.id": stepId }
        const setObject = { $set: { "steps.$.finished": finished } }
        await db.collection(dbColl).updateOne(query, setObject)
        const result = {
            ok: true,
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return {
            ok: false,
            error: err
        };
    } finally {
        await client.close();
    }
}

module.exports = { createGoal, getGoal, updateStepStatus, updateGoal,getGoals,getAllGoals }
