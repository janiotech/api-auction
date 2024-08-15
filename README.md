<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3366/3366050.png" width="200" alt="Nest Logo" />
</p>

## Description

Uma estrutura Node.js progressiva para criar aplicativos do lado do servidor eficientes, confiáveis ​​e escaláveis.

## Installation

```bash
$ npm install
```

## Running the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Doc

## ROTAS AUTH

```bash
# gera um token para um usuário cadastrado no banco de dados
POST --  /auth/login
```

## ROTAS Users

```bash
# cadastrar um usuário no banco de dados (public)
POST -- /users/

# buscar todos usuários cadastrados no banco de dados (admin)
GET -- /users/

# buscar um perfil de usuário com base no id pego pelo token (user & admin)
GET -- /users/profile

# buscar um perfil de usuário com base no id passado pelo usuário (admin)
GET -- /users/{id}

# atualiza um usuário com base no id passado pelo usuário (admin)
PATCH -- /users/{id}

# atualiza um usuário com base no id passado pelo token (user & admin)
PATCH -- /users/perfil

# deleta um usuário com base no id passado pelo usuário (user & admin)
DELETE -- /users/{id}
```

## ROTAS Addresses

```bash
# buscar todos address cadastrados no banco de dados (admin)
GET -- /addresses

# buscar o address de usuário com base no id passado pelo usuário (admin)
GET -- /addresses/{id}

# buscar o address do usuário com base no id passado pelo token (user & admin)
GET -- /addresses/profile

```
