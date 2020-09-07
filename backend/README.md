<h1 align="center">
    <img alt="Ajudaê" class="img-responsive" src="../.github/assets/pages.png" width="100%"/>
</h1>

<h4 align="center">
  Ajudaê
</h4>

<p align="center">
  <a href="#book-introducao">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-estrutura">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#notebook-typeorm">Typeorm</a>
</p>

## :book: Introdução

Essa será a API escrita em TypeScript usando o framework NestJS para fornecer os dados necessários para o aplicativo Ajudaê.

## :memo: Estrutura

As pastas seguem uma estrutura bem simples:
- src
    - common: Contém arquivos que são utilizados repetidamente nos `controllers`, `services` e outros arquivos.
    - decorators: Contém todos os `decorators` da aplicação.
    - guards: Contém todos os `guards` da aplicação
    - modules: Contém todos os `modules` da aplicação, em essência, um módulo contém os `controllers`, `services`, etc.
    - migrations: Contém todos os arquivos relacionados as `migrations` do `typeorm`.
    - utils: Contém todos os arquivos que contém funções úteis usadas em toda a aplicação.

## :notebook: TypeOrm

Esse é o nome biblioteca que lida com o banco de dados, a estrutura desse cara é a seguinte:

- `src/migrations`: O local onde todas as migrations ficam.
- `src/modules/**/entities`: O local onde todas as entidades criadas devem ficar, **SEMPRE** devem possuir o final terminando em `.entity.ts`.
- `src/modules/**/subscribers`: O local onde todas os `subscribers` ficam, **SEMPRE** devem possuir o final terminando em `.subscriber.ts`.

### MySQL

Use o seguinte comando para criar o arquivo de configurações a partir do exemplo:
```shell
cp .env.mysql.example .env
```

Depois, defina as configurações do banco de dados de acordo com as suas necessidades.

Pronto! Agora, você pode criar uma `migration` usando `npm run add-migration v1`, e depois executa-la com `npm run migration` para iniciar o banco de dados. 

### SQLite

Se for usar SQLite em vez de MySQL, instale as dependências necessárias com:
```shell
sudo apt-get install sqlite3 libsqlite3-dev
```

E depois inicie uma banco de dados inicial com:
```shell
sqlite3 example.db "VACUUM;"
```

Por fim, crie o arquivo contendo as configurações iniciais:
```shell
cp .env.sqlite.example .env
```

Pronto! Agora, você pode criar uma `migration` usando `npm run add-migration v1`, e depois executa-la com `npm run migration` para iniciar o banco de dados. 

### Migrations

Para criar uma `migration`, use o comando:
```shell
npm run add-migration NOME_DA_MIGRATION
```

E para executar todas as suas `migrations`, use:
```shell
npm run migration
```

Caso queira realizar alguma operação mais complexa com o Typeorm, use o comando:
```shell
npm run typeorm:cli COMANDO
```

## Base

Essa API tomou como base um outro projeto meu feito para o pessoal da Rocketseat, para saber mais, [clique aqui.](https://github.com/H4ad/omnistack)
