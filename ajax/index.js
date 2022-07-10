const fs = require('fs')
const path = require('path')
const routePath = path.resolve(__dirname, './')

const { auth } = require(path.resolve(__dirname, "../", "inc", "router.auth"))

const express = require('express');
const router = express.Router();


router.use(auth);

fs.readdirSync(routePath).forEach(function (name) {
    if (path.extname(name) !== '') {
        name = path.basename(name, '.js')
        if (name !== 'index') {
            router.use('/' + name, require(path.resolve(routePath, name)))
        }
    }
})

module.exports = router
