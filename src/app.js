const express = require("express");
const app = express();
app.use(express.json());
const logger = require("./util/logging");
const log = logger("app.js");

/* ROUTES */
const route = require("./route/index");
app.use(route.userRouter);
app.use(route.productRouter);
app.use(route.categoryRouter);

/* MONGO DB Connection */
const dbConnection = require("./config/database");

const PORT = 3000;
app.listen(PORT, () => {
    log.info(`Server Is Running on Port:${PORT}`);
    dbConnection();
});