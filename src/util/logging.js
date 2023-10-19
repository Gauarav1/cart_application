const winston = require("winston");

const logger = (serviceName) => {
    return winston.createLogger({
        level: `info`,
        format: winston.format.json(),
        defaultMeta: { service: serviceName },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    })
}
module.exports = logger;
