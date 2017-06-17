const APIError = require('../middlewares/rest').APIError;
const { query } = require('../middlewares/mysql.cfg.js');
const decodeLoginkey = require('../middlewares/decodeloginkey.js');
const redis = require('../middlewares/redis')();


var logout = async (ctx, next) => {
    const loginKey = ctx.request.body.loginKey || '';
    console.log('come in logout API')
    async function respData() {
        var mid = JSON.parse(decodeLoginkey(loginKey)).mid;
        async function redisGet() {
            return redis.set(mid, '');
        }
        var getter = await redisGet();
        ctx.rest({
            code: 10001,
            msg: 'SUCCESS',
        })
        console.log('exit succ');
    }
    await respData();
};

module.exports = {
    'POST /note/logout': logout
};