const fs = require('fs')
const path = require('path');
const mysql = require('mysql2');
let content = fs.readFileSync(path.resolve(__dirname, 'config.json'));
let setting = JSON.parse(content);
/* {
    "host": "localhost",
    "user": "root",
    "password": "123456",
    "database": "onezuo",
    "waitForConnections": true,
    "connectionLimit": 10,
    "queueLimit": 0,
    "port": 3306,
    "connectTimeout": 1e4,
    "debug": false
} */
/* {
    "host": "101.132.81.177",
    "user": "kpi_1zuo_art",
    "password": "38dXzfR5mLjxBxit",
    "database": "kpi_1zuo_art",
    "waitForConnections": true,
    "connectionLimit": 10,
    "queueLimit": 0,
    "port": 3306,
    "connectTimeout": 1e4,
    "debug": false
} */

setting.db = mysql.createPool({
    isServer:false,
    ...setting.DB
});
setting.dirs = {
    ROOT : path.resolve(__dirname,"../"),
    INC : __dirname,
    AJAX : path.resolve(__dirname,"../",'ajax'),
}
module.exports = setting;