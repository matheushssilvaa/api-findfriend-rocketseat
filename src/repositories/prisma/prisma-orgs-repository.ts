import { Prisma, Org } from "client/prisma";
import { OrgRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgRepository implements OrgRepository {

    async create(data: Prisma.OrgCreateInput): Promise<Org> {
        const org = await prisma.org.create({
            data
        })

        return org
    }

    async findByEmail(email: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({
            where: {
                email
            }
        })

        return org
    }

    async findByCity(city: string): Promise<Org[] | null> {
        const petOfCity = await prisma.org.findMany({
            where: {
                endereco: {
                    contains: city,
                    mode: 'insensitive'
                },
            },
            include: {
                Pet: true
            }
        })

        return petOfCity
    }

}