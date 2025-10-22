import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { RegisterOrg } from "../../../use-cases/register-org";
import { hash } from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
    const registerOrgBodySchema = z.object({
        responsavel: z.string(),
        email: z.string(),
        endereco: z.string(),
        whatsapp: z.string(),
        senha: z.string()
    })

    const {
        responsavel,
        email,
        endereco,
        whatsapp,
        senha
    } = registerOrgBodySchema.parse(request.body)

    const hashPassword = await hash(senha, 6)

    try {
        const repository = new PrismaOrgRepository()
        const orgUseCase = new RegisterOrg(repository)

        await orgUseCase.execute({
            responsavel,
            email,
            endereco,
            whatsapp,
            senha: hashPassword
        })
    } catch (err) {
        throw new Error(`Ocorreu um erro, tente novamente ${err}`)
    }

    return reply.status(201).send()
}