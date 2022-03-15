require('dotenv').config();

// create a global CONFIG object that can be throughout the application
let CONFIG = {};

CONFIG.env = process.env.ENV || 'dev';
CONFIG.port = process.env.PORT || '3000';

CONFIG.unoapp_token = process.env.UNOAPP_TOKEN;

CONFIG.mysql_driver = process.env.MYSQL_DRIVER || 'mysql';
CONFIG.mysql_host = process.env.MYSQL_HOST || 'localhost';
CONFIG.mysql_port = process.env.MYSQL_PORT || '3306';
CONFIG.mysql_name = process.env.MYSQL_DB_NAME || 'default'
CONFIG.mysql_user = process.env.MYSQL_USER || 'root';
CONFIG.mysql_password = process.env.MYSQL_PASSWORD || '';
CONFIG.api_ver = process.env.API_VER;

if (process.env.ENV === 'prod' || process.env.ENV === 'production') {
    CONFIG.cors_whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:8000', 'http://localhost:8001', 'http://localhost:8002', 'http://localhost:8003', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083', 'http://localhost:3020'];
}else {
    CONFIG.cors_whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:8000', 'http://localhost:8001', 'http://localhost:8002', 'http://localhost:8003', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083', 'http://localhost:3020']

    CONFIG.pn_publishKey = process.env.PUBNUB_PUBLISH;
    CONFIG.pn_subscribeKey = process.env.PUBNUB_SUBSCRIBE;
}

module.exports = CONFIG;