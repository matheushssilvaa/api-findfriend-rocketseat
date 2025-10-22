import { Prisma, Pet } from "client/prisma";
import { PetFilterOptions, PetRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async findById(id: string): Promise<Pet | null> {
        const searchPetById = await prisma.pet.findUnique({
            where: {
                id: id
            }
        })

        return searchPetById
    }

    async filterPets(data: PetFilterOptions): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                idade: data.idade ?? undefined,
                nivel_energia: data.nivel_energia ?? undefined,
                porte: data.porte ?? undefined,
                nivel_independencia: data.nivel_independencia ?? undefined
            }
        })

        return pets
    }
}