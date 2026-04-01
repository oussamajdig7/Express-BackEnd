# Projet NodeJS (Express + Prisma + MariaDB/MySQL)

## Présentation du projet
Ce projet est une API REST développée avec Express et TypeScript. Elle utilise Prisma pour interagir avec une base de données MariaDB/MySQL.

Elle permet de gérer :
- Catégories
- Produits (liés à une catégorie)
- Vendeurs (création avec mot de passe hashé via bcrypt)

## Fonctionnalités
- CRUD des catégories (Create / Read / Update / Delete)
- CRUD des produits + relation avec les catégories
- CRUD des vendeurs + hash du mot de passe
- API JSON (les données sont envoyées via le body en JSON)

## Structure (fichiers importants)
- `app.ts` : routes + serveur
- `prisma/schema.prisma` : modèles (Categorie / Produit / Vendeur)
- `lib/prisma.ts` : PrismaClient configuré avec l’adapter MariaDB

## 1) Prérequis
- Node.js + npm
- Base de données MySQL (serveur local ou distant)

## 2) Installation
```bash
npm install
```

## 3) Configuration `.env`
Crée un fichier `.env` à la racine du projet (au même niveau que `package.json`) et ajoute ces variables :

```env
# Prisma migrations (URL)
DATABASE_URL="mysql://USER@HOST:3306/DB_NAME"

# Runtime (adapter MariaDB)
DATABASE_HOST="HOST"
DATABASE_USER="USER"
DATABASE_PASSWORD=""
DATABASE_NAME="DB_NAME"
```

Exemple (local) :
```env
DATABASE_URL="mysql://root:password@localhost:3306/mydb"
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_PASSWORD="password"
DATABASE_NAME="mydb"
```

## 4) Prisma (migrations + client)
```bash
npx prisma migrate dev
npx prisma generate
```

## 5) Lancer le serveur
```bash
npm run start
```

L’API tourne sur :
- http://localhost:5000

## Routes
- GET `/` : vérifier que l’API tourne
- Produits:
  - POST `/produits/ajouter`
  - GET `/produits`
  - PUT `/produits/update/:id`
  - DELETE `/produits/delete/:id`
- Catégories:
  - POST `/categories/ajouter`
  - GET `/categories`
  - PUT `/categories/update/:id`
  - DELETE `/categories/delete/:id`
- Vendeurs:
  - POST `/vendeurs`
  - GET `/vendeurs`
  - PUT `/vendeurs/update/:id`
  - DELETE `/vendeurs/delete/:id`

## Modèles (Prisma)
- `Categorie`: `id`, `name`, `coleur`
- `Produit`: `id`, `name`, `description`, `price`, `IdCategorie` (relation avec `Categorie`)
- `Vendeur`: `id`, `name`, `email` (unique), `password` (hashé)
