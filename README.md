# Site Job Dating BTS NDRC

Site statique public destiné aux entreprises invitées au Job Dating du BTS NDRC de Mende.

## Contexte du projet

Le document [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) contient la stratégie, le public, les parcours UX, les principes de conception, les informations confirmées et la feuille de route. Toute IA ou personne qui modifie le site doit le lire avant d'intervenir.

## Modifier les informations essentielles

Ouvrir `content.js` pour changer la date, les horaires, le lieu, le téléphone, l’itinéraire ou l’adresse e-mail. L’adresse e-mail ne devient cliquable que lorsque `emailConfirmee` vaut `true`.

Le contenu des sections et de la FAQ se trouve dans `index.html`. L’apparence et le responsive se trouvent dans `styles.css`. Les interactions accessibles se trouvent dans `script.js`.

## Vérification locale

Avant une publication, exécuter :

```bash
node scripts/check-site.mjs
```

Ce contrôle vérifie les fichiers locaux référencés, les ancres, les identifiants uniques et la correspondance avec `content.js`. Le même contrôle bloque automatiquement un déploiement invalide.

## Publication

Le site est compatible avec GitHub Pages sans compilation. Le workflow `.github/workflows/pages.yml` vérifie puis publie automatiquement la branche `main`.

## Avant diffusion du QR code

Vérifier l’adresse e-mail, le responsable de publication, l’URL publique et toutes les informations pratiques sur plusieurs téléphones. Dans les paramètres GitHub Pages, utiliser **GitHub Actions** comme source de publication afin d’éviter une seconde publication concurrente depuis la branche.
