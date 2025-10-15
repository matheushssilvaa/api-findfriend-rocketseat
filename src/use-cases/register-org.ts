import { OrgRepository } from "@/repositories/orgs-repository";
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

    constructor(private orgRepository: OrgRepository) { }

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