# README

## Objectifs

- Agenda culturel de Loire-Atlantique visant en gros à imiter ce que fait [TyZicos](https://www.tyzicos.com/) en Bretagne.
- Concerts, jams sessions & open mics
- Liste spécifiquement les événements modestes en entrée libre ou peu coûteuse (typiquement dans les bars)
- 100% francophone
- API JSON en lecture seule (?) pour servir les informations sur les évènements et les lieux associés.
- Stack 100% open source (excepté GitHub...), de la conception au déploiement
- Pas d'inscription utilisateur. Les événements (et lieux) proposés doivent être validés par un admin

## Todo

Voir [Roadmap](ROADMAP.md)

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

gh repo fork ocgg/barometre-rails
cd barometre-rails
bundle install
rails db:create db:migrate db:seed
dev
```
