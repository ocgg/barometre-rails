## WIP

- z-index markers marche pas bien sur event hover
- rendre les espaces vides de main "transparents" à la souris (accès à la map)
- scroller vers l'event au click sur marker, même après dragging de la liste
- ne pas ouvrir le calendrier si on mouseup sur event-days-ctn après dragging (élément séparé pour le drag)

## FIXES

- events#edit: bouger l'event de jour quand on modifie sa date
- container de jours possiblement dupliqué lors de la pagination
- Chrome: searchbar: layout bug entre entre 768-780px~ (problème de @container)
- éléments de la searchbar ne doivent pas bouger quand on "ouvre" le calendrier ou la loc
- il semble que quand les events sont récupérés avec ajax, la timezone est pas prise en compte (p.e. un evt du 2 juin à 00h40 est affiché le 1er juin)

## ROADMAP

1. Geoloc: message (modale) si user pas dans le 44

2. Map
  - Si geoloc: afficher la distance
  - !! FRONT MOBILE !!

3. Divers ajustements UX
  - gestion flashes
  - largeur navbar
  - affichage mobile
  - datepicker plus petit
  - footer
  - events#new: ne pas submit quand on appuie sur entrée

4. **Mise en prod**

## TODO

- venues+admin: transfert d'events de venue à venue en cas de doublons

- liens sur les cards pour aller vers la map

- searchbar (elasticsearch?):
  - insensible à la casse & accents (e = é = è...)
  - conserver la recherche d'une page à l'autre
  - garder la query string dans l'url (pouvoir bookmark la recherche) (data: {turbo_action: :advance})

- Jobs:
  - geocode & mailer: si erreur, attendre quelques secondes et recommencer
  - Job nettoyage de DB

- datepicker:
  - jours à notifier/griser/...
  - prévisualiser la range au hover

- Pages admin:
  - front pour sessions#new
  - events#unverified: intégrer barre de recherche
  - venues#geocode: spinner & turbo stream

- ...

## MAYDO

- Vue calendrier

- search, form: gérer l'affichage façon v-cloak

- Backend: revoir gestion user

- Même les events non validés sont visibles par tous
  - tout le monde peut éditer, façon article wiki
  - faire une show avec des infos optionnelles (photo, rich text, liens)

- CSS/Tailwind:
  - `<i>` à la place des svg
  - thème sombre

- datepicker:
  - option dateFormat dans datepicker
  - package NPM

- locationfilter:
  - informer le user au cas où il n'est pas localisé en Loire-Atlantique & de la précision de l'API

- Contact mail: action text

- events#new:
  - address autocomplete [API adresses](https://adresse.data.gouv.fr/outils/api-doc/adresse)
  - option événements récurents
  - option concert chez l'habitant
  - dans ce cas: option pour supprimer le lieu de la DB après l'événement

- Refaire tout l'UI, le plus simple et modulaire possible (Vue/React? ViewComponent?)
- Config facile pour adapter à d'autres départements (un config/barometre.yml)
