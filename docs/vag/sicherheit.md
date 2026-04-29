# Sicherheit & Zentralverriegelung (MQB)

Codierungen und Anpassungen für die Zentralverriegelung, Alarmanlage und Zugangskontrolle auf der MQB-Plattform. Betrifft Steuergerät 09 (BCM) und Steuergerät B7 (Zugangsberechtigung / KESSY).

---

## Einzeltüröffnung (Einzeltür-Entriegelung)

Beim ersten Druck auf die Entriegelungstaste am Schlüssel öffnet sich nur die Fahrertür. Beim zweiten Druck (innerhalb von 5 Sekunden) öffnen sich alle Türen.

!!! abstract "ODIS"
    ``` yaml title="Login: 31347"
    Steuergerät 09 → Anpassung:
    Central Locking:
    - Einzeltür-Entriegelung: Aktivieren
    → Übernehmen
    ```

!!! example "VCDS"
    ``` yaml title="Login: 31347"
    09 – Bordnetzsteuergerät
    Codierung - 07 → Lange Codierung:
    Byte 0 – Bit 0 (Einzeltür-Entriegelung aktiv): Aktivieren
    Ausgang → Speichern
    ```

---

## Automatisches Verriegeln bei Fahrt / Entriegeln bei Zündung aus

``` yaml title="Login: 20103"
Steuergerät B7 → Anpassung:
ZV Autolock:
- Automatisches Entriegeln: Deaktivieren (Entriegelung beim Ausschalten unterbinden)
- Automatisches Verriegeln bei Geschwindigkeit: Deaktivieren (Verriegelung beim Fahren unterbinden)
→ Übernehmen
```

---

## Funkschlüssel bei laufendem Motor aktivieren

Ermöglicht das Bedienen der Zentralverriegelung per Funkschlüssel, auch wenn die Zündung eingeschaltet ist. So kann das Auto laufend abgeschlossen und per Fernbedienung wieder geöffnet werden.

!!! abstract "ODIS"
    ``` yaml title="Login: 31347"
    Steuergerät 09 → Anpassung:
    ZV allgemein (Zugangskontrolle):
    - Funk bei Klemme 15 ein: Aktivieren
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml title="Login: 31347"
    Steuergerät 09 → Anpassung:
    ZV allgemein:
    - Funk bei Klemme 15 ein: Aktivieren
    ```

---

## KESSY-Türgriffe bei laufendem Motor aktivieren

Die schlüssellose Bedienung (KESSY) funktioniert auch bei eingeschalteter Zündung.

!!! abstract "ODIS"
    ``` yaml
    Steuergerät B7 → Codierung:
    Terminal 15 characteristics of passive entry exit function:
    - Originalwert: Function only allowed for terminal 15 off
    - Neuer Wert: Function only allowed for terminal 15 on or off
    → Übernehmen
    ```

!!! example "VCDS"
    ``` yaml
    Steuergerät B7
    Codierung - 07 → Lange Codierung → ASAM-Daten erlauben:
    Byte 0 – Bit 4 (Terminal 15 characteristics of passive entry exit function): Aktivieren
    Ausgang → Speichern
    ```

---

## Automatisches Verriegeln beim Zuschlagen der Fahrertür

!!! abstract "ODIS"
    ``` yaml
    Steuergerät B7 → Codierung:
    Locking for door slamming active: Aktivieren
    → Übernehmen
    ```

!!! example "VCDS"
    ``` yaml
    Steuergerät B7
    Codierung - 07 → Lange Codierung → ASAM-Daten erlauben:
    Byte 1 – Bit 4 (Verriegelung bei Türzuschlag aktiv): Aktivieren
    Ausgang → Speichern
    ```

---

## Akustische Rückmeldung bei Zentralverriegelung (Signalhorn)

Das Fahrzeug bestätigt das Ver-/Entriegeln mit einem kurzen Hupton.

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Rückmeldungssignale:
- Akustische Rückmeldung Entriegeln: Aktivieren
- Akustische Rückmeldung Verriegeln: Aktivieren
- Menüsteuerung akustische Rückmeldung: Aktivieren
- Akustische Rückmeldung global: Aktivieren
- Akustische Rückmeldung Signalhorn: Aktivieren
→ Übernehmen
```

!!! tip ""
    Nach der Codierung muss im Infotainment-Menü ein entsprechender Haken gesetzt werden.

---

## Alarmanlage ohne Siren (Signalhorn) aktivieren

Das Fahrzeug hupt, wenn eine verriegelte Tür ohne Schlüssel geöffnet wird (z.B. bei eingeschlagenem Fenster).

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Anti-theft device:
- Akustischer Alarm Signalhorn: Aktivieren
- Diebstahlwarnanlage: Aktivieren
→ Übernehmen
```

---

## Empfindlichkeit des Innenraumsensors anpassen

Reduziert Fehlalarme durch Anpassung der Empfindlichkeit des Innenraumüberwachungssensors.

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Interior_Monitoring_Sensitivity:
- Empfindlichkeit: 70% (Standard: 100%)
→ Übernehmen
```

---

## Easy Open – Kofferraum per Fußbewegung öffnen

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Verdecksteuergerät:
- Virtuelles_Pedal_HMI_einstellbar: Aktivieren
- Virtuelles_Pedal_Verbau: Aktivieren
- Virtuelles_Pedal: Aktivieren
→ Übernehmen
```

