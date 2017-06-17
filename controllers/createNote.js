const APIError = require('../middlewares/rest').APIError;
const { query } = require('../middlewares/mysql.cfg.js');
const decodeLoginkey = require('../middlewares/decodeloginkey.js');
const redis = require('../middlewares/redis')();

var createNote = async (ctx, next) => {
    var loginKey = ctx.request.body.loginKey || '';
    var tittle = ctx.request.body.tittle || '';
    var reqContent = ctx.request.body.content || '';

    console.log('come in editcontent API');

    async function insertNote(a, b, c) {
        let insertSql = `insert into note_info_tab (mid,tittle,content) values (?,?,?);`;
        console.log(insertSql);
        let arr = [a, b, c]
        let dataList = await query(insertSql);
        return dataList;
    }
    async function respData() {
        if (loginKey == '') {
            ctx.rest({
                code: 10005,
                msg: '缺少loginKey,请先登录。'
            })
        } else {
            var mid = JSON.parse(decodeLoginkey(loginKey)).mid;
            var isLegal = false;
            async function redisGet() {
                return redis.get(mid)
            }
            var getter = await redisGet();
            if (getter) {
                if (JSON.parse(getter).loginKey == loginKey) {
                    isLegal = true;
                } else {
                    isLegal = false;
                }
            } else {
                APIError();
            }
            if (isLegal) {
                let dataList = await insertNote(mid, tittle, reqContent);
                console.log(dataList)
                ctx.rest({
                    code: 10001,
                    msg: 'SUCCESS',
                    result: { nid: dataList.insertId }
                });
            } else {
                ctx.rest({
                    code: 10006,
                    msg: '本次登录不合法，请重新登录',
                })
            }
        }
    }
    await respData();
};

module.exports = {
    'POST /note/createNote': createNote
};