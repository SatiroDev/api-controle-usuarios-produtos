// tests/users.test.js
import request from 'supertest'
import app from '../index.js'

describe('Rotas de Usuário', () => {
  it('POST /register deve retornar 201 ao registrar um usuário válido', async () => {
    const res = await request(app).post('/register').send({
      name: 'teste123',
      password: '1234',
      type: 'user'
    })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('message') // exemplo
  })

  it('POST /login deve retornar 200 com token ao fazer login válido', async () => {
    const res = await request(app).post('/login').send({
      name: 'teste123',
      password: '1234'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token') // supondo que você retorne um JWT
  })
})
