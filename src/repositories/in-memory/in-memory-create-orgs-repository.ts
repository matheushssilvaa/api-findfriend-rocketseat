import { Org, Prisma } from "client/prisma";
import { OrgRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryCreateOrgsRepository implements OrgRepository {

    public items: Org[] = []

    async create(data: Prisma.OrgCreateInput): Promise<Org> {
        const org = {
            id: data.id ?? randomUUID(),
            responsavel: data.responsavel,
            email: data.email,
            endereco: data.endereco,
            whatsapp: data.whatsapp,
            senha: data.senha
        }

        this.items.push(org)

        return org
    }

    async findByEmail(email: string): Promise<Org | null> {
        const org = this.items.find((item) => item.email == email);
        if (!org) {
            throw new Error("Organização não encontrada");
        }
        return org;
    }

    async findByCity(city: string): Promise<Org[] | null> {
        const orgs = this.items.filter((org) => org.endereco.includes(city));
        return orgs.length > 0 ? orgs : null;
    }

}