import { FastifyInstance } from "fastify";
import { createOrg } from "./create";

export function orgsRoutes(app: FastifyInstance) {
    app.post('/org/create', createOrg)
}