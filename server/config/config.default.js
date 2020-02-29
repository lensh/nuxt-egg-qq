/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1565838568895_3232';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
        // mongoose配置
        mongoose: {
            client: {
                url: 'mongodb://127.0.0.1:27017/qq',
                options: { useUnifiedTopology: true }
            },
        },
        security: {
            csrf: {
                enable: false
            }
        },
        jwt: {
            secret: "shronfd@#$%shfbbfifopl!"
        }
    };
};