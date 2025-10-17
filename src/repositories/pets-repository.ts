import { Pet, Prisma } from "client/prisma";

export interface PetRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>
}