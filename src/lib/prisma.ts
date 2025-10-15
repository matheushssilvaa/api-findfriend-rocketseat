import { env } from "../env";
import { PrismaClient } from "../../client/prisma";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
})