# Entidades

Abaixo, o diagrama das entidades que irão existir para suportar todos os dados exibidos no aplicativo.

> Se você não conseguir visualizar o diagrama, por favor, instale a seguinte extensão [clicando aqui.](https://github.com/BackMarket/github-mermaid-extension)

```mermaid
classDiagram

class Users {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  roles: string;
}

Users "1" --> "1" Ongs

class Ongs {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  userId: number;
}

Ongs "1" --> "1" Causes

class Causes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  categories: string;
  description: string;
  expiresAt: Date;
  ongId: number;
}
```
