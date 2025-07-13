// frunção que verifica se o req recebido é de um admin ou não
export const onlyAdmin = (req, res, next) => {
    if (req.user.type.toLowerCase() !== 'admin') {
        const error = new Error('This feature is restricted to admins.')
        error.status = 403
        return next(error)
    }
    next()
}
