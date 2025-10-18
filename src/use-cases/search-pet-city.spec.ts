import { InMemoryCreateOrgsRepository } from "../repositories/in-memory/in-memory-create-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { SearchPetsUseCase } from "./search-pet-city";

let repositoryOrg: InMemoryCreateOrgsRepository
let sut: SearchPetsUseCase

describe("Busca de pets por cidade", () => {
    beforeEach(() => {
        repositoryOrg = new InMemoryCreateOrgsRepository()
        sut = new SearchPetsUseCase(repositoryOrg)
    })

    it("Deve ser possivel listar um pet pela cidade", async () => {

        const cidade = "Batatais"

        await repositoryOrg.create({
            responsavel: "nova ORG",
            email: "novaorg@domain.org",
            endereco: `Rua tal tal, ${cidade} - SP`,
            whatsapp: "16999999",
            senha: "123456",
            Pet: {
                connect: {
                    id: undefined,
                }
            }
        })

        const searchPet = await sut.execute({
            param: cidade
        })

        expect(searchPet).toEqual(expect.objectContaining({
            pets: expect.arrayContaining([
                expect.objectContaining({
                    endereco: expect.stringContaining(cidade),
                }),
            ])
        }))
    })
})
