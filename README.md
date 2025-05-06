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

- events#new:
  - gérer la création de venues
  - option pour supprimer le lieu de la DB après la date de l'événement (par ex. en cas de concert chez l'habitant)
  - gestion des events récurrents

- Map: leaflet

- API venues & events

- license

**En cours:**

- remplacer les alert() par des jolies modales

- searchbar (général):
  - glitch: gérer l'affichage de la searchbar façon v-cloak
  - insensible à la casse & accents (e = é = è...)
  - envoyer le formulaire au focus out (dates & location)
  - lien pour enlever tous les filtres (au niveau de "... résultats")
  - virer le "?q=" de l'url si y'a rien dans l'input text
  - le contenu des champs doit se conserver d'une page à l'autre (cookie ?), ou bien:
    - l'envoi du formulaire ne doit que mettre à jour la liste d'events (turbo)
    - du coup, pas besoin de récupérer les valeurs d'input des params. La searchbar bouge pas

- datefilter (flatpickr from scratch):
  - désactiver les dates passées (options pour "n'importe quelles dates")
  - prévisualiser la range au hover
  - couleurs bouton actif/inactif (côté baro)
  - couleurs highlight (côté lib)

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API
  - input steps: 1,3,5,10,15,20,30

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
