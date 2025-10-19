import { Pet, Prisma } from "client/prisma";
import { randomUUID } from "crypto";
import { PetFilterOptions, PetRepository } from "../pets-repository";

export class InMemoryCreatePetsRepository implements PetRepository {

    public items: Pet[] = []

    async create(data: Prisma.PetCreateInput): Promise<Pet> {
        const pet: Pet = {
            id: data.id ?? randomUUID(),
            nome: data.nome,
            descricao: data.descricao ?? null,
            idade: data.idade,
            porte: data.porte,
            nivel_energia: data.nivel_energia,
            nivel_independencia: data.nivel_independencia,
            ambiente: data.ambiente ?? "",
            fotos: Array.isArray(data.fotos) ? data.fotos : [],
            requisitos: Array.isArray(data.requisitos) ? data.requisitos : [],
            orgId: "idOrg",
        }

        if (!pet.orgId) {
            throw new Error("Nenhuma org associada ao pet")
        }

        this.items.push(pet)

        return pet
    }


    findById(id: string): Promise<Pet | null> {
        throw new Error("Method not implemented")
    }

    async filterPets(options: PetFilterOptions): Promise<Pet[]> {
        return this.items.filter((pet) =>
            Object.entries(options).every(([key, value]) =>
                value == null || pet[key as keyof Pet] === value
            )
        );
    }
}