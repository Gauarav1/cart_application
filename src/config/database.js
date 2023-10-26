const mongo = require("mongoose");
const logger = require("../util/logging");
const log = logger("app.js");
const dotENV = require("dotenv");
dotENV.config();


const dbConnect = async () => {
    try {
        const name = process.env.name;
        const pwd = process.env.pwd;
        const host = process.env.host;
        const dbPort =process.env.dbPort;
        const dbName =process.env.dbName;
        const DBURL = `mongodb://${name}:${pwd}@${host}:${dbPort}/${dbName}`
        await mongo.connect(DBURL);
        log.info(`Mongo DB Connection is Success !!`);
    } catch (err) {
        log.error(); (`Mongo DB Connection Failed err:${err}`);
    }
}

module.exports = dbConnect;