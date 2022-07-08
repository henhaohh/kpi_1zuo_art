const express = require('express')
const cookieParser = require('cookie-parser');
const compression = require('compression');
const app = express();
const { site, author } = require('./inc')

app.all('*', function (req, res, next) {
    res.header('X-Server-By', 'NodeJS'); //自定义头信息，表示服务端用nodejs
    res.header('X-Powered-By', author.name); //自定义头信息，表示版权信息用henhao
    next();
});
// 设置一下跨域
app.all('*', function (req, res, next) {
    let u = req.protocol + "://" + req.hostname
    if (req.hostname.endsWith(site.domain)) {
        res.header("access-control-allow-origin", u);
        res.header("access-control-allow-methods", 'GET,POST,OPTIONS');
        res.header("access-control-max-age", 2592000);
    }
    next();
});
// 开启gzip
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/ajax', require('./ajax/index'));
app.listen(3000)