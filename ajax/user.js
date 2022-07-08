const path = require('path');
const express = require('express');
const router = express.Router();
const USER = require(path.resolve(__dirname, '../', 'inc', 'user.class'));
const { cryptPassword } = require(path.resolve(__dirname, '../', 'inc', 'util'));
/**
 * 获取
 */
router.get("/get/:id", (req, res) => {
    let ret = {};
    let { id } = req.params;
    if (!id) {
        return res.status(500).json({
            code: 500,
            message: 'MISS PARAMS'
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
            message: 'MISS PARAMS'
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
 */
router.post('/remove/:id', (req, res) => {
    let ret = {};
    let { id } = req.params;
    if (!id) {
        return res.status(500).json({
            code: 500,
            message: 'MISS PARAMS'
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
 */
router.post('/update/:id', (req, res) => {
    let ret = {};
    let { id } = req.params;
    if (!id) {
        return res.status(500).json({
            code: 500,
            message: 'MISS PARAMS'
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
 */
router.post('/login/:id', (req, res) => {
    let ret = {};
    let { id } = req.params;
    let { password } = req.body;
    if (!id || !password) {
        return res.status(500).json({
            code: 500,
            message: 'MISS PARAMS'
        });
    }
    USER.db.promise().query("SELECT * FROM ?? WHERE `id` = ? limit 1", [USER.TABLENAME, id])
        .then((rows, fields) => {
            if (rows[0].length) {
                let userInfo = rows[0][0];
                if (userInfo.password === cryptPassword(password, userInfo.salt)) {
                    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    if (ip.substr(0, 7) == "::ffff:") {
                        ip = ip.substr(7)
                    }
                    USER.db.promise().query("INSERT INTO ?? SET ?", ["hh_loginlog", {
                        uid: id,
                        ua: req.headers['user-agent'],
                        ip,
                        token: cryptPassword()
                    }]);
                    ret.code = 1;
                    ret.message = 'OK';
                    ret.data = userInfo;
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