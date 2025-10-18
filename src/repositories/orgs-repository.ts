import { Org, Pet, Prisma } from "client/prisma";

export interface OrgRepository {
    create(data: Prisma.OrgCreateInput): Promise<Org>
    findByEmail(email: string): Promise<Org | null>
    findByCity(city: string): Promise<Org[] | null>
}