# README

## Objectifs

- Agenda culturel de Loire-Atlantique visant en gros à imiter ce que fait [TyZicos](https://www.tyzicos.com/) en Bretagne.
- Liste spécifiquement les événements modestes en entrée libre ou peu coûteuse (bars, chez l'habitant...)
- 100% francophone
- API JSON (lecture seule) pour servir les informations sur les évènements et les lieux associés.
- Stack 100% open source, de la conception au déploiement
- Pas d'inscription utilisateur. Les événements proposés doivent être validés par un admin

## Work in progress

events#index:

- front: base, composants
- dark/light themes

## TODO

- front: navbar, footer

- tests

- seeds
- events#index:
  - cookie
  - validation par admin
  - pagination des events: par 10, par 20, par mois ?
  - new & edit turbo frames, gérer la création de venues
  - new: option pour supprimer le lieu de la DB après la date de l'event

- gestion des events récurrents
- background jobs pour nettoyer les events passés

- leaflet, geocoding

- API venues & events

- beaucoup d'autres choses...

## Vagues idées du futur

- Dans le cas improbable où ça aurait du succès: distribuer une version papier
- App mobile

## Setup pour contribuer

Le serveur doit se lancer avec la commande `dev`, **pas** `rails s` !

Particularités du stack:

- [Tailwind](https://tailwindcss.com/) + CSS natif
- [Slim](https://github.com/slim-template/slim) pour HTML/erb
- [SQLite](https://www.sqlite.org/)
- L'app sera auto-hébergée dans un premier temps

```bash
rbenv install 3.4.2 # si rbenv

gh repo clone ocgg/barometre-rails
cd barometre-rails
bundle install
rails db:create db:migrate db:seed
dev
```
