import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { Authenticate } from "@/use-cases/authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.email(),
        senha: z.string().min(6),
    })

    const { email, senha } = authenticateBodySchema.parse(request.body)

    try {
        const repository = new PrismaOrgRepository()
        const authenticateOrgUseCase = new Authenticate(repository)

        const { org } = await authenticateOrgUseCase.execute({
            email,
            senha
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: org?.id
            }
        })

        return reply.setCookie('token', token, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        })
            .status(200)
            .send({
                token
            })
    } catch (err: any) {
        return reply.status(400).send({ message: err.message })
    }
}