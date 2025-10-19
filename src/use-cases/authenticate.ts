import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { compare } from "bcryptjs";
import { Org } from "client/prisma";

interface AuthenticateOrgRequest {
    email: string,
    senha: string
}

interface AuthenticateOrgResponse {
    org: Org | null
}

export class Authenticate {

    constructor(private repository: PrismaOrgRepository) { }

    async execute({
        email,
        senha
    }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
        const org = await this.repository.findByEmail(email)

        if (!org) {
            throw new Error("ORG não encontrada")
        }

        const doesPasswordMatches = await compare(senha, org.senha)

        if (!doesPasswordMatches) {
            throw new Error("Credenciais inválidas")
        }

        return { org }
    }

}