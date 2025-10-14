
# Funcionalidades da Aplicação

1 - O cadastro de um pet
2 - A listagem de todos os pets disponíveis para adoção em uma determinada cidade
3 - A filtragem de pets com base em suas características (como idade, porte, etc.)
4 - A visualização dos detalhes de um pet específico
5 - O cadastro de uma ORG (organização)
6 - O login de uma ORG no sistema
7 - Regras de Negócio

## As seguintes condições devem ser implementadas:

1 - A informação da cidade é obrigatória para listar os pets
2 - Uma ORG deve, obrigatoriamente, ter um endereço e um número de WhatsApp
3 - Todo pet cadastrado precisa estar vinculado a uma ORG
4 - O contato do usuário interessado em adotar um pet será feito diretamente com a ORG via WhatsApp
5 - Todos os filtros de características do pet, com exceção da cidade, são opcionais
6 - Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar logada

## Tarefas
Funções abaixo implementadas com o marcador [x]

[] Rota para cadastrar uma ORG, garantindo que inclua endereço e número de Whatsapp
[] Rota de login para uma ORG
[] Rota para cadastrar um pet, garantindo que ele seja associado a uma ORG
[] Rotas para listar pets, exigindo a cidade como parâmetro obrigatório
[] Implementar a funcionalidade de filtros opcionais por caracteristicas dos pets na listagem
[] Rota para visualizar os detalhes de um pet especifico
[] Garantir que o acesso de adm da ORG seja restrito a usuários logados
[] Aplicar os principios de SOLID durante o desenvolvimento da estrutura da API
[] Criar testes para validar as funcionalidades e regras de negócio

