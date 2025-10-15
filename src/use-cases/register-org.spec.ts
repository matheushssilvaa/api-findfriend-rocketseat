import { describe, it, beforeEach, expect } from "vitest";
import { RegisterOrg } from "./register-org";
import { InMemoryCreateOrgsRepository } from "../repositories/in-memory/in-memory-create-orgs-repository";

let repository: InMemoryCreateOrgsRepository
let sut: RegisterOrg

describe("Cadastro de orgs", () => {

    beforeEach(() => {
        repository = new InMemoryCreateOrgsRepository()
        sut = new RegisterOrg(repository)
    })

    it("deve ser possivel cadastrar uma org", async () => {
        const { org } = await sut.execute({
            responsavel: "nova ORG",
            email: "novaorg@domain.org",
            endereco: "endereço nova org",
            whatsapp: "16999999",
            senha: "123456"
        })

        expect(org.id).toEqual(expect.any(String))
        expect(org.endereco).toEqual(expect.any(String))
        expect(org.whatsapp).toEqual(expect.any(String))
    })

})