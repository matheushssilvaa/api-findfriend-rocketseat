import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-respository";
import { GetPetByIdUseCase } from "@/use-cases/get-pet-by-id";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function findPetById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.uuid()
    });

    try {
        const { id } = paramsSchema.parse(request.params);

        const repository = new PrismaPetRepository();
        const petUseCase = new GetPetByIdUseCase(repository);

        const { pet } = await petUseCase.execute({ id: id });

        if (!pet) {
            return reply.status(404).send({ message: "Nenhum pet encontrado" });
        }

        return reply.status(200).send({ pet });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return reply.status(400).send({ message: "O ID é obrigatorio" });
        }

        console.error(err);
        return reply.status(500).send({ message: "Internal server error" });
    }
}
