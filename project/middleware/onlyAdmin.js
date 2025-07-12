// frunção que verifica se o req recebido é de um admin ou não
export const onlyAdmin = (req, res, next) => {
    if (req.user.type.toLowerCase() !== 'admin') {
        return res.status(403).json({
            status: 'Failure',
            message: 'This feature is restricted to admins.'
        })
    }
    next()
}
