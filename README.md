* [noter2.0 接口说明](#noter2.0接口说明)
* [登录](#登录)
* [注册](#登录)
* [重置密码](#重置密码)
* [退出](#退出)
* [笔记列表](#笔记列表)
* [创建笔记](#创建笔记)
* [修改笔记内容](#修改笔记内容)
* [笔记预览](#笔记预览)
* [用户信息展示](#用户信息展示)
* [设置用户昵称](#设置用户昵称)
* [头像上传](#头像上传)

# noter2.0 接口说明

### 登录
```
    portName: 登录
```
```
    portDesc: 用户登录接口
```
```
    url: /note/login
```
```
    method: 'POST'
```
```
    params: {accountNo: '',password: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS',
                result: {
                    loginKey: loginKey
                }
            }
```
***
###

### 注册
```
    portName: 注册
```
```
    portDesc: 用户注册接口
```
```
    url: /note/registe
```
```
    method: 'POST'
```
```
    params: {accountNo: '', password: '', rePassword: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS'
            }
```
***
###


### 重置密码
```
    portName: 重置密码
```
```
    portDesc: 用户重置密码接口
```
```
    url: /note/resetPassword
```
```
    method: 'POST'
```
```
    params: {accountNo: '', password: '', rePassword: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS'
            }
```
***
###


### 退出
```
    portName: 退出
```
```
    portDesc: 用户退出接口
```
```
    url: /note/logout
```
```
    method: 'POST'
```
```
    params: {loginKey: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS'
            }
```
***
###


### 笔记列表
```
    portName: 笔记列表
```
```
    portDesc: 用户拉取所有笔记接口（分页）
```
```
    url: /note/notelist
```
```
    method: 'POST'
```
```
    params: {loginKey: '',page: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS',
                result: {
                    page: {
                              tottlePage:'',
                              currentPage: ''
                    },
                    resultList: [{
                        tittle: '',
                        time: '',
                        nid: ''
                    },{
                        tittle: '',
                        time: '',
                        nid: ''
                    },{
                        tittle: '',
                        time: '',
                        nid: ''
                    }]
                }
            }
```
***
###


### 创建笔记
```
    portName: 创建笔记
```
```
    portDesc: 用户创建笔记接口
```
```
    url: /note/createNote
```
```
    method: 'POST'
```
```
    params: {loginKey: '',tittle: '', content: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS',
                result: {
                    nid: ''
                }
            }
```
***
###


### 修改笔记内容
```
    portName: 修改笔记内容
```
```
    portDesc: 用户修改笔记内容接口
```
```
    url: /note/editDetail
```
```
    method: 'POST'
```
```
    params: {loginKey: '', nid: '', tittle: '', content: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS'
            }
```
***
###


### 笔记预览
```
    portName: 笔记预览
```
```
    portDesc: 用户预览相应笔记接口
```
```
    url: /note/notedetail
```
```
    method: 'POST'
```
```
    params: {loginKey: '',nid: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS',
                result: {
                    tittle: '',
                    content: ''
                }
            }
```
***
###


### 用户信息展示
```
    portName: 用户信息展示接口
```
```
    portDesc: 用户个人信息展示接口
```
```
    url: /note/userInfo
```
```
    method: 'POST'
```
```
    params: {loginKey: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS',
                result: {
                    headImg: '',
                    nickName: ''
                }
            }
```
***
###


### 设置用户昵称
```
    portName: 设置用户昵称
```
```
    portDesc: 用户设置或修改用户昵称接口
```
```
    url: /note/setNickName
```
```
    method: 'POST'
```
```
    params: {loginKey: '', nickName: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS'
            }
```
***
###


### 头像上传
```
    portName: 头像上传
```
```
    portDesc: 用户头像上传接口
```
```
    url: /note/uploadImg
```
```
    method: 'POST'
```
```
    params: {loginKey: ''}
```
``` 
    result:
            {
                code: 10001,
                msg: 'SUCCESS',
                result: {
                    url: ''
                }
            }
```
***
###
