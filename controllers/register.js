const APIError = require('../middlewares/rest').APIError;
const {query} = require('../middlewares/mysql.cfg.js');


var register = async (ctx, next) => {
    var
        accountNo = ctx.request.body.accountNo || '',
        password = ctx.request.body.password || '',
        rePassword = ctx.request.body.rePassword || '';

    console.log(`signin with name: ${accountNo}, password: ${password}`);

    async function selectPerson(accNum) {
        let searchSql = `select * from user_info_tab where account_no = ?;`;
        let arr = [accNum];
        let dataList = await query(searchSql, arr);
        return dataList;
    }
    async function createPerson(accNum, pass) {
        let createUserSql = `insert into user_info_tab (account_no,password) values (?,?);`;
        let arr = [accNum, pass];
        let dataList = await query(createUserSql);
        return dataList;
    }
    async function respData() {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(accountNo))) {
            ctx.rest({
                code: 10014,
                msg: '用户名不合法，请输入正确的用户名！'
            })
        } else {
            if (password == rePassword) {
                let dataList = await selectPerson(accountNo);
                console.log(`wtf${JSON.stringify(dataList)}`);
                if (dataList.length > 0) {
                    console.log('用户已存在！')
                    ctx.rest({
                        code: 10013,
                        msg: '用户已存在，请重新注册！'
                    })
                } else {
                    let data = await createPerson(accountNo, password);
                    console.log('创建用户成功！');
                    console.log(data)
                    if (data.affectedRows == 1) {
                        ctx.rest({
                            code: 10001,
                            msg: 'SUCCESS,恭喜你，注册成功！'
                        })
                    } else {
                        ctx.rest({
                            code: 10031,
                            msg: `数据库错误:${data.info}！`
                        })
                    }
                }
            } else {
                ctx.rest({
                    code: 10015,
                    msg: `两次输入密码不同，请检查后重新输入！`
                })
            }
        }
    }
    await respData();
};

module.exports = {
    'POST /note/registe': register
};