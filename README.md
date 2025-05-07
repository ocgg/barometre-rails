# README

## Objectifs

- Agenda culturel de Loire-Atlantique visant en gros à imiter ce que fait [TyZicos](https://www.tyzicos.com/) en Bretagne.
- Liste spécifiquement les événements modestes en entrée libre ou peu coûteuse (bars, chez l'habitant...)
- 100% francophone
- API JSON en lecture seule (?) pour servir les informations sur les évènements et les lieux associés.
- Stack 100% open source (excepté GitHub...), de la conception au déploiement
- Pas d'inscription utilisateur. Les événements proposés doivent être validés par un admin

## TODO

- **tests**

- maquette:
  - sous-titre / description

- frontend global:
  - thème sombre

- backend global:
  - job pour nettoyer les events passés (vider une table des events passés/supprimés)
  - revoir gestion user

- events#index:
  - event#edit: turbo frame
  - gérer les containers de jours dupliqués lors du scroll
  - gérer les permissions utilisateur
  - bouton pour revenir en haut de page

- events#unverified:
  - faire comme events#index
  - lien sur la navbar si admin connecté

- events#new:
  - gérer la création de venues
  - option pour supprimer le lieu de la DB après la date de l'événement (par ex. en cas de concert chez l'habitant)
  - gestion des events récurrents

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API
  - input steps: 1,3,5,10,15,20,30

- Map: leaflet

- API venues & events

- license

- beaucoup d'autres choses...

**En cours:**

- remplacer les alert() par des jolies modales

- refacto events_controller

- searchbar (général):
  - glitch: gérer l'affichage de la searchbar façon v-cloak
  - insensible à la casse & accents (e = é = è...)
  - lien pour enlever tous les filtres (au niveau de "... résultats")
  - conserver la recherche d'une page à l'autre

- datefilter (flatpickr from scratch):
  - prévisualiser la range au hover
  - ne pas pouvoir sélectionner les mois passés
  - +: css sur le premier jour sélectionné sur sélection du mois en cours

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

gh repo clone ocgg/barometre-rails
cd barometre-rails
bundle install
rails db:create db:migrate db:seed
dev
```
