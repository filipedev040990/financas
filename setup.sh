#! /bin/bash

echo "Instalando as dependências do projeto ..."
npm install --omit=dev --force

echo "Dependências instaladas!"

echo "Configurando husky ..."
rm -rf .husky &&
npx husky install &&
npx husky add .husky/pre-commit "npx lint-staged" &&
npx husky add .husky/pre-push "npm run test:ci" &&

echo "husky configurado!"
echo "Iniciando banco de dados e rodando migrations"

npx prisma migrate dev &&

echo "Iniciando aplicação"
npm run start