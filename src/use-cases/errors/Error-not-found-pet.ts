export class ErrorNotFoundPet extends Error {
    constructor() {
        super("Pet não encontrado")
    }
}