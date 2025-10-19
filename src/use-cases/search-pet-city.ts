import { InMemoryCreateOrgsRepository } from '@/repositories/in-memory/in-memory-create-orgs-repository'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { Org } from 'client/prisma'

interface SearchPetsUseCaseRequest {
  param: string
}

interface SearchPetsUseCaseResponse {
  pets: Org[] | null
}

export class SearchPetsUseCase {
  constructor(private orgsRepository: PrismaOrgRepository) {}

  async execute({
    param
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.orgsRepository.findByCity(param)

    if(!pets) {
      throw new Error("Nenhum pet encontrado para essa localidade")
    }

    return {
      pets
    }
  }
}