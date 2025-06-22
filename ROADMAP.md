# FIXES

- events#edit: bouger l'event de jour quand on modifie sa date
- container de jours possiblement dupliqué lors de la pagination

# ROADMAP

1. Venues
  - ~~un Event ne peut pas être validé si sa Venue n'est pas validée~~
  - ~~séparer date & heure dans le form~~
  - ~~venue edit: relancer le geocoding~~

  - ~~visualisation du geocoding~~
    - **lien OSM provisoire en attendant la map**
  - ~~vérifier/jarter remove_duplicates~~
    - **transfert d'events de venue à venue à la place**

  - ~~z-index venue dropdown/date&time mobile:~~
  - gestion des adresses (adresse, ville, code postal)

2. Job nettoyage de DB

3. Modales et pages statiques
  - à propos
  - contact
    - mailer
  - infos sur la précision de la géoloc

4. Divers ajustements UX
  - ~~meilleur time input~~
  - affichage mobile
  - datepicker plus petit

5. Choisir une licence

6. ~~routes autorisées pour sessions~~

7. **Mise en prod**

8. Map
  - layout
  - leaflet stylesheets seulement sur layout map
  - search: datepicker sans l'option range

## TODO

- GeocodeVenueJob: si erreur, attendre quelques secondes et recommencer

- venues#geocode: spinner & turbo stream

- dates: refacto form, datepicker etc. pour toujours utiliser YYYY-MM-DD
  - option dateFormat dans datepicker

- FORM:
  - address autocomplete [API adresses](https://adresse.data.gouv.fr/outils/api-doc/adresse)
  - code postal dans venue form
  - ne pas envoyer quand on appuie sur entrée

- refacto CSS (noms de variable, @base, @components, @container...)

- front pour sessions#new

- sous-titre / description

- glitches JS: gérer l'affichage façon v-cloak (search, forms)

- thème sombre

- revoir gestion user

- events#index:
  - bouton pour revenir en haut de page (?)

- events#unverified:
  - intégrer barre de recherche

- events#new:
  - option pour supprimer le lieu de la DB après la date de l'événement (par ex. en cas de concert chez l'habitant)
  - gestion des events récurrents

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API
  - input steps: 1,3,5,10,15,20,30

- remplacer les alert() par des jolies modales

- searchbar (général):
  - insensible à la casse & accents (e = é = è...)
    - elasticsearch ?
  - lien pour enlever tous les filtres (au niveau de "... résultats")
  - conserver la recherche d'une page à l'autre
  - garder la query string dans l'url (pouvoir bookmark la recherche)

- datepicker:
  - en faire un projet à part / package NPM
  - prévisualiser la range au hover

- beaucoup d'autres choses...
