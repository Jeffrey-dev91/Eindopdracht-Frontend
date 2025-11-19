



# Amusement Parks USA - Eindopdracht Frontend NOVI Hogeschool



## Inhoudsopgave

1. Inleiding

2. Hoe ziet de App eruit?

3. Aan de examinator

4. Benodigheden

5. Applicatie installeren

6. Het Github Amusement Parks USA project clonen

7. De applicatie opstarten

8. Contact




## Inleiding

Ben je naar op zoek naar verschillende parken in de USA, dan is dit de app voor je!!
Met deze handige app zoek je snel naar jouw parken en sla je ze op als favoriet zodat je ze later weer terug kan bekijken.

**Amusement Parks USA** is de online app voor parken in de USA.


## Hoe ziet de App eruit?

![Amusement Parks USA ](src/assets/photos/readmefoto.gif)

## Aan de examinator

Beste examinator,
In de root van dit project is een .env dist bestand met daarin de namen van de variabelen.
Het oorspronkelijke .env bestand is niet aanwezig in de GITHUB repository en zal zelf moeten worden aangemaakt.

**Stappenplan**

1: Een .env bestand aanmaken en deze in de root van het project plaatsen.
2: De volgende variabelen en waarden in het .env bestand plaatsen.(waarden zijn meegeleverd in de PDF)

Neem de waarden over van de tabel of kopieer de code uit het codeblock on de tabel.
| Variabele           | Waarde                           |
| ------------------- | -------------------------------- |
| VITE_API_PARK_URL= |                                  |
| VITE_API_KEY_PARK= |                                  |
| VITE_API_KEY_NOVI_BACKEND=     |                                  |
| VITE_API_URL= |                                  |
| VITE_API_URL_AUTH=|                                  |

**.env bestand inhoud**:

```javascript
VITE_API_PARK_URL=''
VITE_API_KEY_PARK=''
VITE_API_KEY_NOVI_BACKEND=''
VITE_API_URL=''
VITE_API_URL_AUTH=''
```

## Benodigheden

Welke software heb je nodig?

De volgende software en tools:

- [NodeJS](https://nodejs.org/en)
- een terminal:
    - [Git Bash](https://git-scm.com/downloads)
    - Code editios/IDE:
    -   - [WebStorm](https://www.jetbrains.com/webstorm/)

## Applicatie installeren

Deze app maakt gebruikt van [React ViteJS](https://vitejs.dev).

Zorg er eerst voor dat je [NodeJS](https://nodejs.org/en) hebt geïnstalleerd op je computer.

De NodeJS LTS (Long Term Support) versie installeren.

Om te controleren of je NodeJS hebt geïnstalleerd, typ dan het volgende commando in de terminal:

```bash
node -v
```
Als de terminal een antwoord geeft, bijvoorbeeld: `v18.x.y`, dan is NodeJS correct geïnstalleerd.


### Het Github Amusement Parks USA project clonen
Dit project kun je downloaden naar je computer met de volgende commando's.

Kies SSH of de Https methode.

Clonen met SSH:

```bash
git clone git@github.com:Jeffrey-dev91/Eindopdracht-Frontend.git
```

Clonen met Https:

```bash
git clone https://github.com/Jeffrey-dev91/Eindopdracht-Frontend.git
```

**NPM dependencies installeren**

Als je het project gecloned hebt naar jouw lokale machine, installeer je eerst de node_modules door het volgende commando in de terminal te runnen:

```bash
npm install
```
## De applicatie opstarten

De volgende commando's zijn beschikbaar binnen ViteJS en zullen hierna kort worden besproken:
* `npm run dev`

* `npm run preview`

Wanneer de dependencies zijn geïnstalleerd, kun je de applicatie starten met behulp van: (__Let op!__: Dus niet met `npm start` zoals met Create React App)

Typ het volgende commando in de terminal om de ViteJS live server op te starten:

```bash
npm run dev
```

In de terminal komt nu een webadres te staan waar de live server komt te draaien. In het geval van ViteJS is dat: http://localhost:5173. Klik op deze link om de app in de browser te openen.

Om de live server te stoppen druk je op de volgende toetsencombinatie: `CTRL + C`.


### npm run preview
Dit commando start een lokale ViteJS live server op die de inhoud van ./dist serveert op het volgende adres en poortnummer:

http://localhost:4173/

```bash
npm run preview
```

## Contact

Mocht je nog vragen of opmerkingen hebben, kan je een bericht sturen naar jeffrey.helsper@novi-education.nl of stuur me een bericht via Teams.

Met vriendelijke groet,

Jeffrey Helsper
