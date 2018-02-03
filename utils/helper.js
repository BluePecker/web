class Helper {
    // 加载配置文件
    loadConfig = () => require(`../config/${process.env.NODE_ENV || 'production'}`).default
}

export default new Helper();