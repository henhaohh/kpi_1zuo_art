const mysql = require('mysql2');
var s = {
    q: 1,
    a: "sd",
    b: false,
    n: null,
    t: new Date('2022-04-01')
}
let whereStr = mysql.format("?", [s]).replace(/,/g, ' and ');
console.log(mysql.format("select * from ?? where "+ whereStr, ['users']))