# Fahrwerk & Antrieb (MQB)

Codierungen und Anpassungen für Lenkung, Bremsen, DSG-Getriebe und Fahrassistenten auf der MQB-Plattform.

---

## Lenkungsprofil ändern (Servolenkung)

Ändert das Ansprechverhalten der elektromechanischen Servolenkung. Der Fahrer kann zwischen verschiedenen Profilen wählen.

!!! tip ""
    **Direct** – Der Lenkwiderstand ist von Anfang an hoch (sportlich).
    **Incremental** – Der Lenkwiderstand nimmt mit steigender Geschwindigkeit zu (komfortabel bis sportlich).

``` yaml title="Login: 19249"
Steuergerät 44 (Lenkhilfe) → Codierung:
Auswahl des aktiven Fahrprofils: Aktivieren
→ Übernehmen

Steuergerät 44 (Lenkhilfe) → Anpassung:
Kennlinie der Lenkhilfe: Dynamik
Umschaltung Fahrprofil: Incremental
→ Übernehmen
```

---

## Anhängerstabilisierung deaktivieren

Deaktiviert die Anhängerstabilisierungsfunktion des ESP, z.B. wenn kein Anhängerbetrieb vorgesehen ist.

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 03 → Codierung:
    - Anhängerstabilisierung: Deaktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! example "VCDS"
    ``` yaml
    Steuergerät 03 – ABS → Anpassung:
    - Kanal 56: 1 = ein, 0 = aus
    Ausgang → Speichern
    ```

---

## Sanftes Anfahren mit AutoHold

Beseitigt den leichten Ruck beim Anfahren mit eingeschaltetem AutoHold. Das Fahrzeug fährt nach der Anpassung deutlich sanfter an.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät 03 – ABS/ESP → Anpassung:
    Drive_away_assist_control (Dynamischer Anfahrassistent): Früh
    Hill_hold_assist_control (Berganfahrassistent): Früh
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml title="Login: 20103"
    Steuergerät 03 → Anpassung:
    Dynamischer Anfahrassistent: früh
    Berganfahrassistent: früh
    ```

---

## Gaspedal-Ansprechzeit ändern

Passt die Reaktionszeit des Gaspedals an. Nützlich für eine direktere oder komfortablere Gasannahme.

``` yaml title="Login: 27971 oder 19249"
Steuergerät 44 → Anpassung:
Umschaltung Fahrprofil: Unmittelbar, Schwellwertsteuerung
→ Übernehmen
```

---

## DSG-7 Adaption (Grundeinstellung)

Kalibriert die Doppelkupplung des DSG-7-Getriebes neu. Empfohlen nach längerer Nutzung, bei Schaltrucken oder nach einem Kupplungswechsel.

!!! warning ""
    Motor und Getriebe müssen vor der Adaption mindestens eine Stunde warmgefahren werden!

**Schritt 1: Schnelladaption der Kupplung** (Motor aus, Zündung an)
``` yaml
Steuergerät 02 → Elektronik Getriebe → Grundeinstellungen:
Schnelladaption der Doppelkupplungsmuffe starten
→ Auf Abschlussmeldung warten
```

**Schritt 2: Zündung ausschalten**

**Schritt 3: Grundeinstellung Getriebe** (Motor starten, Handbremse an, Bremse nicht treten, Gang P)
``` yaml
Steuergerät 02 → Elektronik Getriebe → Grundeinstellungen:
Grundeinstellung Getriebe
→ Auf Abschlussmeldung warten (es kann zu Geräuschen und leichten Rucklern kommen, das ist normal)
```

---

## Steuergeräte-Zugangscodes (MQB-Plattform)

Für die Codierung verschiedener Steuergeräte werden Login-Codes benötigt. Hier die wichtigsten:

* **Steuergerät 01** (Motor) – Code: 27971
* **Steuergerät 03** (ABS/ESP) – Codes: 20103, 40168, 11966, 25004 (je nach Anpassung)
* **Steuergerät 09** (BCM / Bordnetzsteuergerät) – Code: 31347
* **Steuergerät 13** (ACC / Abstandstempomat) – Codes: 20103, 14117
* **Steuergerät 17** (Kombiinstrument) – Code: 20103
* **Steuergerät 18** (Standheizung) – Code: 80782
* **Steuergerät 44** (Lenkhilfe) – Code: 19249
* **Steuergerät 5F** (Infotainment / MMI) – Code: 20103
* **Steuergerät 65** (Reifendruckkontrolle) – Code: 20103
* **Steuergerät A5** (Kamera-Assistenten) – Code: 20103
* **Steuergerät B7** (Zugangsberechtigung / KESSY)

!!! warning "SFD-Hinweis"
    Bei Fahrzeugen ab Modelljahr 2021 muss für Schreibzugriffe:
    
    * Die **Motorhaube geöffnet** sein
    * Die **Handbremse angezogen** sein

---

## Siehe auch
* [Kombiinstrument](kombiinstrument.md) – Tacho-Codierungen
* [Sicherheit & ZV](sicherheit.md) – Zentralverriegelung und Komfort
* [Software & Sicherheit](software.md) – SFD, ODIS und Tools
