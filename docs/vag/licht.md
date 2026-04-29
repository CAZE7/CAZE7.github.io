---
title: VAG Licht-Codierung (MQB) | Steuergerät 09 BCM Anpassungen
description: Umfassende Anleitung zur Codierung der Beleuchtung auf der VAG MQB-Plattform über das Steuergerät 09 (BCM). Tagfahrlicht, Blinker, Coming Home.
keywords: VAG, MQB, Licht Codierung, Steuergerät 09, BCM, Tagfahrlicht, DRL, Coming Home, Leaving Home, Nebelscheinwerfer
---
# Licht-Codierung (MQB)

Umfassende Anleitung zur Codierung der Beleuchtung auf der MQB-Plattform. Die Lichtkanäle werden über das Steuergerät 09 (BCM / Bordnetzsteuergerät) verwaltet.

---

## Grundstruktur der Lichtkanäle

Jedes Leuchtmittel im Fahrzeug wird über einen numerierten Kanal angesteuert. Die Kanäle heißen z.B. `Leuchte9FL RB2` und folgen der Nomenklatur:

* **Leuchte** – Lampe
* **9** – Kanalnummer
* **FL** – Funktion (z.B. Fernlicht)
* **R** – Seite (Rechts/Links)
* **B2** – Anschluss am BCM (Stecker B, Pin 2)

!!! info ""
    Verschiedene Fahrzeuge (Tiguan, Golf, Passat, Skoda) können unterschiedliche Zuordnungen der Lampen zu den Kanälen haben.

---

## Funktionskürzel der Beleuchtung

* **ABL** – Abblendlicht
* **FL** – Fernlicht
* **TFL** – Tagfahrlicht / DRL
* **SL** – Standlicht / Begrenzungsleuchte
* **BLK** – Blinker
* **BR** – Bremslicht
* **NL** – Nebelscheinwerfer vorne
* **NSL** – Nebelschlussleuchte hinten
* **RFL** – Rückfahrlicht
* **KZL** – Kennzeichenleuchte
* **FR** – Fußraumlicht
* **AMBL** – Ambientebeleuchtung
* **HD** – Heckdeckel (Kofferraum)

---

## Lampentypen (Lasttypen)

Jeder Lampe wird ein Typ zugeordnet, der den physischen Typ des Leuchtmittels beschreibt. Die wichtigsten Typen:

* **5** – LED Abblendlicht
* **6** – LED Lichtmodul
* **8** – Glühlampe 12W
* **9** – Glühlampe 27W (auch H15)
* **11** – Abblendlicht (Halogen)
* **12** – Blinkleuchten
* **13** – Bremsleuchten
* **32** – Allgemeine LED bis 12W
* **33** – LED-Modul Blinkleuchten
* **34** – LED Bremsleuchten
* **36** – LED Kleinleistung
* **42** – LED dritte Bremsleuchte
* **44** – LED Fußraum-/Innenleuchte

---

## Funktionsgruppen (Ketten)

Jede Lampe kann bis zu **8 Lichtfunktionen** (A bis H) und **4 Helligkeitswerte** haben.

Die Funktionen sind in Paaren organisiert: **AB**, **CD**, **EF**, **GH**. Jedes Paar teilt sich eine Helligkeitseinstellung (Dimmwert) und eine Dimmrichtung.

**Priorität:** GH > EF > CD > AB. Ein Ereignis mit höherer Priorität überschreibt das aktuelle.

!!! warning ""
    Wenn ein Blinker in den Gruppen AB und CD codiert ist und der Nebelscheinwerfer als Funktion E, leuchtet der Blinker dauerhaft, sobald der Nebelscheinwerfer eingeschaltet wird!

---

## Die wichtigsten Lichtfunktionen

* **nicht aktiv** – Nicht eingeschaltet
* **aktiv 100%** – Dauerhaft eingeschaltet
* **Standlicht allgemein** – Leuchtet im Begrenzungslicht-Modus
* **Abblendlicht links / rechts** – Leuchtet bei Abblendlicht
* **Fernlicht links / rechts** – Leuchtet bei Fernlicht
* **Lichthupe generell** – Leuchtet beim Fernlicht-Blinken
* **Tagfahrlicht** – Leuchtet bei DRL
* **Bremslicht** – Leuchtet beim Bremsen
* **Rueckfahrlicht** – Leuchtet bei eingelegtem Rückwärtsgang
* **Blinken links/rechts Hellphase** – Leuchtet beim Aufblinken
* **Nebellicht links / rechts** – Leuchtet bei Nebelscheinwerfer
* **Coming Home / Leaving Home aktiv** – Leuchtet bei Coming-/Leaving-Home
* **Innenlicht** – Schaltet sich sanft ein beim Öffnen einer Tür
* **Fussraumlicht** – Fußraumbeleuchtung
* **Ambientelicht 1-5** – Ambientebeleuchtung

---

## Helligkeit (Dimmwert)

Jedes Funktionspaar hat einen Dimmwert:

* **Halogenlampen:** Regelung von 0 bis 100
* **LEDs:** Regelung von 0 bis 127

!!! info ""
    Bei Wert **127** reagieren LEDs nicht mehr auf Dimmung, es funktioniert nur noch Ein/Aus. Bei **126** bleibt die Dimmung erhalten, die maximale Helligkeit ist aber höher.

!!! warning ""
    Nicht alle LEDs unterstützen Dimmung. Bei zu niedrigen Werten (unter 25) kann der Kanal einen Fehler ausgeben.

---

## Dimmrichtung

* **maximize** – Helligkeit wird auf den eingestellten Wert **erhöht**
* **minimize** – Helligkeit wird auf den eingestellten Wert **reduziert**

Die Gruppe AB hat keine Dimmrichtung. Stattdessen gibt es `Lichtansteuerung HD AB` (Heckdeckel), die entweder `Always` oder `only_if_closed` sein kann.

---

## Praxisbeispiel: Nebelscheinwerfer bei Lichthupe mitblinken

Wir möchten, dass die Nebelscheinwerfer beim Betätigen der Lichthupe mitblinken.

1. Die richtigen Kanäle finden: `Leuchte12NL LB45` (links) und `Leuchte13NL RB5` (rechts)
2. Eine freie Funktionsgruppe suchen (z.B. CD)
3. Für die linke Seite codieren:
    ```
    Lichtfunktion C 12: Lichthupe generell
    Dimming direction CD 12: maximum
    Dimmwert CD 12: 0 → 100
    ```
4. Für die rechte Seite codieren:
    ```
    Lichtfunktion C 13: Lichthupe generell
    Dimming direction CD 13: maximum
    Dimmwert CD 13: 0 → 100
    ```

---

## Basiskalibrierung der Scheinwerfer (AFS)

Wird durchgeführt, wenn ein AFS-Fehler vorliegt. Motor muss laufen und Scheinwerfer eingeschaltet sein.

``` yaml title="Login: 20103"
Steuergerät 4B → Grundeinstellungen (04):
Basiskalibrierung der Scheinwerfer (002) → Auslesen
- Lenkrad nach links bis zum Anschlag drehen und 3 Sekunden halten
- Lenkrad nach rechts bis zum Anschlag drehen und 3 Sekunden halten
- Lenkrad geradeaus stellen und 3 Sekunden warten → Speichern
Bestätigung der Basiskalibrierung (003) → Übernehmen
```

---

## Siehe auch
* [Kombiinstrument](kombiinstrument.md) – Tacho-Codierungen
* [Infotainment](infotainment.md) – Head-Unit-Codierungen
* [Klima & Komfort](klima.md) – Klimaanlage und Heizung
