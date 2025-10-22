import { app } from "../../../app";
import request from "supertest";
import { describe, beforeAll, it, afterAll, expect } from "vitest";

describe("e2e: Autenticação de orgs", () => {

    beforeAll(async () => {
        await app.ready()
    });

    afterAll(async () => {
        await app.close()
    });

    it("e2e: Rota para autenticação de orgs", async () => {

        await request(app.server)
            .post('/org/create')
            .send({
                responsavel: "nova ORG",
                email: "novaorg1@domain.org",
                endereco: "endereço nova org",
                whatsapp: "16999991",
                senha: "123456"
            });

        const response = await request(app.server)
            .post('/org/signin')
            .send({
                email: "novaorg1@domain.org",
                senha: "123456"
            });

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })
    });
});
