
export const middlewareErro = (err, req, res, next) => {
    console.error('Erro capturado', err)

    const status = err.status || 500
    const message = err.message
    res.status(status).json({
        erro: true,
        message
    })
}