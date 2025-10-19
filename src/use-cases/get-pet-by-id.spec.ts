import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryCreatePetsRepository } from '../repositories/in-memory/in-memory-create-pets-repository';
import { randomUUID } from 'crypto';
import { GetPetByIdUseCase } from './get-pet-by-id';

describe('Busca de pets por ID', () => {
    let petRepository: InMemoryCreatePetsRepository;
    let sut: GetPetByIdUseCase;

    beforeEach(() => {
        petRepository = new InMemoryCreatePetsRepository();
        sut = new GetPetByIdUseCase(petRepository);
    });

    it('deve retornar pets o pet associado ao ID', async () => {

        const id = randomUUID()

        await petRepository.create({
            id,
            nome: 'Rex',
            idade: '2',
            porte: 'grande',
            nivel_energia: 'alto',
            nivel_independencia: 'alto',
            org: { connect: { id: 'idOrg' } }
        });

        const result = await sut.execute({
            id
        });

        expect(result.pet).toEqual(expect.objectContaining({
            id
        }));
    });
});
