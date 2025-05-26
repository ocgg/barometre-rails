# ROADMAP

1. Datepicker:
  - instanciation similaire à flatpickr
  - options range/single, hour

2. Intégrer datepicker au formulaire

3. Confirmation des Venues

4. Gestion de la confirmation des Venues
  - un Event ne peux pas être validé si sa Venue n'est pas validée
  - Détection des doublons
  - Si doublon: réaffectation de la Venue pour tous ses events
  - Confirmation + visualisation du geocoding
  - détection geocoding foireux (hors Loire-Atlantique p.e.)

5. Job nettoyage de DB

6. Pages statiques (à propos, contact)

7. Mise en prod

8. Map

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
  - gérer les confirmations de venues

- events#new:
  - gérer la confirmation des nouveaux lieux (détection de doublons & remplacement, geocoding, validation Loire-Atlantique...)
  - option pour supprimer le lieu de la DB après la date de l'événement (par ex. en cas de concert chez l'habitant)
  - gestion des events récurrents

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API
  - input steps: 1,3,5,10,15,20,30

- Map: leaflet

- API venues & events

- license

- beaucoup d'autres choses...

- remplacer les alert() par des jolies modales

- searchbar (général):
  - glitch: gérer l'affichage de la searchbar façon v-cloak
  - insensible à la casse & accents (e = é = è...)
  - lien pour enlever tous les filtres (au niveau de "... résultats")
  - conserver la recherche d'une page à l'autre

- datefilter (flatpickr from scratch):
  - prévisualiser la range au hover
  - ne pas pouvoir sélectionner les mois passés
  - +: css sur le premier jour sélectionné sur sélection du mois en cours
