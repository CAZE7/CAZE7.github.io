---
title: VAG Kombiinstrument & Active Info Display Codierung (MQB)
description: Codierungen und Anpassungen für die Instrumententafel (Steuergerät 17) auf der MQB-Plattform. Zeigertest, Gurtwarner, Nachtankmenge.
keywords: VAG, MQB, Kombiinstrument, Active Info Display, Steuergerät 17, Zeigertest, Gurtwarner, Laptimer, Codierung
---
# Kombiinstrument / Active Info Display (MQB)

Codierungen und Anpassungen für die Instrumententafel (Steuergerät 17) auf der MQB-Plattform. Die meisten Anpassungen funktionieren sowohl mit analogen als auch mit digitalen Kombiinstrumenten (Active Info Display).

!!! warning "Hinweis"
    Alle Codierungen am Steuergerät 17 müssen bei **eingeschalteter Zündung und ausgeschaltetem Motor** durchgeführt werden.

---

## Zeigertest (Needle Sweep / Staging)

Beim Einschalten der Zündung schwenken die Tachonadeln einmal bis zum Anschlag und wieder zurück.

!!! info ""
    Funktioniert nur beim Active Info Display der ersten Generation (5NA920790A/B/C, 5NA920791A/B/C). Die zweite Generation (5NA920790D) wird nicht unterstützt.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät 17 → Codierung:
    Demonstration: Aktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! info "OBDeleven"
    ``` yaml title="Login: 20103"
    Steuergerät 17 – Kombiinstrument → Lange Codierung:
    Demonstration: ja
    ```

!!! example "VCDS"
    ``` yaml title="Login: 20103"
    17 – Schalttafeleinsatz → Codierung - 07 → Lange Codierung:
    Byte 1 – Bit 0 (Gauge test / Needle Sweep / Staging): Aktivieren
    Ausgang → Speichern
    ```

---

## Tankrestanzeige (Nachtankmenge)

Zeigt auf dem Display an, wie viel Liter noch getankt werden können.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät 17 → Codierung:
    Objektiv, das nachgefüllt werden muss: Aktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! info "OBDeleven"
    ``` yaml title="Login: 20103"
    Steuergerät 17 – Kombiinstrument → Lange Codierung:
    Volumen, das nachgefüllt werden muss: ja
    ```

!!! example "VCDS"
    ``` yaml title="Login: 20103"
    17 – Schalttafeleinsatz → Codierung - 07 → Lange Codierung:
    Byte 10 – Bit 4 (Nachtankmenge): Aktivieren
    Ausgang → Speichern
    ```

!!! tip ""
    Die Anzeige erfolgt in 5-Liter-Schritten (5, 10, 15, 20 usw.). In der Praxis passen meist 1-2 Liter mehr als angezeigt.

---

## Rundentimer

Aktiviert einen Rundentimer im Kombiinstrument, z.B. für die Rennstrecke.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät 17 → Codierung:
    Rundentimer: Aktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! example "VCDS"
    ``` yaml title="Login: 20103"
    17 – Schalttafeleinsatz → Codierung - 07 → Lange Codierung:
    Byte 1 – Bit 3 (Rundentimer aktiv): Aktivieren
    Ausgang → Speichern
    ```

---

## Momentanverbrauch-Anzeige

Aktiviert die Anzeige des aktuellen Kraftstoffverbrauchs in Echtzeit.

``` yaml title="Login: 20103"
Steuergerät 17 → Anpassung:
Instantaneous Consumption Display: Display
→ Übernehmen
```

---

## Gurtwarner deaktivieren

Deaktiviert die akustische und visuelle Warnung bei nicht angelegtem Sicherheitsgurt.

!!! tip ""
    Nützlich in seltenen Fällen bei kurzen Rangierfahrten. Im normalen Straßenverkehr sollte der Gurt immer angelegt sein!

``` yaml title="Login: 20103"
Steuergerät 17 → Anpassung:
Deaktivierung der Sicherheitsgurt-Warnung: ja
→ Übernehmen
```

---

## Zündungswarnung bei offener Tür deaktivieren

Schaltet den Piepton ab, der ertönt, wenn bei eingeschalteter Zündung eine Tür geöffnet wird.

``` yaml title="Login: 20103"
Steuergerät 17 → Anpassung:
Ignition active message; trigger: Keine Anzeige
→ Übernehmen
```

!!! tip ""
    Drei Optionen stehen zur Verfügung: Keine Anzeige, Fahrertür, Alle Türen.

---

## Spidometer-Varianten (Zwischenwerte)

