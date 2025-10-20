import { PrismaPetRepository } from "@/repositories/prisma/prisma-pets-respository";
import { Pet } from "client/prisma";
import { ErrorNotFoundPet } from "./errors/Error-not-found-pet";

interface PetFilterRequest {
    idade: string | null | undefined,
    nivel_energia: string | null | undefined,
    porte: string | null | undefined,
    nivel_independencia: string | null | undefined
}

interface PetFilterResponse {
    pets: Pet[],
    total: number
}

export class PetFilter {

    constructor(private petRepository: PrismaPetRepository) { }

    async execute({
        idade,
        nivel_energia,
        porte,
        nivel_independencia
    }: PetFilterRequest): Promise<PetFilterResponse> {

        const pets = await this.petRepository.filterPets({
            idade,
            nivel_energia,
            porte,
            nivel_independencia
        })

        if (pets.length == 0) {
            throw new ErrorNotFoundPet()
        }

        const results = pets.length

        return {
            pets,
            total: results
        }
    }
}