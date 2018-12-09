import http =  require("http");
import {getLogger, Logger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../config";
import app from "./app";
const PORT = process.env.SERVER_PORT || 3000;
const logger: Logger = getLogger("MainsServer");
logger.level = APPLICATION_LOG_LEVEL;

http.createServer(app).listen(PORT, () => {
    logger.info("Express server listening on port " + PORT);
});
