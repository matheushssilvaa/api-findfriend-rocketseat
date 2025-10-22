import { app } from "../../../app";
import request from "supertest";
import { describe, beforeAll, it, afterAll, expect } from "vitest";

describe("e2e: Criação de orgs", () => {
    beforeAll(async () => {
        await app.ready()
    }, 20000);

    afterAll(async () => {
        await app.close()
    });

    it("e2e: Rota para criação de orgs", async () => {
        const response = await request(app.server)
            .post('/org/create')
            .send({
                responsavel: "nova ORG",
                email: "novaorg2@domain.org",
                endereco: "endereço nova org",
                whatsapp: "1699992",
                senha: "123456"
            });

        expect(response.statusCode).toEqual(201)
    });
});
