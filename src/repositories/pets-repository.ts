import { Pet, Prisma } from "client/prisma";

export interface PetFilterOptions {
    idade?: string | null;
    nivel_energia?: string | null;
    porte?: string | null;
    nivel_independencia?: string | null;
}

export interface PetRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>
    findById(id: string): Promise<Pet | null>
    filterPets(data: PetFilterOptions): Promise<Pet[]>
}