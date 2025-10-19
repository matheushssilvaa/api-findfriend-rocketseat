import { FastifyInstance } from "fastify";
import { createPet } from "./create";
import { searchPetByCity } from "./search-by-city";
import { filterPets } from "./filter";
import { findPetById } from "./findById";

export function petsRoutes(app: FastifyInstance) {
    app.post('/pet/create', createPet)
    app.get('/pet/:cidade/search', searchPetByCity)
    app.get('/pet/filter', filterPets)
    app.get('/pet/:id', findPetById)
}