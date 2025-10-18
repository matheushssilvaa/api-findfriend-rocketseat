import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { SearchPetsUseCase } from "@/use-cases/search-pet-city";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function searchPetByCity(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        cidade: z.string().min(1, "A cidade é obrigatória"),
    });

    try {
        const { cidade } = paramsSchema.parse(request.params);

        const repository = new PrismaOrgRepository();
        const petUseCase = new SearchPetsUseCase(repository);

        const { pets } = await petUseCase.execute({ param: cidade });

        if (!pets || pets.length === 0) {
            return reply.status(404).send({ message: "Nenhum pet encontrado para essa localidade" });
        }

        return reply.status(200).send({ pets });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return reply.status(400).send({ message: "A cidade é obrigatória" });
        }

        console.error(err);
        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
