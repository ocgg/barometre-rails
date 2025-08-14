# FIXES

- events#edit: bouger l'event de jour quand on modifie sa date
- container de jours possiblement dupliqué lors de la pagination

# ROADMAP

1. Venues
  - transfert d'events de venue à venue en cas de doublons

2. Job nettoyage de DB

3. Modales et pages statiques
  - infos sur la précision de la géoloc
  - flash alerts

4. Divers ajustements UX
  - marges globales
  - affichage mobile
  - datepicker plus petit
  - footer
  - search, form: gérer l'affichage façon v-cloak

5. **Mise en prod**

6. Map
  - layout
  - leaflet stylesheets seulement sur layout map
  - search: datepicker sans range

## TODO

- Nerd Fonts Symbols à la place des svg

- Contact mail: action text

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

- thème sombre

- revoir gestion user

- events#unverified:
  - intégrer barre de recherche

- events#new:
  - option pour supprimer le lieu de la DB après la date de l'événement (par ex. en cas de concert chez l'habitant)
  - gestion des events récurrents

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API

- searchbar:
  - insensible à la casse & accents (e = é = è...)
    - elasticsearch ?
  - lien pour enlever tous les filtres (au niveau de "... résultats")
  - conserver la recherche d'une page à l'autre
  - garder la query string dans l'url (pouvoir bookmark la recherche)

- datepicker:
  - prévisualiser la range au hover
  - package NPM

- beaucoup d'autres choses...
