import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-respository'
import { Pet } from 'client/prisma'
import { ErrorNotFoundPet } from './errors/Error-not-found-pet'

interface GetPetsByIdUseCaseRequest {
    id: string
}

interface GetPetsByIdUseCaseResponse {
    pet: Pet
}

export class GetPetByIdUseCase {
    constructor(private orgsRepository: PrismaPetRepository) { }

    async execute({
        id
    }: GetPetsByIdUseCaseRequest): Promise<GetPetsByIdUseCaseResponse> {
        const pet = await this.orgsRepository.findById(id)

        if (!pet) {
            throw new ErrorNotFoundPet()
        }

        return {
            pet
        }
    }
}