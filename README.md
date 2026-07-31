# ecom_v1

Projet e-commerce fullstack construit de A à Z — architecture découplée, stack moderne, pratiques production.

## Stack

**Backend**
- NestJS (architecture modulaire)
- Prisma 7 + PostgreSQL
- JWT (auth stateless, refresh 7 jours)
- Stripe (paiement + webhooks idempotents)

**Frontend**
- Next.js 16 (App Router)
- SSR/ISR sur le catalogue — SPA sur panier/checkout
- Tailwind CSS
- Axios

## Architecture

ecom_v1/
back/ → API REST NestJS (port 3001)
front/ → App Next.js (port 3000)

Les deux projets sont volontairement découplés — pas d'API routes Next.js, pas de monorepo. Le frontend consomme l'API via HTTP, ce qui permet de remplacer l'un ou l'autre indépendamment.

## Modules backend

| Module | Responsabilité |
|--------|----------------|
| Auth | Register, login, JWT guard, Role guard (ADMIN/CUSTOMER) |
| Catalog | Produits et catégories — CRUD admin, lecture publique |
| Cart | Panier persistant par user, fusion panier invité |
| Orders | Création de commande, snapshot des prix |
| Payment | Stripe Payment Intent, webhooks idempotents |

## Décisions techniques

**Prix snapshottés** — Le prix unitaire est figé au moment de l'ajout au panier (`unitPriceSnapshot`) et à la création de commande (`unitPrice`). Un changement de prix produit n'affecte jamais une commande existante.

**Idempotence Stripe** — Chaque webhook Stripe est enregistré en base (`StripeEvent`) avant traitement. Un webhook reçu deux fois n'est traité qu'une seule fois.

**SSR/ISR** — Les pages catalogue et fiche produit sont rendues côté serveur avec revalidation toutes les 60 secondes. Le panier, le checkout et les commandes sont rendus côté client (données personnalisées, pas de valeur SEO).

**Role Guard** — Les routes admin (création/modification/suppression de produits et catégories) sont protégées par un guard qui vérifie le rôle dans le payload JWT.

## Lancer le projet

### Prérequis
- Node.js 20+
- PostgreSQL

### Backend

```bash
cd back
npm install
cp .env.example .env  # configurer DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY
npx prisma migrate dev
npm run start:dev
```

### Frontend

```bash
cd front
npm install
cp .env.local.example .env.local  # configurer NEXT_PUBLIC_API_URL
npm run dev
```

## Expérience e-commerce

Projet construit avec les enseignements tirés de la maintenance de sites e-commerce en production (Afibel, Plateforme du Bâtiment) — gestion des désynchronisations de prix, idempotence des webhooks de paiement, séparation stricte des données transactionnelles.