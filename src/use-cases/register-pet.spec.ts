import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryCreatePetsRepository } from "../repositories/in-memory/in-memory-create-pets-repository";
import { RegisterPet } from "./register-pet";

let repository: InMemoryCreatePetsRepository
let sut: RegisterPet

describe("Cadastro de pets", () => {

    beforeEach(() => {
        repository = new InMemoryCreatePetsRepository()
        sut = new RegisterPet(repository)
    })

    it("deve ser possivel cadastrar um pet associado a uma org", async () => {
        const { pet } = await sut.execute({
            nome: "novo pet",
            decricao: "descrição do pet (opcional)",
            idade: "idade",
            porte: "porte",
            nivel_energia: "nivel_energia",
            nivel_independencia: "nivel independencia",
            ambiente: "ambiente",
            orgId: "novaOrgId",
        })

        expect(pet.id).toEqual(expect.any(String))
        expect(pet.orgId).toEqual(expect.any(String))
    })

})