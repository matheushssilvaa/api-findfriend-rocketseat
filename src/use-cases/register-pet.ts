import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-respository";
import { Pet } from "client/prisma";

interface CreatePetUseCaseRequest {
    nome: string;
    descricao?: string | null;
    idade: string;
    porte: string;
    nivel_energia: string;
    nivel_independencia: string;
    ambiente?: string | null;
    fotos?: string[] | null;
    requisitos?: string[] | null;
    orgId: string;
}

interface CreatePetUseCaseResponse {
    pet: Pet;
}

export class RegisterPet {
    constructor(private petRepository: PrismaPetRepository) { }

    async execute({
        nome,
        descricao,
        idade,
        porte,
        nivel_energia,
        nivel_independencia,
        fotos,
        requisitos,
        ambiente,
        orgId,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const pet = await this.petRepository.create({
            nome,
            descricao,
            idade,
            porte,
            nivel_energia,
            nivel_independencia,
            fotos: fotos ?? [],
            requisitos: requisitos ?? [],
            ambiente,
            org: {
                connect: { id: orgId },
            },
        });

        return { pet };
    }
}
