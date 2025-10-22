import { app } from "../../../app";
import request from "supertest";
import { randomUUID } from "crypto";
import { prisma } from "../../../lib/prisma";
import { describe, beforeAll, it, afterAll, expect } from "vitest";
import { hash } from "bcryptjs";

describe("e2e: Pesquisa de pets por cidade (search by city)", () => {
  beforeAll(async () => {
    await app.ready()
  }, 20000);

  afterAll(async () => {
    await app.close()
  });

  it("e2e: Rota para pesquisa de pets por cidade", async () => {
    const orgId = randomUUID();
    const petId = randomUUID();
    const cityForSearch = "Batatais";

    await prisma.org.create({
      data: {
        id: orgId,
        responsavel: "ORG CitySearch",
        email: `orgcity${Date.now()}@domain.org`,
        endereco: `Rua Y, ${cityForSearch} - SP`,
        whatsapp: "16988888",
        senha: await hash("123456", 6),
      },
    });

    await prisma.pet.create({
      data: {
        id: petId,
        nome: "Pet Cidade",
        descricao: "Descrição da cidade",
        idade: "idade",
        porte: "porte",
        nivel_energia: "nivel_energia",
        nivel_independencia: "nivel_independencia",
        ambiente: "ambiente",
        orgId: orgId,
      },
    });

    const response = await request(app.server)
      .get("/pet/filter")
      .query({ cidade: cityForSearch })

    expect(response.statusCode).toBe(200)

    const pets = response.body.pets.pets

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: petId }),
      ])
    );
  });
});
