const APIError = require('../middlewares/rest').APIError;
const {query} = require('../middlewares/mysql.cfg.js');
const encodeLoginkey = require('../middlewares/encodeloginkey');
const redis = require('../middlewares/redis')();

var login = async (ctx, next) => {
    var
        accountNo = ctx.request.body.accountNo || '',
        password = ctx.request.body.password || '';

    console.log(`signin with name: ${accountNo}, password: ${password}`);

    async function selectPerson(accountNo) {
        let searchSql = `select * from user_info_tab where account_no = ?;`;
        let arr = [];
        arr.push(accountNo)
        console.log(accountNo);
        console.log(arr)
        let dataList = await query(searchSql, arr)
        return dataList
    }
    async function respData() {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(accountNo))) {
            ctx.rest({
                code: 10014,
                msg: '用户名不合法，请输入正确的用户名！'
            })
        } else {
            let dataList = await selectPerson(accountNo);
            console.log(dataList);
            if (dataList.length == 1) {
                if (accountNo == dataList[0].account_no && password == dataList[0].password) {
                    let beforeLoginKey = {};
                    let mid = dataList[0].mid;
                    beforeLoginKey.mid = JSON.stringify(mid);
                    let now = new Date();
                    beforeLoginKey.timeStemp = now.getTime() / 1000;
                    var loginKey = encodeLoginkey(JSON.stringify(beforeLoginKey));
                    var redisObj = {};
                    redisObj.loginKey = loginKey;
                    redisObj.msg = true;
                    redis.set(mid, JSON.stringify(redisObj));
                    ctx.rest({
                        code: 10001,
                        msg: 'SUCCESS',
                        result: {
                            loginKey: loginKey
                        }
                    });
                } else {
                    ctx.rest({
                        code: 10011,
                        msg: '用户名或密码错误，请检查后重新输入'
                    });
                }
            } else if (dataList.length > 1) {
                ctx.rest({
                    code: 10019,
                    msg: '该账号异常，请检查数据库'
                });
            } else {
                ctx.rest({
                    code: 10012,
                    msg: '该用户不存在'
                });
            }
        }
    }
    await respData();
};

module.exports = {
    'POST /note/login': login
};