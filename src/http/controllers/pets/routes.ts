import { FastifyInstance } from "fastify";
import { createPet } from "./create";
import { searchPetByCity } from "./search-by-city";
import { filterPets } from "./filter";

export function petsRoutes(app: FastifyInstance) {
    app.post('/pet/create', createPet)
    app.get('/pet/:cidade/search', searchPetByCity)
    app.get('/pet/filter', filterPets)
}