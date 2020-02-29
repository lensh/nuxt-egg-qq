module.exports = ({ app }) => {
    return async function verify(ctx, next) {
        const authorization = ctx.request.header.authorization;
        if (!authorization) {
            await next()
            return;
        }
        try {
            const token = authorization.replace("Bearer ", "")
            let ret = await app.jwt.verify(token, app.config.jwt.secret)
            await next()
        } catch (err) {
            console.log([err])
            if (err.name == "TokenExpiredError") {
                return ctx.body = {
                    code: -666,
                    message: 'token过期'
                }
            }
        }
    }
}