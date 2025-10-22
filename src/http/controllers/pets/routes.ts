import { FastifyInstance } from "fastify";
import { createPet } from "./create";
import { searchPetByCity } from "./search-by-city";
import { filterPets } from "./filter";
import { findPetById } from "./findById";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pet/create', { onRequest: [verifyJwt] }, createPet)
    app.get('/pet/:cidade/search', searchPetByCity)
    app.get('/pet/filter', filterPets)
    app.get('/pet/:id', findPetById)
}