``` yaml title="Login: 20103"
Steuergerät B7 → Anpassung:
Byte9_VIP:
- active_vip: Aktivieren
- Sensor 1, Schwellwert 1: 5 → 69
- Sensor 1, Timer 3: 0 → 9
- Sensor 1, Timer 4: 226 → 34
- Sensor 1, Timer 5: 255 → 34
- Sensor 2, Timer 5: 108 → 24
- Fahrzeugmodell: fe → 22
→ Übernehmen
```

!!! warning ""
    Nach der Codierung muss der Aktorentest `Control_supply_voltage_vip` durchgeführt werden.

---

## Kick Close – Kofferraum per Fußbewegung schließen

!!! info ""
    Für den Tiguan muss die Firmware in Steuergerät B7 mindestens Version N sein. Für den Superb reicht Version L.

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
- Kick_and_close: installed
→ Übernehmen
```

``` yaml title="Login: 31347"
Steuergerät B7 → Anpassung:
- Coding_kick_and_close_function: Aktivieren
- Coding_easyclose_locking: Aktivieren
→ Übernehmen
```

---

## Kofferraum-Verriegelung bei Easy Close

Das Fahrzeug verriegelt sich automatisch komplett, wenn der Kofferraum über die Easy-Close-Taste geschlossen wird.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät B7 → Codierung:
    byte9_Vip:
    - Coding_easyclose_locking: Aktivieren
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml title="Login: 20103"
    Steuergerät B7:
    byte9_Vip:
    - Coding easy close locking: Aktivieren
    ```

---

## Schiebedach per Funkschlüssel öffnen/schließen

Das Schiebedach kann durch langes Drücken der Auf-/Zu-Tasten am Schlüssel geöffnet und geschlossen werden.

``` yaml title="Login: 31347"
Steuergerät 09 → Anpassung:
Schiebedach:
- SAD Komfort schließen: Aktivieren
- SAD Komfort öffnen: Aktivieren
→ Übernehmen
```

### Schiebedach komplett öffnen (statt nur Kippen)

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 00CA → Anpassung:
    Komfortfunktionen:
    - Komfort-Öffnung Zielposition: Kippposition → Schiebebposition
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml
    Steuergerät 00CA → Anpassung:
    Komfortfunktionen:
    - Zielposition beim komfortablen Öffnen: Kippposition → Schiebeposition
    → Übernehmen
    ```

---

## Fensterheber bei ausgeschalteter Zündung

Die Fensterheber funktionieren weiterhin nach dem Ausschalten der Zündung, bis eine Tür geöffnet wird.

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 09 → Anpassung:
    Zugangskontrolle (ZV Komfort):
    - Freigabenachlauf FH bei Türöffnen abbrechen: Aktiv → Nicht Aktiv
    - FH SAD Kl15Aus Freigabezeit: 600 s (auf gewünschten Wert in Sekunden ändern)
    → Übernehmen
    ```

!!! info "OBDeleven"
    ``` yaml title="Login: 31347"
    Steuergerät 09 → Codierung:
    ZV Komfort:
    - Freigabenachlauf FH bei Türöffnen abbrechen: Aktivieren
    ```

---

## Easy Entry – Komfortsitz (Sitz fährt bei Ausstieg zurück)

Die Sitzposition fährt nach dem Ausschalten der Zündung und Öffnen der Tür automatisch zurück, um den Ausstieg zu erleichtern. Beim Einschalten fährt der Sitz wieder in die Fahrposition.

### Fahrersitz

``` yaml
Steuergerät 36 → Codierung:
Byte 3 – Bit 1 (Easy_Entry_front): Aktivieren
Byte 9 – Bit 6 (Easy_Entry_front_over_MMI): Aktivieren
→ Übernehmen (mit Neustart des Steuergeräts)
```

``` yaml
Steuergerät 5F → Anpassung:
Car_Function_Adaptations_Gen2:
- menu_display_seat_configuration: Aktivieren
- menu_display_seat_configuration_over_threshold_high: Aktivieren
→ Übernehmen

Car_Function_List_BAP_Gen2:
- driver_seat_0x10: Aktivieren
- driver_seat_0x10_msg_bus: CAN_Comfort
→ Übernehmen
```

### Beifahrersitz

``` yaml
Steuergerät 36 → Codierung:
Byte 6 – Bit 4 (EasyEntry_Enable_Passenger_over_DriverMMI): Aktivieren
→ Übernehmen (mit Neustart des Steuergeräts)
```

``` yaml
Steuergerät 06 → Codierung:
Byte 3 – Bit 1 (Easy_Entry_front): Aktivieren
Byte 9 – Bit 6 (Easy_entry_front_over_MMI): Aktivieren
Byte 6 – Bit 4 (EasyEntry_Enable_Passenger_over_DriverMMI): Aktivieren
→ Übernehmen (mit Neustart des Steuergeräts)
```

---

## Druckausgleich beim Türschließen (Skoda)

Bei geschlossenen Fenstern senkt sich das Seitenfenster beim Schließen der Tür um ca. 1 cm ab, um den Innendruck auszugleichen.

``` yaml
Steuergerät 42 → Codierung:
Short_drop: Aktivieren
→ Übernehmen
```

``` yaml
Steuergerät 52 → Codierung:
Short_drop: Aktivieren
→ Übernehmen
```

---

## Siehe auch
* [Klima & Komfort](klima.md) – Heizung und Klimaanlage
* [Fahrwerk & Antrieb](fahrwerk.md) – Lenkung und DSG
* [Kombiinstrument](kombiinstrument.md) – Tacho-Codierungen
