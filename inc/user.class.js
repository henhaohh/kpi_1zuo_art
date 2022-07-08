/**
 * 用户表
 * 
 */
/*
CREATE TABLE `hh_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码sha256',
  `gender` tinyint DEFAULT '0' COMMENT '性别',
  `nickname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '昵称',
  `realname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '真实姓名',
  `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '手机号',
  `group` tinyint DEFAULT NULL COMMENT '用户组',
  `company` int DEFAULT NULL COMMENT '公司',
  `department` int DEFAULT NULL COMMENT '部门',
  `position` int DEFAULT NULL COMMENT '职位',
  `state` tinyint DEFAULT '0' COMMENT '状态，0限制，1正常，2封禁',
  `salt` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '盐，用于密码加密的密钥',
  `addtime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `updatetime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `hh_user_un` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';
*/
const path = require('path');
const { db, DB } = require(path.resolve(__dirname, './'));
const { cryptPassword } = require(path.resolve(__dirname, 'util'));

// 表名
const TABLENAME = 'hh_user';
// 白名单字段
const WHITELIST = [`id`, `name`, `password`, `gender`, `nickname`, `realname`, `mobile`, `group`, `company`, `department`, `position`, `state`, `salt`];
const pool = db.promise();
// 获取
let get = ({ id = 0, page = 1, pagesize = 20 }) => {
    return pool.query("SELECT * FROM ??.?? WHERE ?? = ? LIMIT ?,?", [DB.database, TABLENAME, 'id', id, (page - 1) * pagesize, pagesize]);
}
// 添加
let add = (prop = {}) => {
    for (let x in prop) {
        if (!WHITELIST.includes(x)) {
            delete prop[x]
        }
    }
    let salt = Date.now().toString(36);
    if (prop.password) {
        prop.password = cryptPassword(prop.password, salt);
    }
    prop = {
        salt,
        password: cryptPassword('123456', salt), // 默认密码123456
        ...prop
    }
    return pool.query("INSERT INTO ??.?? SET ?", [DB.database, TABLENAME, prop]);
}
// 移除
let remove = id => {
    if (!Array.isArray(id)) {
        id = [id];
    }
    return pool.query("DELETE FROM ??.?? WHERE `id` in (" + id.join(',') + ")", [DB.database, TABLENAME]);
}
// 修改
let update = (prop = {}) => {
    for (let x in prop) {
        if (!WHITELIST.includes(x)) {
            delete prop[x]
        }
    }
    if (!prop.id) return Promise.reject('NO ID');
    return get({ id: prop.id })
        .then(r => r[0])
        .then(r => r[0])
        .then(r => {
            if (r.salt) {
                let salt = r.salt;
                if (prop.password) {
                    prop.password = cryptPassword(prop.password, salt);
                }
                if (prop.id) {
                    delete prop.id
                }
                return pool.query("UPDATE ??.?? SET ? WHERE ?? = ?", [DB.database, TABLENAME, prop, 'id', r.id]);
            } else {
                return Promise.reject('NO Salt');
            }
        })
}
module.exports = {
    TABLENAME,
    get,
    add,
    remove,
    update,
    db
}