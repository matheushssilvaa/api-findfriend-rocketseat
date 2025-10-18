import { Pet, Prisma } from "client/prisma";
import { randomUUID } from "crypto";
import { PetRepository } from "../pets-repository";

export class InMemoryCreatePetsRepository implements PetRepository {

    public items: Pet[] = []

    async create(data: Prisma.PetCreateInput): Promise<Pet> {
        const pet = {
            id: data.id ?? randomUUID(),
            nome: "PET 01",
            descricao: null,
            idade: "adulto",
            porte: "pequeno",
            nivel_energia: "alto",
            nivel_independencia: "baixo",
            ambiente: "",
            fotos: [],
            requisitos: [],
            orgId: "idOrg",
        }

        if(pet.orgId == null) {
            throw new Error("Nenhuma org associada ao pet")
        }

        this.items.push(pet)

        return pet
    }

    findById(id: string): Promise<Pet | null> {
        throw new Error("Method not implemented")
    }

    findByManyId(id: string): Promise<Pet[] | null> {
        throw new Error("Method not implemented")
    }
}