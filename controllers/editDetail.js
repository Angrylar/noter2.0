const APIError = require('../middlewares/rest').APIError;
const { query } = require('../middlewares/mysql.cfg.js');
const decodeLoginkey = require('../middlewares/decodeloginkey.js');
const redis = require('../middlewares/redis')();

var editDetail = async (ctx, next) => {
    var loginKey = ctx.request.body.loginKey || '';
    var nid = ctx.request.body.nid || '';
    var tittle = ctx.request.body.tittle || '';
    var reqContent = ctx.request.body.content || '';

    console.log('come in refreshcontent API');

    async function refreshNote(ti, con, mid, nid) {
        let refreshSql = `update note_info_tab set tittle=? , content=? where mid=? and nId=?;`;
        console.log(refreshSql);
        let arr = [ti, con, mid, nid];
        let dataList = await query(refreshSql, arr);
        return dataList;
    }
    async function respData() {
        if (loginKey == '') {
            ctx.rest({
                code: 10005,
                msg: '缺少loginKey,请先登录。'
            })
        } else {
            if (nid == '') {
                ctx.rest({
                    code: 11000,
                    msg: '缺少nid,前端需要传过来nid！',
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
                    let data = await refreshNote(tittle, reqContent, mid, nid);
                    console.log('done')
                    ctx.rest({
                        code: 10001,
                        msg: 'SUCCESS'
                    });
                } else {
                    ctx.rest({
                        code: 10006,
                        msg: '本次登录不合法，请重新登录',
                    })
                }
            }
        }
    }
    await respData();
};

module.exports = {
    'POST /note/editDetail': editDetail
};