// frunção que verifica se o req recebido é de um admin ou não
export const onlyAdmin = (req, res, next) => {
    try {
        if (req.user.type.toLowerCase() !== 'admin') {
            const error = new Error('This feature is restricted to admins.')
            error.status = 403
            throw error
        }
    } catch (error) {
        const err = new Error(error.message)
        err.status = error.status || 500
        return next(err)
    }
}
