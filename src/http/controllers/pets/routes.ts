import { FastifyInstance } from "fastify";
import { createPet } from "./create";

export function petsRoutes(app: FastifyInstance) {
    app.post('/pet/create', createPet)
}