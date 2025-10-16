import { FastifyInstance } from "fastify";
import { createOrg } from "./create";
import { authenticate } from "./authenticate";

export function orgsRoutes(app: FastifyInstance) {
    app.post('/org/create', createOrg)
    app.post('/org/signin', authenticate)
}