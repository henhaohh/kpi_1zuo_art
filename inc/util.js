const crypto = require('node:crypto');
const _ = require('lodash');
// SQL工具函数
/**
 * 参数过滤，仅从允许的白名单中获取
 * @param {* Object} query  请求参数
 * @param {* Array} whiteList 白名单，字段名
 * @returns Object
 */
function sql_buildSafeQuery(query = {}, whiteList = []) {
    let _keys = Object.keys(query);
    let keys = _.intersectionWith(_keys, whiteList)
    let ret = {}
    keys.forEach(v => {
        ret[v] = decodeURIComponent(query[v])
    });
    return ret;
}
/**
 * 将请求参数变成连接字符串，用and连接
 * @param {* Object} query 请求参数
 * @returns String
 */
function sql_build_query(query = {}) {
    let qs = [];
    for (let x in query) {
        qs.push('`' + x + "` = '" + encodeURIComponent(query[x]) + "'");
    }
    let _qs = qs.join(' AND ');
    return _qs || '1'
}
/**
 * 设置请求限制
 * @param {* Object} query 请求参数，判断是否待limit参数
 * @param {String} limit sql限制参数，形式样例:100  或 20,100
 * @returns 
 */
function sql_limit(query = {}, limit) {
    if (!query.limit && limit) {
        query.limit = limit
    }
    return query.limit ? ' LIMIT ' + query.limit : ''
}
/**
 * 对密码加密
 * @param {* String} password 密码原文
 * @param {* String} secret 盐
 * @returns String 返回加密后的密码
 */
function cryptPassword(password = "", secret = "") {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}
/**
 * 创建随机字符串
 * @param {Number} length 长度
 * @param {String} chars 字符表
 * @returns 返回指定长度的随机字符串
 */
function createNonceStr(length = 16, chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
    let $str = "";
    for (let i = 0; i < length; i++) {
        $str += chars.substr(Math.floor(Math.random() * (chars.length - 1)), 1);
    }
    return $str;
}
// 字符取反
function axorb(str) {
    return String(str).split('').map(v => String.fromCharCode(v.charCodeAt() ^ 0xff)).join('');
    /* str = str + '';
    let arr = str.split('');
    let brr = arr.map(v => v.charCodeAt() ^ 0xff);
    return brr.map(v => String.fromCharCode(v)).join('') */
}
/**
 * 很好加密解密
 */
const hh_cypto = {
    /**
     * 字符取反
     * @param {String} str 取反的字符
     * @returns String
     */
    axorb: function (str = '') { return String(str).split('').map(v => String.fromCharCode(v.charCodeAt() ^ 0xff)).join('') },
    /**
     * 加密
     * @param {String} str 需要加密的字符串
     * @returns String
     */
    encode: function (str = '') { return Buffer.from(this.axorb(str), 'utf8').toString('base64') },
    /**
     * 解密
     * @param {String} str 需要解密的字符串
     * @returns String
     */
    decode: function (str = '') { return this.axorb(Buffer.from(str, 'base64').toString()) }
}
module.exports = {
    sql_buildSafeQuery,
    sql_build_query,
    sql_limit,
    cryptPassword,
    createNonceStr,
    axorb,
    hh_cypto
}