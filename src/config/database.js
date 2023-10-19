const mongo = require("mongoose");
const logger = require("../util/logging");
const log = logger("app.js");

const dbConnect = async () => {
    try {
        const name = "gaurav";
        const pwd = "0021";
        const host = "127.0.0.1";
        const port = 27017;
        const dbName = "Project";
        const DBURL = `mongodb://${name}:${pwd}@${host}:${port}/${dbName}`
        await mongo.connect(DBURL);
        log.info(`Mongo DB Connection is Success !!`);
    }catch(err){
        log.error();(`Mongo DB Connection Failed err:${err}`);
    }
}
module.exports = dbConnect;