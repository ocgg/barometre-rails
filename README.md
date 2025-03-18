# README

Ruby 3.4.2, SQLite

## Objectifs

- Agenda culturel de Loire-Atlantique visant en gros à imiter ce que fait [TyZicos](https://www.tyzicos.com/) en Bretagne.

- Liste spécifiquement les événements modestes en entrée libre ou peu coûteuse (bars, chez l'habitant...)

- API JSON (lecture seule) pour servir les informations sur les évènements et les lieux associés.

- Stack 100% open source, de la conception au déploiement

## Work in progress

events#index:

- front: polices, taille de lignes
- pagination events & seeds
- config 100% francophone

## TODO

- front: navbar, footer
- stack: ViewComponent ? Tailwind ?

- tests

- events#index:
  - cookie
  - validation par admin
  - pagination des events: par 10, par 20, par mois ?
  - new & edit turbo frames, gérer la création de venues
  - new: option pour supprimer le lieu de la DB après la date de l'event

- events#map: couleurs/icônes pour visualiser les dates (différencier aujourd'hui/semaine/mois/plus d'un mois)

- gestion des events récurrents
- background jobs pour nettoyer les events passés

- leaflet, geocoding

- API venues & events

- beaucoup d'autres choses...

## Vagues idées du futur

- Dans le cas improbable où ça aurait du succès: distribuer une version papier

## Setup pour contribuer

```bash
rbenv install 3.4.2 # si rbenv
gh repo clone ocgg/barometre-rails
cd barometre-rails
bundle install
rails db:create db:migrate db:seed
```
