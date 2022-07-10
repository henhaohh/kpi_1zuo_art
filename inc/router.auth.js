const path = require('path')
const { db, DB } = require(path.resolve(__dirname, './'));
const pool = db.promise();
async function auth(req, res, next) {
    const routes = ['/user/remove','/user/update']; // 普通需要认证的路由
    const adminRoutes = ['/user/remove','/user/add']; // 需要管理员认证的路由,也就是说必须管理员登录才能操作
    const { path, headers } = req;
    // 请求头必须要带这个参数:authentication
    req.authentication = headers['authentication'];
    // 认证普通路由
    if (routes.includes(path)) {
        if (!req.authentication) {
            return res.status(401).json({
                code: 401,
                message: '认证失败'
            });
        }
    }
    // 认证管理员路由
    if (adminRoutes.includes(path)) {
        // 从登录日志中找到15天内离当前日期最近一次登录的token
        // 然后获取用户编号对应的用户组，这里管理员组的id为2
        // 只有管理员才有资格
        let rows = await pool.query("select hl.id from hh_loginlog hl left join hh_user hu on hl.uid = hu.id left join hh_setting hs on hs.id = hu.`group` where hl.`token` = ? and hu.state = 1 and hs.state = 1 and hs.id = 2 and timestampdiff(SECOND,hl.addtime ,CURRENT_TIME()) > 86400 * 15 order BY hl.addtime desc limit 1", [req.authentication]).catch(e => {
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
    // console.log({ path, headers })
    next();
}
module.exports = {
    auth
}