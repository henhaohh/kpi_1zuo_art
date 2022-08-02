const path = require('path');
const express = require('express');
const router = express.Router();
const USER = require(path.resolve(__dirname, '../', 'inc', 'user.class'));
const { cryptPassword, hh_cypto } = require(path.resolve(__dirname, '../', 'inc', 'util'));


/**
 * 获取
 */
router.get("/get", (req, res) => {
    let ret = {};
    let { id } = req.query;
    if (!id) {
        return res.status(500).json({
            code: 500,
            message: '参数缺失'
        });
    }
    USER.get({ id })
        .then((rows, fields) => {
            ret.code = 1;
            ret.message = 'OK';
            ret.data = rows[0];
            return res.json(ret);
        }).catch(e => {
            return res.json({
                code: e.errno,
                message: e.code
            });
        })
});
/**
 * 添加
 * 
 * 前端示例 
 * fetch('/ajax/user/add',{
        method:"POST",
        body:JSON.stringify({
            name:"我是谁2",
            password:"select 1"
        }),
        headers: {
        'Accept': 'www-form-urlencoded',
        'Content-Type': 'application/json',
      },
    })
    .then(r=>r.json())
    .then(r=>{
        console.log(r)
    });
 */
router.post('/add', (req, res) => {
    let ret = {};
    let query = req.body;
    if (!query.name || !query.password) {
        return res.status(500).json({
            code: 500,
            message: '参数缺失'
        });
    }
    USER.add({
        name: query.name,
        password: query.password
    }).then((rows, fields) => {
        ret.code = 1;
        ret.message = 'OK';
        ret.data = rows[0];
        return res.json(ret);
    }).catch(e => {
        return res.json({
            code: e.errno,
            message: e.code
        });
    })
});
/**
 * 移除
 * fetch('/ajax/user/remove',{
        method:"POST",
        body:JSON.stringify({
            id:9
        }),
        headers: {
        'Accept': 'www-form-urlencoded',
        'Content-Type': 'application/json',
            "authentication":"49a2d00fadb9ec65a000d68631075aa9f559f9fa165ccad9ca824565e11ba013"
      },
    })
    .then(r=>r.json())
    .then(r=>{
        console.log(r)
    });
 */
router.post('/remove', (req, res) => {
    let ret = {};
    let { id } = req.body;
    if (!id) {
        return res.status(500).json({
            code: 500,
            message: '参数缺失'
        });
    }
    USER.remove(id)
        .then((rows, fields) => {
            ret.code = 1;
            ret.message = 'OK';
            ret.data = rows[0];
            return res.json(ret);
        }).catch(e => {
            return res.json({
                code: e.errno,
                message: e.code
            });
        })
});
/**
 * 修改
 * fetch('/ajax/user/update',{
        method:"POST",
        body:JSON.stringify({
            id:10,
            gender:2
        }),
        headers: {
        'Accept': 'www-form-urlencoded',
        'Content-Type': 'application/json',
            "Authentication":"49a2d00fadb9ec65a000d68631075aa9f559f9fa165ccad9ca824565e11ba013"
      },
    })
    .then(r=>r.json())
    .then(r=>{
        console.log(r)
    });
 */
router.post('/update', (req, res) => {
    let ret = {};
    let { id } = req.body;
    if (!id) {
        return res.status(500).json({
            code: 500,
            message: '参数缺失'
        });
    }
    let query = req.body;
    USER.update({ id, ...query })
        .then((rows, fields) => {
            ret.code = 1;
            ret.message = 'OK';
            ret.data = rows[0];
            return res.json(ret);
        }).catch(e => {
            return res.json({
                code: e.errno,
                message: e.code
            });
        })
});
/**
 * 登陆
 * fetch('/ajax/user/login',{
        method:"POST",
        body:JSON.stringify({
            name:"我是谁2",
            password:"select1"
        }),
        headers: {
        'Accept': 'www-form-urlencoded',
        'Content-Type': 'application/json',
      },
    })
    .then(r=>r.json())
    .then(r=>{
        console.log(r)
    });
 */
router.post('/login', (req, res) => {
    let ret = {};
    let { name, password } = req.body;
    if (!name || !password) {
        return res.status(500).json({
            code: 500,
            message: '参数缺失'
        });
    }
    // 找到用户名对应的用户信息
    USER.db.promise().query("SELECT * FROM ?? WHERE `name` = ? limit 1", [USER.TABLENAME, name])
        .then((rows, fields) => {
            // 如果有这个用户的话
            if (rows[0].length) {
                // 用户取第一个
                let userInfo = rows[0][0];
                // 验证密码
                if (userInfo.password === cryptPassword(password, userInfo.salt)) {
                    // 得到ip地址
                    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    if (ip.substr(0, 7) == "::ffff:") {
                        ip = ip.substr(7)
                    }
                    // 我这里token的算法是用户id|到期时间，如：35|1658132116819
                    // 默认15天
                    let token = hh_cypto.encode(userInfo.id + '|' + String(Date.now() + 86400 * 15 * 1e3));
                    // 添加登陆日志
                    USER.db.promise().query("INSERT INTO ?? SET ?", ["hh_loginlog", {
                        uid: userInfo['id'],
                        ua: req.headers['user-agent'],
                        ip,
                        token
                    }]);
                    ret.code = 1;
                    ret.message = 'OK';
                    ret.data = { token, ...userInfo };
                    return res.json(ret);
                } else {
                    ret.code = 0;
                    ret.message = '密码错误';
                    return res.json(ret);
                }

            } else {
                ret.code = 0;
                ret.message = '无此用户';
                return res.json(ret);
            }

        }).catch(e => {
            return res.json({
                code: e.errno,
                message: e.code
            });
        });
});
module.exports = router;