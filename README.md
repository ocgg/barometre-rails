# README

> **Ty-Zicos est mort, vive le Ty-Zicos**
>
> *[TyZicos](https://www.tyzicos.com/) était un agenda culturel de Bretagne, produit, maintenu et imprimé pendant 23 ans par les membres de la société d'imprimerie et diffusion [Glaz Diffusion](https://yanntyzicos.wixsite.com/website-1). Le dernier numéro est sorti en Octobre 2025.*
>
> *C'était la principale source d'inspiration de ce projet, à la base conçu pour la Loire-Atlantique seule. L'objectif du projet est désormais d'arriver à la cheville du Ty-Zicos, pour toute la Bretagne.*

## Objectifs

- Agenda culturel de Bretagne et Loire-Atlantique.
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
