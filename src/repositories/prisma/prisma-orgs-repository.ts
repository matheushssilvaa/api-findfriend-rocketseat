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

}