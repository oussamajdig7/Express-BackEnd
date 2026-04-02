# Rapport de Projet — API REST (Express + TypeScript + Prisma)

## 1) Contexte et objectifs
Ce projet est une API REST écrite en TypeScript avec Express. L’objectif est de proposer un backend simple pour gérer un mini-système de vente, avec :
- Gestion des catégories et produits
- Gestion des vendeurs et clients
- Gestion des ventes (relation client/produit)
- Authentification via JWT pour protéger certaines routes

## 2) Choix techniques
- Express (API HTTP)
- TypeScript (typage, structure)
- Prisma (ORM)
  - Migrations via `DATABASE_URL` (configuration dans `prisma.config.ts`)
  - Accès DB en runtime via l’adapter MariaDB (configuration dans `lib/prisma.ts`)
- bcrypt (hash du mot de passe)
- jsonwebtoken (signature et vérification JWT)
- cors (autoriser le front en local)

## 3) Architecture du projet
Organisation des dossiers :
- `app.ts` : création du serveur, middlewares (JSON, CORS), route `/`, montage des routes.
- `routes/web.ts` : définition des endpoints et association aux controllers.
- `controllers/*` : logique métier (CRUD, auth, middleware JWT).
- `prisma/schema.prisma` : modèles + relations.
- `prisma.config.ts` : configuration Prisma CLI (schema, migrations, datasource url).
- `lib/prisma.ts` : instance PrismaClient utilisée par les controllers.

Flux de requête (simplifié) :
1. Le client appelle une route HTTP (ex: `POST /produits/create`)
2. La route déclenche une fonction controller
3. Le controller exécute les requêtes via Prisma
4. L’API renvoie une réponse JSON

## 4) Modèle de données (Prisma)
Le schéma est défini dans `prisma/schema.prisma`.

### Entités et champs principaux
- `Categorie` : `id`, `name`, `coleur`, `createdAt`
- `Produit` : `id`, `name`, `description`, `price`, `IdCategorie`, `createdAt`
- `Vendeur` : `id`, `name`, `email` (unique), `password`, `createdAt`
- `Client` : `id`, `name`, `prenom`, `idVendeur`, `createdAt`
- `Vente` : `id`, `idProduit`, `idClient`, `Qte`, `CordonnéGPS`, `createdAt`

### Relations
- Une `Categorie` possède plusieurs `Produit` (1→N)
- Un `Vendeur` possède plusieurs `Client` (1→N)
- Un `Produit` possède plusieurs `Vente` (1→N)
- Un `Client` possède plusieurs `Vente` (1→N)

## 5) API (endpoints)
Routes (définies dans `routes/web.ts`) :

### Health
- GET `/` : vérifie que l’API tourne

### Catégories
- POST `/categories/create`
- GET `/categories/get`
- PUT `/categories/update/:id`
- DELETE `/categories/delete/:id`

### Produits
- POST `/produits/create`
- GET `/produits/get`
- PUT `/produits/update/:id`
- DELETE `/produits/delete/:id`

### Vendeurs
- POST `/vendeurs/create`
- GET `/vendeurs/get`
- PUT `/vendeurs/update/:id`
- DELETE `/vendeurs/delete/:id`

### Clients
- POST `/clients/create`
- GET `/clients/get`
- PUT `/clients/update/:id`
- DELETE `/clients/delete/:id`

### Ventes
- POST `/ventes/create`
- GET `/ventes/get`
- PUT `/ventes/update/:id`
- DELETE `/ventes/delete/:id`

### Auth
- POST `/login` : retourne un token JWT (valide 1h)
- GET `/middleware` : exemple de route protégée (Authorization Bearer)

## 6) Authentification et sécurité
Principe :
- À la création d’un vendeur, le mot de passe est hashé avec bcrypt.
- Lors du login, le serveur compare le mot de passe fourni avec le hash stocké en base.
- Si OK, l’API retourne un token JWT contenant `{ id, email }`, signé avec `JWT_CLE`.
- Les routes protégées vérifient le token avec `Authorization: Bearer <token>`.

## 7) Installation et exécution (résumé)
1. Installer les dépendances : `npm install`
2. Créer `.env` (voir `README.md`)
3. Prisma :
   - `npx prisma migrate dev`
   - `npx prisma generate`
4. Démarrer : `npm run start`

## 8) Points d’amélioration (propositions)
- Validation des entrées (ex: schémas de validation) et gestion d’erreurs plus homogène
- Pagination/filtrage sur les endpoints `GET`
- Ne pas exposer certains champs sensibles (ex: `password`) dans les réponses
- Tests automatisés (unitaires + intégration)
- Configuration de port et CORS via variables d’environnement

