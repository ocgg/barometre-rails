# README

## Objectifs

- Agenda culturel de Bretagne et Loire-Atlantique, visant à imiter, voire remplacer feu le [TyZicos](https://www.tyzicos.com/).
- Concerts, jams sessions & open mics
- Liste spécifiquement les événements modestes en entrée libre ou peu coûteuse (typiquement dans les bars)
- 100% francophone
- API JSON en lecture seule (?) pour servir les informations sur les évènements et les lieux associés.
- Stack 100% open source (excepté GitHub...), de la conception au déploiement
- Pas d'inscription utilisateur. Les événements (et lieux) proposés doivent être validés par un admin

## Fonctionnalités actuelles

- Accès à la liste des concerts pour tous
- Recherche par dates, position et/ou mots-clés
- Création (proposition) d'événements/lieux ouvert à tous

- Accès à la carte des événements pour tous (en cours)

- Partie admin:
  - Accès à tous les événement proposés
  - Doit valider l'événement/lieu pour qu'il devienne visible par tous
  - Peut valider/modifier/supprimer tout événement/lieu

- API JSON (`/api/events` & `/api/venues`)
  - options:
    - `start` (`end` optionnel) pour filtrer par date ou fourchette de dates (au format MM-JJ-AAAA pour l'instant)
    - `lat`, `long` et `radius` pour filtrer par position
    - `q` pour filtrer par mot-clé (insensible à la casse, sensible aux accents pour l'instant)

## Todo

Voir [Roadmap](ROADMAP.md)

## Vagues idées du futur

- Dans le cas improbable où ça aurait du succès: distribuer une version papier
- App mobile

## Setup pour contribuer

Le serveur doit se lancer avec la commande `dev` (pas `rails s` !).

Particularités du stack:

- CSS: [Tailwind](https://tailwindcss.com/)
- HTML/ERB: [Slim](https://github.com/slim-template/slim)
- DB: [SQLite](https://www.sqlite.org/)
- L'app sera auto-hébergée dans un premier temps

```bash
rbenv install 3.4.2 # si rbenv

gh repo fork ocgg/barometre-rails
cd barometre-rails
bundle install
rails db:create db:migrate db:seed
dev
```
