import { Prisma, Pet } from "client/prisma";
import { PetRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async findByManyId(id: string): Promise<Pet[]> {
        const petFilterByOrg = await prisma.pet.findMany({
            where: {
                orgId: id
            }
        })

        return petFilterByOrg
    }

    async findById(id: string): Promise<Pet | null> {
        const searchPetById = await prisma.pet.findUnique({
            where: {
                id: id
            }
        })

        return searchPetById
    }
}