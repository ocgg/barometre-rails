# README

## Objectifs

- Agenda culturel de Loire-Atlantique visant en gros à imiter ce que fait [TyZicos](https://www.tyzicos.com/) en Bretagne.
- Liste spécifiquement les événements modestes en entrée libre ou peu coûteuse (bars, chez l'habitant...)
- 100% francophone
- API JSON en lecture seule (?) pour servir les informations sur les évènements et les lieux associés.
- Stack 100% open source (excepté GitHub...), de la conception au déploiement
- Pas d'inscription utilisateur. Les événements proposés doivent être validés par un admin

## TODO

- tests
- seeds

- maquette:
  - sous-titre / description

- frontend global:
  - thème sombre
  - stimulus handle_focus_out pour le dropdown et les éléments de recherche gérés en JS
  - searchbar / localisation
  - gérer l'affichage de la searchbar façon v-cloak
  - gérer les classes tailwind seulement générées en JS

- backend global:
  - requêtes n+1
  - search
  - job pour nettoyer les events passés
  - revoir gestion user

- events#index:
  - validation par admin
  - pagination des events
  - event#edit: turbo frame

- events#new:
  - turbo / gérer la création de venues
  - option pour supprimer le lieu de la DB après la date de l'événement (par ex. en cas de concert chez l'habitant)
  - gestion des events récurrents

- Map: leaflet / geocoding
  - checker comment se comportent les turbo frames par rapport aux media queries et la taille du container

- API venues & events

- beaucoup d'autres choses...

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
