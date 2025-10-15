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

}