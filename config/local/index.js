//noinspection JSUnusedGlobalSymbols
export default {
    port  : 6160,
    logger: {
        appenders : {
            web: {
                maxLogSize          : 1024,
                alwaysIncludePattern: true,
                pattern             : "-yyyy-MM-dd.log",
                type                : "dateFile",
                filename            : "runtime/logs/"
            }
        },
        categories: {
            default: {
                appenders: ["web"],
                level    : "info"
            },
        }
    },
};