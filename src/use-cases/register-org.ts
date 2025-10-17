import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { Org } from "client/prisma"

interface CreateOrgUseCaseRequest {
    responsavel: string,
    email: string,
    endereco: string,
    whatsapp: string,
    senha: string
}

interface CreateOrgUseCaseResponse {
    org: Org
}

export class RegisterOrg {

    constructor(private orgRepository: PrismaOrgRepository) { }

    async execute({
        responsavel,
        email,
        endereco,
        whatsapp,
        senha
    }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {

        const org = await this.orgRepository.create({
            responsavel,
            email,
            endereco,
            senha,
            whatsapp
        })

        return { org }
    }
}