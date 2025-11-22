# WIP

## FIXES

[=> GH issues](https://github.com/ocgg/barometre-rails/issues)

## ROADMAP

1. ~Étendre l'app à la Bretagne (le Ty-Zicos est mort, vive le Ty-Zicos)~
  - Adapter les tests

2. Geoloc: message (modale) si user pas dans en Bretagne/Loire-Atlantique

3. Divers ajustements UX
  - gestion flashes
  - affichage mobile
  - datepicker plus petit
  - footer
  - events#new: ne pas submit quand on appuie sur entrée
  - message à propos de la beta version
  - (beta): facilités de contact (lien visible)

4. **Mise en prod** (beta test)

## TODO

- Popup (flash alert) avec OK + cookie pour ne pas le réafficher
- Ne pas créer de Venues dans seeds.rb (proposer de lancer venues_seeds.rb)

- commenter le code, refactoriser rails way

- update event mobile card: la même que sur map

- venues+admin: transfert d'events de venue à venue en cas de doublons

- liens sur les cards pour aller vers la map

- searchbar:
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
  - informer le user au cas où il n'est pas localisé en Bretagne/Loire-Atlantique & de la précision de l'API

- Contact mail: action text

- events#new:
  - address autocomplete [API adresses](https://adresse.data.gouv.fr/outils/api-doc/adresse)
  - option événements récurents
  - option concert chez l'habitant
  - dans ce cas: option pour supprimer le lieu de la DB après l'événement

- Refaire tout l'UI, le plus simple et modulaire possible (Vue/React? ViewComponent?)
- Config facile pour adapter à d'autres départements (un config/barometre.yml)
