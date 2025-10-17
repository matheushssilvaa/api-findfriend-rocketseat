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
}