Ändert die Zwischenwert-Markierungen auf der Tachoskala. Funktioniert nur bei AID-Panelen ab Modelljahr 2019 (5NA920790D). In allen Varianten ist 100 km/h oben.

``` yaml title="Login: 20103"
Steuergerät 17 → Anpassung:
Endwert des Geschwindigkeitsmessers / Speedometer_final_value: Variante_4 (Standard: Variante_1)
→ Übernehmen
```

---

## Tacho-Skin ändern

Ändert das visuelle Thema der Instrumentenanzeige (Hintergrundbild/Animation).

### AID Generation 1 (5NA920790A/B/C)

Die Themes werden über zwei Parameter kombiniert:

``` yaml title="Login: 20103"
Steuergerät 17 → Codierung:
Tube_version: 0..9
Vehicle variant: 0..9
→ Übernehmen
```

* **Tube_version 0, 5-9** – Standard-Theme
* **Tube_version 1** – Standard mit mehr Punkten
* **Tube_version 2** – Alltrack-Theme
* **Tube_version 3** – GTI / GTD-Theme
* **Tube_version 4** + Vehicle variant 2 oder 4 – R-Line-Theme
* **Tube_version 4** + Vehicle variant 6 oder 8 – R-Line-Theme mit Logo

### AID Generation 2 (5NA920790D)

``` yaml title="Login: 20103"
Steuergerät 17 → Codierung:
Tube_version:
- Skinning: 0..9
→ Übernehmen
```

---

## R-Line Logo (nur AID Generation 2)

``` yaml title="Login: 20103"
Steuergerät 17 → Anpassung:
R_Logo: gewünschte Variante wählen
→ Übernehmen
```

Varianten: Ohne Logo, R-Logo, R-Line-Logo, R-Logo ab Facelift (25/19), R-Line-Logo ab Facelift (25/19).

---

## Anzeige-Stil ändern

Ändert die Darstellung des zentralen Bereichs der Instrumententafel.

* **Variante 1** – Klassisch
* **Variante 3** – Punkte/Carbon-Optik

``` yaml title="Login: 20103"
Steuergerät 17 → Anpassung:
Darstellung auf dem Display: Variante_3 (Standard: Variante_1)
→ Übernehmen
```

---

## Anzeige von Anruferfotos und Albumcovern

Zeigt auf dem Kombiinstrument das Foto des Anrufers, Albumcover oder Radiosender-Logos an.

``` yaml title="Login: 20103 oder 47115"
Steuergerät 17 → Anpassung:
Picture_Upload_Download: Aktivieren
→ Übernehmen
```

---

## Serviceintervall zurücksetzen

``` yaml title="Login: 20103"
Steuergerät 17 → Anpassung:
Zurücksetzen der erweiterten Service-Intervallzähler: Zurücksetzen
→ Übernehmen
```

---

## Spidometer-Korrektur (Reifenumfang)

Bei Änderung der Reifengröße kann der Tacho angepasst werden.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät 17 → Codierung:
    Reifenumfang / Tire Circumference: Variante 3
    → Übernehmen
    ```

!!! example "VCDS"
    ``` yaml title="Login: 20103"
    17 – Schalttafeleinsatz → Codierung - 07 → Lange Codierung:
    Byte 3 – Bit 0-2: Variante 3
    Ausgang → Speichern
    ```

!!! tip ""
    Für jede Reifengröße muss individuell der passende Wert ermittelt werden.

---

## Personalisierung aktivieren

Aktiviert die Profilfunktion, bei der verschiedene Benutzer ihre Einstellungen (Sitz, Spiegel, Klima) im Fahrzeug speichern können.

``` yaml title="Login: 20103"
Steuergerät 17 → Codierung:
Byte 10 – Personalisierung: Ein
→ Übernehmen
```

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Personalisierung:
- Personalisierung_Profilfunkion → profiles_active
- Personalisierung_aktiv → Active
- Aktivierungsoption_im_HMI-Menue_sichtbar → Active
- Benutzerkontenverwaltung_in_HMI-Menue_sichtbar → Active
- Personalisierungsfunktionen_in_HMI-Menue_sichtbar → Active
→ Übernehmen
```

!!! tip ""
    Nach der Codierung: Auto verriegeln, Profile in der Infotainment-Einstellung anlegen und anschließend `Profil_Variante` zwischen `Konto (v. 1.x)` und `Konto (v. 2.x)` wechseln.

---

## Siehe auch
* [Infotainment & Head-Unit](infotainment.md) – MIB-Codierungen
* [Praxis-Codierungen](anleitungen.md) – Allgemeine Workflows
