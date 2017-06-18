const APIError = require('../middlewares/rest').APIError;
const {query} = require('../middlewares/mysql.cfg.js');
const decodeLoginkey = require('../middlewares/decodeloginkey.js');
const redis = require('../middlewares/redis')();


var setNickName = async (ctx, next) => {
    const loginKey = ctx.request.body.loginKey || '';
    const nickName = ctx.request.body.nickName || '';
    console.log('come in notelist API')
    async function setName(mid, nickName) {
        let setSql = `update user_info_tab set nick_name = ? where mid = ?;`;
        let arr = [];
        arr.push(nickName);
        arr.push(mid);
        let dataList = await query(setSql, arr);
        return dataList;
    }

    async function respData() {
        if (loginKey == '') {
            ctx.rest({
                code: 10002,
                msg: '缺少loginKey,请先登录。'
            })
        } else {
            var mid = JSON.parse(decodeLoginkey(loginKey)).mid;
            var isLegal = false;
            async function redisGet () {
                return redis.get(mid)
            }
            var getter = await redisGet();
            if (getter) {
                if (JSON.parse(getter).loginKey == loginKey) {
                    isLegal = true;
                } else {
                    isLegal = false;
                }
                console.log(getter)
            } else {
                ctx.rest({
                    code: 10003,
                    msg: '本次登录不合法，请重新登录',
                })
            }
            if (isLegal) {
                let dataList = await setName(mid,nickName);
                console.log(dataList);
                if (dataList.affectedRows >= 0) {
                    ctx.rest({
                        code: 10001,
                        msg: 'SUCCESS'
                    })
                } else {
                    APIError();
                }
            } else {
                ctx.rest({
                    code: 10003,
                    msg: '本次登录不合法，请重新登录',
                })
            }
        }
    }
    await respData();
};

module.exports = {
    'POST /note/setNickName': setNickName
};