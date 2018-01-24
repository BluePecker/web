import Koa from 'koa';
import Log4js from 'log4js';
import Static from 'koa-static';

class Bootstrap {

    constructor() {
        this.app = new Koa();
        this.logger = Log4js.getLogger();
        this.app.use(Static(__dirname + `/../build`, {extensions: ['html']}));
    }

    start() {
        const {port, logger} = this.loadConfig();

        Bootstrap.logger(logger);

        // start to listen
        const http = this.app.listen(port, () => {
            this.logger.info(`Server is listening ${port}`);
        });
        // catch http server error
        http.on('error', (err) => {
            switch (err.code) {
            case 'EADDRINUSE':
                this.logger.error(`The port has been occupied: ${err.address}:${err.port}`);
                break;
            default:
                this.logger.error(err.Error);
            }
        });
    }

    // 加载配置文件
    loadConfig = () => require(`../config/${this.env()}`).default;

    // 获取环境变量
    env = () => process.env.NODE_ENV || 'pro';

    // 初始化日志
    static logger(logger) {
        Log4js.configure(logger || {});
    }
}

export default new Bootstrap();