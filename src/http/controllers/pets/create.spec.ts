import { app } from "../../../app";
import request from "supertest";
import { describe, beforeAll, it, afterAll, expect } from "vitest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("e2e: Criação de pets", () => {
  beforeAll(async () => {
    await app.ready()
  });

  afterAll(async () => {
    await app.close()
  });

  it("e2e: Rota para criação de pets", async () => {

    const { token, orgId } = await createAndAuthenticateOrg(app)

    console.log(token)

    const petPayload = {
      nome: "Novo Pet",
      descricao: "Descrição pet novo",
      idade: "filhote",
      porte: "médio",
      nivel_energia: "médio",
      nivel_independencia: "baixo",
      ambiente: "interno",
      fotos: [],
      requisitos: [],
      orgId: orgId,
    };

    const response = await request(app.server)
      .post("/pet/create")
      .set("Authorization", `Bearer ${token}`)
      .send(petPayload);

    expect(response.statusCode).toEqual(201)
  });
});
