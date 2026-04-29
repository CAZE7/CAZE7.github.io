# Klima & Komfort (MQB)

Codierungen und Anpassungen für die Klimaanlage, Heizung und Komfortfunktionen auf der MQB-Plattform. Die meisten Anpassungen betreffen Steuergerät 08 (Klimaanlage) und Steuergerät 09 (BCM).

---

## Gebläsestufe im Auto-Modus anzeigen

Zeigt die aktuelle Gebläsestufe an, auch wenn der Klimaautomatik-Modus (AUTO) aktiv ist.

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 08 → Codierung:
    Byte 11 – Bit 6: Aktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! info "OBDeleven"
    ``` yaml
    Steuergerät 08 – Klimaanlage → Lange Codierung:
    Anzeige des Gebläsemodus im Automatikmodus: Aktivieren
    ```

!!! example "VCDS"
    ``` yaml
    08 – Klimaanlage
    Codierung - 07 → Lange Codierung:
    Byte 11 – Bit 6: Aktivieren
    Ausgang → Speichern
    ```

---

## Letzte Sitzheizungsstufe speichern

Speichert die zuletzt gewählte Sitzheizungsstufe dauerhaft, sodass sie beim nächsten Start automatisch wieder aktiv ist.

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 08 → Anpassung:
    Speicherung der Sitzheizungsstufe Fahrer: Aktivieren
    → Übernehmen
    Speicherung der Sitzheizungsstufe Beifahrer: Aktivieren
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml
    Steuergerät 08 → Anpassung:
    Sitzheizungsstufe Fahrer speichern: aktiv (vorher: aktiv 10 min)
    Sitzheizungsstufe Beifahrer speichern: aktiv
    ```

---

## Automatische Lenkradheizung

Die Lenkradheizung schaltet sich automatisch ein, wenn die Temperatur unter einen Schwellwert fällt.

!!! warning "Wichtig"
    Für Fahrzeuge ab 2020 nur mit ODIS E 12+ / ODIS S 6+ oder OBDeleven codieren. Bei älteren ODIS- oder VCDS-Versionen kann die Lenkradheizung komplett ausfallen!

!!! tip ""
    Zwei Modi verfügbar:
    
    * **Lenkradtemperatur** – Schaltet ein, wenn das Lenkrad kalt ist (gut für Langstrecke)
    * **Außentemperatur** – Schaltet immer ein, wenn die Außentemperatur niedrig ist

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 08 → Codierung:
    Heated_steering_wheel_automatic_mode:
    - Lenkradheizung, automatischer Modus: gewünschten Wert einstellen
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml
    Steuergerät 08 → Lange Codierung:
    Lenkradheizung, automatischer Modus: gewünschten Wert einstellen
    ```

!!! example "VCDS"
    ``` yaml
    08 – Klimaanlage → Codierung - 07 → Lange Codierung:
    Byte 13 – Bit 2: nach Lenkradsensor
    Byte 13 – Bit 3: nach Außentemperatur
    (Nicht beide gleichzeitig aktivieren!)
    Ausgang → Speichern
    ```

---

## Spiegelheizung mit Heckscheibenheizung koppeln (nicht Tiguan)

Die Außenspiegel werden automatisch beheizt, wenn die Heckscheibenheizung eingeschaltet wird.

!!! info ""
    Diese Codierung funktioniert nicht beim Tiguan. Für Tiguan siehe den nächsten Abschnitt.

!!! abstract "ODIS"
    ``` yaml title="Login: 31347"
    Steuergerät 09 → Codierung:
    Spiegelheizung aktiv bei Heckscheibenheizung: Aktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! example "VCDS"
    ``` yaml title="Login: 31347"
    09 – Bordnetzsteuergerät
    Codierung - 07 → Lange Codierung:
    Byte 15 – Bit 3: Aktivieren
    Ausgang → Speichern
    ```

---

## Spiegelheizung mit Heckscheibenheizung koppeln (Tiguan)

``` yaml
Steuergerät 52 → Codierung:
Byte 9 – Bit 2 (rear_window_heater_trigger): Aktivieren
```

``` yaml
Steuergerät 42 → Codierung:
Byte 9 – Bit 2 (rear_window_heater_trigger): Aktivieren
```

### Spiegelheizung als separater Menüpunkt anzeigen

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 19 → Anpassung:
    Efficiency_display:
    - Convenience_consumption_mirror_heating_dependency → Independent_of_outside_temperature_without_switch
    Range_gain:
    - Consumption_mirror_heating_in_heated_rear_window: Aktivieren
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml
    Steuergerät 19 → Anpassung:
    Effizienzanzeige:
    - Komfortverbrauch Spiegelheizung Abhängigkeit → Unabhängig von Außentemperatur ohne Schalter
    Reichweitenzugewinn:
    - Verbrauch Spiegelheizung in Heckscheibenheizung: Aktivieren
    ```

---

## Heizzeiten für Front- und Heckscheibe verlängern

!!! info ""
    Der Wert wird in Sekunden eingegeben. Beispiel: 1200 Sekunden = 20 Minuten.

### Heckscheibe

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Scheibenheizung:
- Heckscheibenheizung Zeitwert: 320 s → 640 s
- Abschalttemperatur für Heckscheibenheizung: 35.0 °C → 38.0 °C
→ Übernehmen
```

### Frontscheibe

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Scheibenheizung:
- Frontscheibenheizung Zeitwert: 320 s → 640 s
- Abschalttemperatur für Frontscheibenheizung: 35.0 °C → 38.0 °C
→ Übernehmen
```

---

## AirCare Climatronic aktivieren

AirCare leitet den Innenraumluft zusätzlich durch den Pollenfilter im Umluftbetrieb, um die Luftqualität zu verbessern.

!!! warning ""
    Voraussetzungen:
    
    * Climatronic-Steuergerät mit Firmware ab Version 1403
    * Gateway mit Firmware ab Version 1244/2244
    * MIB Infotainment (STD2/HIGH2) ab Baujahr 2016

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 08 → Codierung:
    filtering_interior_air: installed
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! example "VCDS"
    ``` yaml
    08 – Klimaanlage
    Codierung - 07 → Lange Codierung:
    Byte 15 – Bit 5-6 (Filterung der Innenraumluft): Aktivieren
    Ausgang → Speichern
    ```

---

## Schiebedach bei Regen automatisch schließen

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Access control 2:
- Regenschließen: permanently
- Regenschließen: Aktivieren
→ Übernehmen
```

``` yaml title="Login: 31347"
Steuergerät 09 → Codierung → Unterblock RLHS:
Byte 00 – Bit 1-2: Aktivieren
→ Übernehmen
```

---

## Siehe auch
* [Sicherheit & Zentralverriegelung](sicherheit.md) – ZV und Alarmanlage
* [Infotainment](infotainment.md) – MIB-Codierungen
* [Fahrwerk & Antrieb](fahrwerk.md) – Lenkung und DSG
