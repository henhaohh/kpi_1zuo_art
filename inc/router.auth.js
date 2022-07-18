const path = require('path')
const { db, DB } = require(path.resolve(__dirname, './'));
const pool = db.promise();
const { hh_cypto } = require(path.resolve(__dirname, 'util'));
async function auth(req, res, next) {
    const routes = ['/user/remove', '/user/update']; // 普通需要认证的路由
    const adminRoutes = ['/user/remove', '/user/add']; // 需要管理员认证的路由,也就是说必须管理员登录才能操作
    const { path, headers } = req;
    // 请求头必须要带这个参数:authentication
    req.authentication = headers['authentication'];
    // 都要认证的路由
    if ([...routes, ...adminRoutes].includes(path)) {
        if (!req.authentication) {
            return res.status(401).json({
                code: 401,
                message: '认证失败'
            });
        }
        // 解码token
        // uid ： 用户id，expiration: 到期时间
        let [uid, expiration] = hh_cypto.decode(req.authentication).split('|');
        // 认证到期
        if(expiration.length !== 13){
            return res.status(401).json({
                code: 401,
                message: '非法访问'
            });
        }
        // 如果到期时间大于系统现在的时间，则过期
        if (!Number(expiration) || Number(expiration) < Date.now()) {
            return res.status(401).json({
                code: 401,
                message: '认证过期'
            });
        }
        // 认证普通路由
        if (routes.includes(path)) {
            // TODO
        }
        // 认证管理员路由
        if (adminRoutes.includes(path)) {
            // 获取用户编号对应的用户组，这里管理员组的id为2
            // 只有管理员才有资格
            let rows = await pool.query("select hu.id from hh_user hu left join hh_setting hs on hs.id = hu.`group` where hu.`id` = ? and hu.state = 1 and hs.state = 1 and hs.id = 2 limit 1", [Number(uid)]).catch(e => {
                return res.json({
                    code: e.errno,
                    message: e.code
                });
            });
            // 不是管理员
            if (!rows[0].length) {
                return res.status(401).json({
                    code: 401,
                    message: '你无权操作'
                });
            }
        }
    }
    // console.log({ path, headers })
    next();
}
module.exports = {
    auth
}