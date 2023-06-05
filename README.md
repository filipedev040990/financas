# Finanças pessoais

O intuito deste projeto é o desenvolvimento de um sistema para controle de finanças pessoais.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

É necessário ter o docker instalado em sua máquina. Você pode instalá-lo consultando a documentação [aqui](https://docs.docker.com/desktop)

### 🔧 Instalação de dependências

Com o docker instalado, agora faça o clone do projeto e inicie com os comandos abaixo:

Instalando as dependências localmente:
```
npm install
```

### 🔩 Variáveis de ambiente

Renomeie o arquivo .env.example para .env e ajuste o valor das variáveis se necessário.

## 📦 Implantação

Subindo o projeto:

```
npm run build:up
```

Se tudo der certo, este será o resultado em seu terminal:<br><br>
![image](https://github.com/filipedev040990/financas/assets/106783314/30adc80e-8192-4621-b628-80fd7a16cfe3)

## ⚙️ Executando os testes unitários

Para executar todos os testes unitários execute o comanddo:

```
npm t
```
![image](https://github.com/filipedev040990/financas/assets/106783314/35c45a42-c87d-4222-bf30-f40910162d3a)

## 🔍 Consultando a documentação
Esta api possui uma documentação feita com [Swagger](https://swagger.io/). Para verificar os endpoints disponíveis, acesse em seu navegador:(http://localhost:3000/api-docs/#/)

## 🛠️ Construído com

* [NodeJs](https://nodejs.org/en) - Linguagem de programação
* [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
* [Docker](https://docs.docker.com/) - Containers
* [Mysql](https://www.mysql.com/) - Banco de dados
* [Prisma](https://www.prisma.io/) - ORM

Este projeto está sendo construído utilizando a [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
![Clean Architecture](https://github.com/filipedev040990/financas/assets/106783314/8a67977a-52e5-4e82-abf5-bd22db86da50)


## ✒️ Autores

* **Filipe Siqueira** - *Trabalho Inicial* - [desenvolvedor](https://github.com/filipedev040990)

## 🎁 Expressões de gratidão

* Conte a outras pessoas sobre este projeto 📢;
* Convide alguém da equipe para uma cerveja 🍺;
* Um agradecimento publicamente 🫂;
* etc.
