import { app } from "../../../app";
import request from "supertest";
import { randomUUID } from "crypto";
import { prisma } from "../../../lib/prisma";
import { describe, beforeAll, it, afterAll, expect } from "vitest";
import { hash } from "bcryptjs";

describe("e2e: Pesquisa de pets por cidade (filter)", () => {
  beforeAll(async () => {
    await app.ready()
  }, 20000);

  afterAll(async () => {
    await app.close()
  });

  it("e2e: Rota para pesquisa de pets por cidade via filtro", async () => {
    const orgId = randomUUID();
    const petId = randomUUID();

    await prisma.org.create({
      data: {
        id: orgId,
        responsavel: "ORG para filtro",
        email: "orgfilter10@domain.org",
        endereco: "Rua X, Batatais - SP",
        whatsapp: "16999999",
        senha: await hash("123456", 6),
      }
    });

    await prisma.pet.create({
      data: {
        id: petId,
        nome: "Pet Filtrado",
        descricao: "Descrição pet",
        idade: "adulto",
        porte: "pequeno",
        nivel_energia: "alto",
        nivel_independencia: "baixo",
        ambiente: "externo",
        orgId: orgId,
      }
    });

    const response = await request(app.server)
      .get("/pet/filter")
      .query({
        idade: "adulto",
        porte: "pequeno",
        nivel_energia: "alto",
        nivel_independencia: "baixo",
      });

    expect(response.statusCode).toBe(200)

    const pet = response.body.pets.pets[0]

    expect(pet).toEqual(
      expect.objectContaining({
        id: petId,
        nome: "Pet Filtrado"
      })
    );
  });
});
