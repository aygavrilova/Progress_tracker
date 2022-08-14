const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const dbName = "progress_tracker";
const dbColl = "users";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllUsers = async()=>{

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

module.exports = { getAllUsers };
