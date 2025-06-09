# ROADMAP

1. ~~Datepicker:~~
  - ~~instanciation similaire à flatpickr~~
  - ~~options range/single, hour~~

2. ~~Intégrer datepicker au formulaire~~

3. Gestion de la confirmation des Venues
  - ~~venues#unverified~~
  - ~~Confirmation~~
  - ~~visualisation du geocoding~~ **(lien OSM provisoire en attendant la map)**
  - ~~un Event ne peut pas être validé si sa Venue n'est pas validée~~
  - ~~venues#destroy~~
  - ~~Détection des doublons~~
  - ~~Si doublon: réaffectation de la "bonne" Venue à tous ses events~~
  - ~~warning no geocoded~~
  - ~~détection geocoding hors Loire-Atlantique~~ **(+ de 60km du centre géographique)**
  - bg job pour geocoding
  - edit venue

4. Edit event

5. Job nettoyage de DB

6. Gérer les infos servies par l'API JSON

7. Modales et pages statiques
  - à propos
  - contact
  - infos sur la précision de la géoloc

8. Divers ajustements UX
  - affichage mobile
  - datepicker plus petit
  - meilleur time input
  - fix: containers de jours dupliqués lors de la pagination
  - HTML titles partout

9. Choisir une licence

10. **Mise en prod**

11. Map

## TODO

- ***écrire des tests nom d'une pipe***

- sous-titre / description

- thème sombre

- revoir gestion user

- events#index:
  - turbo frame \#edit
  - gérer les permissions utilisateur
  - bouton pour revenir en haut de page (?)
  - gestion turbo stream (partials à virer)
  - duplication des .day-header 

- transfert d'events de venue à venue

- events#unverified:
  - faire comme events#index (pagination, partials)

- events#new:
  - option pour supprimer le lieu de la DB après la date de l'événement (par ex. en cas de concert chez l'habitant)
  - gestion des events récurrents

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API
  - input steps: 1,3,5,10,15,20,30

- Map: leaflet

- API venues & events

- license

- remplacer les alert() par des jolies modales

- searchbar (général):
  - glitches: gérer l'affichage de la searchbar façon v-cloak
  - insensible à la casse & accents (e = é = è...)
  - lien pour enlever tous les filtres (au niveau de "... résultats")
  - conserver la recherche d'une page à l'autre

- datepicker:
  - en faire un projet à part / package NPM
  - prévisualiser la range au hover

- beaucoup d'autres choses...
