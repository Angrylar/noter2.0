const path = require('path');
const {
    uploadFile
} = require('../middlewares/fileuploadouter');
const {
    query
} = require('../middlewares/mysql.cfg');
const decodeLoginkey = require('../middlewares/decodeloginkey.js');
const redis = require('../middlewares/redis')();


const uploadImg = async (ctx, next) => {

    async function insertHeadImg(mid, url) {
        let sql = 'UPDATE user_info_tab SET head_img = ? WHERE mid = ?;';
        let arr = [];
        arr.push(url);
        arr.push(mid);
        let dataList = await query(sql, arr);
    }

    async function uploadingFile() {

        // 上传文件请求处理
        let result = {
            success: false
        }
        let serverFilePath = path.join(__dirname, '../file')

        // 上传文件事件
        result = await uploadFile(ctx, {
            fileType: 'img', // common or album
            path: serverFilePath
        })
        console.log(`result:${JSON.stringify(result)}`);
        if (result.success) {
            var loginKey = result.loginKey;
            console.log(`loginKey:${loginKey}`)
            if (loginKey == '') {
                ctx.rest({
                    code: 10002,
                    msg: '缺少loginKey,请先登录。'
                })
            } else {
                var mid = JSON.parse(decodeLoginkey(loginKey)).mid;
                console.log(`mid:${mid}`);

                var isLegal = false;
                async function redisGet(mid) {
                    return redis.get(mid)
                }
                var getter = await redisGet(mid);
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
                    let insertImg = await insertHeadImg(mid, result.data.pictureUrl)
                    ctx.rest({
                        code: 10001,
                        msg: result.message,
                        result: {
                            'url': `${result.data.pictureUrl}`
                        }
                    });
                } else {
                    ctx.rest({
                        code: 10003,
                        msg: '本次登录不合法，请重新登录',
                    })
                }
            }
        }
    };
    await uploadingFile();
};
module.exports = {
    'POST /note/uploadImg': uploadImg
};