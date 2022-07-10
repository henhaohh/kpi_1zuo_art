const mysql = require('mysql2');
var id = '1,2,3,4,5'
id = String(id).split(',').map(v=>Number(v.trim()));
console.log(mysql.format("select * from abc where ?? in (?)",["id",id]))