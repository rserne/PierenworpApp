# Pierenworp

Een dobbelspel voor twee tot zes spelers. Gooi acht stenen, leg telkens één waarde apart en verzamel tegels met zoveel mogelijk pieren. Speel tegen de computer of met vrienden op hetzelfde toestel.

De app is een PWA: je zet hem op het beginscherm van je telefoon, en na het eerste bezoek werkt hij ook offline.

## Inhoud

| Bestand | Functie |
| --- | --- |
| `index.html` | Het spel |
| `manifest.webmanifest` | Naam, kleuren en iconen voor het beginscherm |
| `sw.js` | Service worker, voor offline spelen |
| `icon-*.png`, `apple-touch-icon.png` | App-iconen |
| `favicon.ico`, `favicon-32.png` | Icoontje in browsertabbladen en favorieten |

## Online spelen

Online spelen loopt via Firebase (project *pierenworp-asia*): anoniem inloggen en een Realtime Database in asia-southeast1 (Singapore). Een spel staat onder `pierenworp/rooms/CODE` als `{ d, rev, t }`: `d` is de spelstand als JSON-tekst, `rev` een volgnummer dat bij elke zet ophoogt. De verbindingsgegevens staan bovenin het script van `index.html` (`FIREBASE_CONFIG`); die zijn niet geheim.

Testen zonder Firebase kan met een nep-database: open het spel met `?mock` achter het adres in twee vensters van dezelfde browser.

## Online zetten

Een PWA werkt alleen via https. Gratis hosten kan in twee minuten:

1. Pak de zip uit.
2. Ga naar [app.netlify.com/drop](https://app.netlify.com/drop) en sleep de uitgepakte map erop.
3. Je krijgt een https-adres waarop het spel draait.

GitHub Pages, Cloudflare Pages of je eigen webhosting werken ook.

## Op je telefoon zetten

- **iPhone (Safari):** open het adres, tik op de deelknop en kies *Zet op beginscherm*.
- **Android (Chrome):** open het adres, open het menu (drie puntjes) en kies *App installeren*.

## Lokaal testen

Dubbelklikken op `index.html` werkt, maar dan doet de offlinefunctie niet mee. Start daarom in de map een kleine webserver:

```sh
python3 -m http.server 8000
```

Open daarna http://localhost:8000 in je browser.

## Een nieuwe versie uitrollen

Verhoog in `sw.js` het versienummer, bijvoorbeeld van `pierenworp-v22` naar `pierenworp-v23`, en zet de bestanden op GitHub.

Wie de app open heeft, krijgt dan bovenin de melding *Er is een nieuwe versie van Pierenworp*. Een tik op **Vernieuwen** laadt de nieuwe versie meteen; een lopend spel blijft bewaard. De app zoekt naar updates bij het openen en elk half uur.
