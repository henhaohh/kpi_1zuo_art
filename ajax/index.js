const fs = require('fs')
const path = require('path')
const routePath = path.resolve(__dirname, './')

const express = require('express');
const router = express.Router();
router.all("*", (req, res, next) => {
    res.header('Content-Type', "application/json");
    next();
});
fs.readdirSync(routePath).forEach(function (name) {
    if (path.extname(name) !== '') {
        name = path.basename(name, '.js')
        if (name !== 'index') {
            router.use('/' + name, require(path.resolve(routePath, name)))
        }
    }
})

module.exports = router
