const APIError = require('../middlewares/rest').APIError;
const {query} = require('../middlewares/mysql.cfg.js');
const decodeLoginkey = require('../middlewares/decodeloginkey.js');
const redis = require('../middlewares/redis')();


var userInfo = async (ctx, next) => {
    const loginKey = ctx.request.body.loginKey || '';
    console.log('come in notelist API')
    async function searchUserInfo(mid) {
        let searchSql = `select head_img as headImg, nick_name as nickName from user_info_tab where mid = ?;`;
        let arr = [];
        arr.push(mid);
        let dataList = await query(searchSql, arr);
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
                let dataList = await searchUserInfo(mid);
                // console.log(dataList);
                if (dataList.length >= 0) {
                    let result = {};
                    result.headImg = dataList[0].headImg;
                    result.nickName = dataList[0].nickName;
                    ctx.rest({
                        code: 10001,
                        msg: 'SUCCESS',
                        result: result
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
    'POST /note/userInfo': userInfo
};