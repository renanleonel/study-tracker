npm init -y

npm i fastify

npm i typescript -D
npx tsc --init
npm i tsx -D

npm i -D prisma
npm i @prisma/client
npx prisma init --datasource-provider SQLite

npx prisma migrate dev
    - percebe todas as alterações feitas no schema.prisma e cria um arquivo SQL que altera no banco de dados
    - migrations

npx prisma studio
    - visualiza o banco de dados

npm i @fastify/cors

npx prisma db seed
    - pra rodar o seed pra popular o db
        - depois de criado o arquivo seed.ts