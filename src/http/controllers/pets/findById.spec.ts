import { app } from "../../../app";
import request from "supertest";
import { randomUUID } from "crypto";
import { prisma } from "../../../lib/prisma";
import { describe, beforeAll, it, afterAll, expect } from "vitest";
import { hash } from "bcryptjs";

describe("e2e: Busca de pets por ID", () => {
    beforeAll(async () => {
        await app.ready()
    }, 20000);

    afterAll(async () => {
        await app.close()
    });

    it("e2e: Rota para buscar pets por ID", async () => {
        const org = await prisma.org.create({
            data: {
                id: randomUUID(),
                responsavel: "ORG PetByID",
                email: "orgpetid@domain.org",
                endereco: "Rua dos Pets, Cidade",
                whatsapp: "12345678",
                senha: await hash("senha123", 6),
            },
        });

        const pet = await prisma.pet.create({
            data: {
                id: randomUUID(),
                nome: "Pet Exemplo",
                descricao: "Descrição do pet",
                idade: "filhote",
                porte: "médio",
                nivel_energia: "médio",
                nivel_independencia: "baixo",
                ambiente: "interno",
                orgId: org.id,
            },
        });

        const response = await request(app.server).get(`/pet/${pet.id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.pet).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                nome: expect.any(String),
            })
        );
    });
});
