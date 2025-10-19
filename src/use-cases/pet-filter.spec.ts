import { describe, it, expect, beforeEach } from 'vitest';
import { PetFilter } from './pet-filter';
import { InMemoryCreatePetsRepository } from '../repositories/in-memory/in-memory-create-pets-repository';
import { randomUUID } from 'crypto';

describe('Filtragem de pets', () => {
  let petRepository: InMemoryCreatePetsRepository;
  let sut: PetFilter;

  beforeEach(() => {
    petRepository = new InMemoryCreatePetsRepository();
    sut = new PetFilter(petRepository);
  });

  it('deve retornar pets e o total correto quando encontrar pets', async () => {
    const pet1 = await petRepository.create({
      id: randomUUID(),
      nome: 'Rex',
      idade: '2',
      porte: 'grande',
      nivel_energia: 'alto',
      nivel_independencia: 'alto',
      org: { connect: { id: 'idOrg' } }
    });

    const pet2 = await petRepository.create({
      id: randomUUID(),
      nome: 'Bidu',
      idade: '4',
      porte: 'pequeno',
      nivel_energia: 'médio',
      nivel_independencia: 'baixo',
      org: { connect: { id: 'idOrg' } }
    });

    const result = await sut.execute({
      idade: '2',
      nivel_energia: 'alto',
      porte: 'grande',
      nivel_independencia: 'alto',
    });

    expect(result.pets).toEqual([pet1]);
    expect(result.total).toBe(1);
  });

  it('deve lançar um erro quando nenhum pet for encontrado', async () => {
    await petRepository.create({
      id: randomUUID(),
      nome: 'Bolt',
      idade: '3',
      porte: 'grande',
      nivel_energia: 'alto',
      nivel_independencia: 'alto',
      org: { connect: { id: 'idOrg' } }
    });

    await expect(() =>
      sut.execute({
        idade: '1',
        nivel_energia: 'baixo',
        porte: 'médio',
        nivel_independencia: 'médio',
      })
    ).rejects.toThrowError();
  });
});
