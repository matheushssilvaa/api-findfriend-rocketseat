import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { Org } from 'client/prisma'
import { ErrorNotFoundPet } from './errors/Error-not-found-pet'

interface SearchPetsUseCaseRequest {
  param: string
}

interface SearchPetsUseCaseResponse {
  pets: Org[] | null
}

export class SearchPetsUseCase {
  constructor(private orgsRepository: PrismaOrgRepository) { }

  async execute({
    param
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.orgsRepository.findByCity(param)

    if (!pets) {
      throw new ErrorNotFoundPet()
    }

    return {
      pets
    }
  }
}