import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const senhaHash = await hash("123456", 6)

  const org = await prisma.org.create({
    data: {
      responsavel: "ORG para criar pet",
      email: "orgpet99@domain.org",
      endereco: "Rua Z, Cidade",
      whatsapp: "16977777",
      senha: senhaHash,
    },
  })

  const authResponse = await request(app.server).post('/org/signin').send({
    email: 'orgpet99@domain.org',
    senha: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    orgId: org.id,
  }
}
