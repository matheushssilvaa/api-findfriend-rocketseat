import { Pet, Prisma } from "client/prisma";

export interface PetRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>
    findByManyId(id: string): Promise<Pet[] | null>
    findById(id: string): Promise<Pet | null>
}