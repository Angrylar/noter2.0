const APIError = require('../middlewares/rest').APIError;
const {query} = require('../middlewares/mysql.cfg.js');


var resetPassword = async (ctx, next) => {
    var
        accountNo = ctx.request.body.accountNo || '',
        password = ctx.request.body.password || '',
        rePassword = ctx.request.body.rePassword || '';

    console.log(`signin with name: ${accountNo}, password: ${password}`);

    async function resetPassword(accNum, pass) {
        let createUserSql = `update user_info_tab set password=? where account_no=?;`;
        let arr = [];
        arr.push(pass);
        arr.push(accNum);
        let dataList = await query(createUserSql, arr);
        return dataList;
    }
    async function respData() {
        if (accountNo != '') {
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(accountNo))) {
                ctx.rest({
                    code: 10014,
                    msg: '用户名不合法，请输入正确的用户名！'
                })
            } else {
                if (password == rePassword) {
                    let resetPwd = await resetPassword(accountNo, password);
                    console.log(`wtf${JSON.stringify(resetPwd)}`);
                    if (resetPwd.affectedRows > 0) {
                        console.log('密码修改成功！')
                        ctx.rest({
                            code: 10001,
                            msg: '密码修改成功！'
                        })
                    } else {
                        ctx.rest({
                            code: 10016,
                            msg: '密码修改失败！'
                        })
                    }
                } else {
                    ctx.rest({
                        code: 10015,
                        msg: `两次输入密码不同，请检查后重新输入！`
                    })
                }
            }
        } else {
            ctx.rest({
                code: 10017,
                msg: `用户名不能为空，请检查后重新输入！`
            })
        }
    }

    await respData();
};

module.exports = {
    'POST /note/resetPassword': resetPassword
};