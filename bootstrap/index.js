import Koa from 'koa';
import Log4js from 'log4js';
import Static from 'koa-static';
import BodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import Request from 'request';

class Bootstrap {

    constructor() {
        const router = Router();
        this.app = new Koa();
        this.logger = Log4js.getLogger();
        this.app.use(Static(__dirname + `/../build`, {extensions: ['html']}));
        this.app.use(BodyParser());
        this.app.use(router.routes());
        this.app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            this.logger.info('%s %s %s - %sms', ctx.status, ctx.method, ctx.url, ms);
        });
        this.app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            ctx.set('Charset', 'utf-8');
            ctx.set('Content-Type', 'application/json');
            ctx.set('X-Response-Time', `${Date.now() - start}ms`);
        });

        const {rpc} = this.loadConfig();
        Object.keys(rpc || {}).forEach(name => {
            router.post(`/${name}`, async (ctx) => {
                const {method, resource, ...query} = ctx.request.body;
                const METHOD = (method || 'post').toUpperCase();
                let options = {
                    headers: ctx.headers,
                    uri    : `${rpc[name].replace(/\/$/, '')}/${(resource || '').replace(/^\//, '')}`,
                    method : METHOD,
                    timeout: 10000,
                };
                switch (METHOD) {
                case 'GET':
                    options['qs'] = query;
                    break;
                case 'POST':
                    options['json'] = true;
                    options['body'] = JSON.stringify(query);
                    break;
                default:
                    options['json'] = true;
                    options['body'] = JSON.stringify(query);
                }
                Request(options, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        ctx.body = body;
                    } else {
                        ctx.response.code = response.statusCode;
                    }
                });
            });
        });
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