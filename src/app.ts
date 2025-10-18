import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify()

app.register(orgsRoutes)
app.register(petsRoutes)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)