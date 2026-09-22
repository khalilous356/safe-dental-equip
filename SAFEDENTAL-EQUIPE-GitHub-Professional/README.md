# SAFEDENTAL EQUIPE

Boutique publique + dashboard privé pour un comptoir dentaire.

## Ce qui change dans cette version professionnelle

- Aucun stockage de données métier dans le navigateur (`localStorage` / `sessionStorage`).
- Les données de démonstration sont chargées depuis `data/demo-data.js` et restent en mémoire uniquement.
- En production, la source de vérité doit être une API externe (`SAFEDENTAL_CONFIG.API_BASE_URL`).
- Les secrets Dolisoft, livraison, SMS et Google doivent rester côté serveur.
- Le panier multi-produits et le checkout restent dans la boutique publique.
- `dashboard.html` reste séparé pour la gestion interne.
- Workflow GitHub Pages inclus dans `.github/workflows/pages.yml`.

## Publication GitHub

1. Crée un dépôt GitHub.
2. Envoie tout le contenu de ce dossier dans la branche `main`.
3. Dans GitHub : Settings → Pages → Source : GitHub Actions.
4. Le workflow publie automatiquement `index.html` et `dashboard.html`.

## Mode production

Copie `config.example.js` vers une configuration privée de déploiement et définis :

`SAFEDENTAL_CONFIG.API_BASE_URL = 'https://ton-api.example.com'`

Endpoints attendus : `GET /state`, `POST /orders`, `POST /reviews`. Voir `js/api-README.md`.

## Important

Le mode démonstration n'est volontairement pas persistant. Pour partager les commandes entre la boutique et le dashboard, entre plusieurs appareils et plusieurs utilisateurs, il faut activer une API/base de données de production.
