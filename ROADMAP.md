# FIXES

- events#edit: bouger l'event de jour quand on modifie sa date
- container de jours possiblement dupliqué lors de la pagination

# ROADMAP

1. Venues
  - transfert d'events de venue à venue en cas de doublons

3. Modales et pages statiques
  - infos sur la précision de la géoloc

4. Divers ajustements UX
  - affichage mobile
  - datepicker plus petit
  - footer
  - search, form: gérer l'affichage façon v-cloak
  - events#new: empêcher le submit quand on appuie sur entrée

5. **Mise en prod**

5. Map
  - layout
  - leaflet stylesheets seulement sur layout map
  - search: datepicker sans range

## TODO

- À réfléchir:
  - Même les events non validés sont visibles par tous
  - tout le monde peut éditer, façon article wiki
  - faire une show avec des infos optionnelles (photo, rich text, liens)

- liens sur les cards pour aller vers la map

- searchbar:
  - insensible à la casse & accents (e = é = è...)
    - elasticsearch ?
  - lien pour enlever tous les filtres (au niveau de "... résultats")
  - conserver la recherche d'une page à l'autre
  - garder la query string dans l'url (pouvoir bookmark la recherche)

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API

- CSS/Tailwind:
  - refacto
  - `<i>` à la place des svg
  - thème sombre

- Contact mail: action text

- Jobs:
  - geocode & mailer: si erreur, attendre quelques secondes et recommencer
  - Job nettoyage de DB

- events#new:
  - address autocomplete [API adresses](https://adresse.data.gouv.fr/outils/api-doc/adresse)
  - code postal dans venue form
  - option événements récurents
  - option concert chez l'habitant
  - dans ce cas: option pour supprimer le lieu de la DB après l'événement

- datepicker:
  - toujours utiliser YYYY-MM-DD
  - option dateFormat dans datepicker
  - prévisualiser la range au hover
  - package NPM

- Backend: revoir gestion user

- Pages admin:
  - front pour sessions#new
  - events#unverified: intégrer barre de recherche
  - venues#geocode: spinner & turbo stream

- Refaire tout l'UI, le plus simple et modulaire possible (Vue/React? ViewComponent?)
- Config facile pour adapter à d'autres départements (un config/barometre.yml)

- beaucoup d'autres choses...
