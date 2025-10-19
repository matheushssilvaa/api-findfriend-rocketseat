import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-respository";
import { PetFilter } from "@/use-cases/pet-filter";
import { FastifyReply, FastifyRequest } from "fastify";
import z, { optional } from "zod";

export async function filterPets(request: FastifyRequest, reply: FastifyReply) {
    const filterParamsPetSchema = z.object({
        idade: z.string().nullable().optional(),
        nivel_energia: z.string().nullable().optional(),
        porte: z.string().nullable().optional(),
        nivel_independencia: z.string().nullable().optional()
    })

    const {
        idade,
        nivel_energia,
        porte,
        nivel_independencia } = filterParamsPetSchema.parse(request.query)

    try {
        const repository = new PrismaPetRepository()
        const useCase = new PetFilter(repository)

        const pets = await useCase.execute({
            idade,
            nivel_energia,
            porte,
            nivel_independencia
        })

        reply.status(200).send({ pets })
    } catch(err) {
        if(err instanceof z.ZodError) {
            reply.status(400).send({ message: "ocorreu um erro, tente novamente", err })
        }

        reply.status(500).send({ message: "Internal server error" })
    }
}