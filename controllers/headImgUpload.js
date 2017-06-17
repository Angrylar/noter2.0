const path = require('path');
const { uploadFile } = require('../middlewares/fileuploadouter');

const uploadImg = async (ctx, next) => {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join(__dirname, '../file')

    // 上传文件事件
    result = await uploadFile(ctx, {
        fileType: 'img', // common or album
        path: serverFilePath
    })
    if (result.success) {
        console.log(result)

        ctx.rest({
            code: 10001,
            msg: result.message
        });
    } else {
        ctx.rest({
            code: 10101,
            msg: result.message
        });
    }
}
module.exports = {
    'POST /note/uploadImg': uploadImg
};