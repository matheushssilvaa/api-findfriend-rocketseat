import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-respository";
import { RegisterPet } from "@/use-cases/register-pet";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
    const registerOrgBodySchema = z.object({
        nome: z.string(),
        descricao: z.string(),
        idade: z.string(),
        porte: z.string(),
        nivel_energia: z.string(),
        nivel_independencia: z.string(),
        ambiente: z.string(),
        fotos: z.string().array(),
        requisitos: z.string().array(),
        orgId: z.string()
    })

    const {
        nome,
        descricao,
        idade,
        porte,
        nivel_energia,
        nivel_independencia,
        ambiente,
        fotos,
        requisitos,
        orgId
    } = registerOrgBodySchema.parse(request.body)

    try {
        const repository = new PrismaPetRepository()
        const orgUseCase = new RegisterPet(repository)

        await orgUseCase.execute({
            nome,
            descricao,
            idade,
            porte,
            nivel_energia,
            nivel_independencia,
            ambiente,
            fotos: fotos ?? [],
            requisitos: requisitos ?? [],
            orgId
        })
    } catch (err) {
        throw new Error(`Ocorreu um erro, tente novamente ${err}`)
    }

    return reply.status(201).send()
}