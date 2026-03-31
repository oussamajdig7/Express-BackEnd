# Projet NodeJS (Express + Prisma + MariaDB/MySQL)

## 1) Prérequis
- Node.js + npm
- Base de données MariaDB/MySQL (server local ou remote)

## 2) Installation (mn lwwel)
```bash
npm install
```

## 3) Configuration `.env`
Dir ملف `.env` f root dyal projet (m3a `package.json`) w 7et had variables:

```env
# Prisma migrations (URL)
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DB_NAME"

# Runtime (adapter MariaDB)
DATABASE_HOST="HOST"
DATABASE_USER="USER"
DATABASE_PASSWORD="PASSWORD"
DATABASE_NAME="DB_NAME"
```

Matal (local):
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

## 5) تشغيل السيرفر
```bash
npm run start
```

API كتخدم f:
- http://localhost:5000

## Routes
- GET `/` : check API
- Produits:
  - POST `/produits/ajouter`
  - GET `/produits`
  - PUT `/produits/update/:id`
  - DELETE `/produits/delete/:id`
- Categories:
  - POST `/categories/ajouter`
  - GET `/categories`
  - PUT `/categories/update/:id`
  - DELETE `/categories/delete/:id`
- Vendeurs:
  - POST `/vendeurs`
  - GET `/vendeurs`
  - PUT `/vendeurs/update/:id`
  - DELETE `/vendeurs/delete/:id`
