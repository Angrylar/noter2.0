# noter2.0 接口说明

###

    portName: 登录

    portDesc: 用户登录接口

    url: /note/login

    method: 'POST'

    params: {accountNo: '',password: ''}
    
    result:
            {
                code: 10001,
                msg: 'SUCCESS',
                result: {
                    loginKey: loginKey
                }
            }

***
