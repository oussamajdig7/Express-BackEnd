# API NodeJS (Express + TypeScript + Prisma + MySQL)

## Présentation
API REST développée avec Express (TypeScript). Prisma est utilisé pour :
- Les migrations (via `DATABASE_URL`)
- L’accès DB en runtime via l’adapter MySQL (via `DATABASE_HOST`, `DATABASE_USER`, etc.)

Le projet gère :
- Catégories
- Produits (liés à une catégorie)
- Vendeurs (mot de passe hashé via bcrypt)
- Clients (liés à un vendeur)
- Ventes (liées à un client et un produit)

## Tech stack
- Node.js, TypeScript
- Express
- Prisma + MySQL
- JWT (auth) + bcrypt

## Structure
- `app.ts` : serveur Express + CORS + montage des routes
- `routes/web.ts` : routes HTTP
- `controllers/*` : logique CRUD + auth
- `prisma/schema.prisma` : modèles Prisma
- `prisma.config.ts` : configuration Prisma (migrations)
- `lib/prisma.ts` : PrismaClient runtime (adapter MySQL)

## Prérequis
- Node.js + npm
- Base de données MySQL

## Installation
```bash
npm install
```

## Configuration (.env)
Créer un fichier `.env` à la racine (même niveau que `package.json`) :

```env
# Prisma CLI (migrations)
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DB_NAME"

# Runtime (adapter MySQL)
DATABASE_HOST="HOST"
DATABASE_USER="USER"
DATABASE_PASSWORD="PASSWORD"
DATABASE_NAME="DB_NAME"

# JWT
JWT_CLE="CHANGE_ME"
```

Exemple (local) :
```env
DATABASE_URL="mysql://root:@localhost:3306/mydb"
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_NAME="mydb"
JWT_CLE="dev_secret"
```

## Prisma (migrations + client)
```bash
npx prisma migrate dev
npx prisma generate
```

## Lancer le serveur
```bash
npm run start
```

Par défaut :
- API : http://localhost:5000
- CORS autorisé : `http://localhost:5173` (voir `app.ts`)

## Routes
- Health:
  - GET `/` : vérifier que l’API tourne
- Catégories:
  - POST `/categories/create`
  - GET `/categories/get`
  - PUT `/categories/update/:id`
  - DELETE `/categories/delete/:id`
- Produits:
  - POST `/produits/create`
  - GET `/produits/get`
  - PUT `/produits/update/:id`
  - DELETE `/produits/delete/:id`
- Vendeurs:
  - POST `/vendeurs/create`
  - GET `/vendeurs/get`
  - PUT `/vendeurs/update/:id`
  - DELETE `/vendeurs/delete/:id`
- Clients:
  - POST `/clients/create`
  - GET `/clients/get`
  - PUT `/clients/update/:id`
  - DELETE `/clients/delete/:id`
- Ventes:
  - POST `/ventes/create`
  - GET `/ventes/get`
  - PUT `/ventes/update/:id`
  - DELETE `/ventes/delete/:id`
- Auth:
  - POST `/login`
  - GET `/middleware` (protégée par JWT)

## Exemples rapides (curl)

Créer un vendeur :
```bash
curl -X POST http://localhost:5000/vendeurs/create \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Ali\",\"email\":\"ali@example.com\",\"password\":\"123456\"}"
```

Se connecter :
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"ali@example.com\",\"password\":\"123456\"}"
```

Tester la route protégée :
```bash
curl http://localhost:5000/middleware \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Modèles (Prisma)
- `Categorie`: `id`, `name`, `coleur`, `createdAt`
- `Produit`: `id`, `name`, `description`, `price`, `IdCategorie`, `createdAt`
- `Vendeur`: `id`, `name`, `email` (unique), `password`, `createdAt`
- `Client`: `id`, `name`, `prenom`, `idVendeur`, `createdAt`
- `Vente`: `id`, `idProduit`, `idClient`, `Qte`, `CordonnéGPS`, `createdAt`
