import { InMemoryCreateOrgsRepository } from "../repositories/in-memory/in-memory-create-orgs-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { Authenticate } from "./authenticate";
import { hash } from "bcryptjs";

let repository: InMemoryCreateOrgsRepository
let sut: Authenticate

describe("Autenticação de ORGs", () => {

    beforeEach(() => {
        repository = new InMemoryCreateOrgsRepository()
        sut = new Authenticate(repository)
    })

    it("Deve ser possivel uma org fazer login", async () => {

        await repository.create({
            responsavel: "nova ORG",
            email: "novaorg@domain.org",
            endereco: "endereço nova org",
            whatsapp: "16999999",
            senha: await hash("123456", 6)
        })

        const { org } = await sut.execute({
            email: "novaorg@domain.org",
            senha: "123456"
        })

        expect(org?.id).toEqual(expect.any(String))
    })
})