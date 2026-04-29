# Infotainment & Head-Unit (MQB)

Codierungen und Anpassungen für das Infotainment-System (Steuergerät 5F) auf der MQB-Plattform. Betrifft Discover Media, Discover Pro, Composition Media und kompatible Geräte.

---

## Entwicklermenü freischalten

Ermöglicht den Zugang zu erweiterten Einstellungen und Diagnose-Informationen direkt am Infotainment-System.

!!! tip ""
    Vor der Aktivierung muss ODIS E ggf. in den Programmiermodus versetzt werden.

``` yaml title="Login: 12345"
Steuergerät 5F → Anpassung:
Entwicklermodus: Aktivieren
→ Übernehmen
```

---

## Fahrzeug-Skin (Marke/Modell) ändern

Bei einem Tausch der Head-Unit kann es vorkommen, dass das Profil eines anderen VW-Modells hinterlegt ist. Hier am Beispiel VW Tiguan:

``` yaml
Steuergerät 5F → Codierung:
byte_0_brand: _VW
byte_1_Car_Class: 3
byte_1_Car_Generation: 7
byte_2_Car_Derivate: 6
byte_2_Car_Derivate_Supplement: 0
→ Übernehmen
```

---

## Zwei Telefone gleichzeitig per Bluetooth verbinden

Ermöglicht das parallele Koppeln von zwei Smartphones über Bluetooth.

``` yaml
Steuergerät 5F → Anpassung:
function_configuration_phone:
- Support_second_phone: none → gewünschten Wert einstellen
- Support_for_response_and_hold: off → on
- Dtmf_without_active_call: off → on
- _user_menu_three_way_calling: not_installed → installed
→ Übernehmen
```

``` yaml
Steuergerät 17 → Codierung:
telephone2_BAP: no → yes
→ Übernehmen
```

---

## AM-Band deaktivieren

Entfernt den AM/FM-Umschalter in der Radio-Oberfläche. An seiner Stelle erscheint ein Button zur manuellen Frequenzeingabe.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät 5F → Codierung:
    byte_14_AM_disable: Aktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! example "VCDS"
    ``` yaml title="Login: 20103"
    5F – MMI / RNS
    Codierung - 07 → Lange Codierung:
    Byte 1 – Bit 1 (byte_14_AM_disable): Aktivieren
    Ausgang → Speichern
    ```

---

## Startbildschirm / Boot-Logo ändern

Ändert die Splash-Screen-Animation beim Einschalten des Geräts.

``` yaml
Steuergerät 5F → Codierung:
Byte 18 – Wert ändern auf:
    01 — Hybrid
    02 — GTD
    03 — GTI
    04 — BlueMotion
    05 — E-Golf
    06 — R-Line
    07 — Golf R
→ Übernehmen (mit Neustart des Steuergeräts)
```

### Soundsystem-Logo ändern

``` yaml
Steuergerät 5F → Anpassung:
Startup_screen_sticker_hmi (Standard: 0000) → ändern auf:
    1 — Fender Premium Audio System
    2 — Dynaudio
→ Übernehmen
```

---

## Menü-Layout: Kachelansicht statt Karussell

!!! abstract "ODIS"
    ``` yaml
    Steuergerät 5F → Codierung:
    byte_17_Skinning: Skin_1 → Skin_5
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! example "VCDS"
    ``` yaml
    5F – MMI / RNS
    Codierung - 07 → Lange Codierung:
    Byte 17: Skin_1 → Skin_5
    Ausgang → Speichern
    ```

---

## Video in Fahrt / MirrorLink in Fahrt

Ermöglicht das Abspielen von Videos und die Nutzung von MirrorLink, CarPlay und Android Auto während der Fahrt.

!!! warning "Hinweis"
    Dies kann die Aufmerksamkeit des Fahrers beeinträchtigen. Nur auf eigene Verantwortung verwenden!

``` yaml
Steuergerät 5F → Anpassung:
nhtsa_properties:
- nhtsa_limitation_switches_for_carplay_no_softKeyboard: Deaktivieren
    (CarPlay: Tastatur in Fahrt)
- nhtsa_limitation_switches_for_androidauto_limit_displayed_message_length: Deaktivieren
    (AA: Keine Begrenzung der Nachrichtenlänge)
- nhtsa_limitation_switches_for_androidauto_no_setup_configuration: Deaktivieren
    (AA: Einstellungen in Fahrt erreichbar)
- nhtsa_limitation_switches_for_androidauto_no_text_input: Deaktivieren
    (AA: Texteingabe in Fahrt erlaubt)
- nhtsa_limitation_switches_for_androidauto_no_video_playback: Deaktivieren
    (AA: Video-Wiedergabe in Fahrt)
→ Übernehmen
```

!!! info ""
    Für alle anderen Geräte (außer Discover PRO) muss zusätzlich ein spezieller ZDC-Container oder eine XML-Parametrie geladen werden.

---

## Kombiinstrument-Einstellungen über die Head-Unit

Ermöglicht das Konfigurieren des Kombiinstruments direkt über das Infotainment-Menü (z.B. bei Skoda Octavia).

``` yaml
Steuergerät 5F → Anpassung:
Car_function_list_bap_gen2_extended:
- display_configuration_0x45: Aktivieren
- display_configuration_0x45_msg_bus: CAN_Comfort
→ Übernehmen
```

---

## Off-Road Display / Kompass

Zeigt einen Kompass und Neigungsanzeigen im Infotainment-System an.

!!! info ""
    Beim VW Tiguan 2 funktioniert dies bei Composition Media 6", Discover Media und Discover Pro ohne zusätzliche 5F-Codierung.

``` yaml
Steuergerät 5F → Anpassung:
Car_Function_Adaptations_Gen2:
- menu_display_compass → active
- menu_display_compass_over_threshold_high → active
- menu_display_compass_clamp_15_off → active
→ Übernehmen

Car_Function_List_BAP_Gen2:
- compass_0x15 → active
→ Übernehmen
```

!!! warning ""
    Für Composition Media 8" ist zusätzlich die 5F-Codierung notwendig. Danach bleibt ein nicht löschbarer Fehler im Steuergerät, der jedoch die Funktion nicht beeinträchtigt.

!!! abstract "ODIS"
    ``` yaml title="Login: 20103"
    Steuergerät 5F → Codierung:
    Byte 24 – Bit 02: Aktivieren
    → Übernehmen (mit Neustart des Steuergeräts)
    ```

!!! example "VCDS"
    ``` yaml title="Login: 20103"
    5F – MMI / RNS
    Codierung - 07 → Lange Codierung:
    Byte 24 – Bit 2: Aktivieren
    Ausgang → Speichern
    ```

---

## Fahrschul-Modus

Aktiviert einen speziellen Modus, der Fahranfänger unterstützt.

!!! tip ""
    Nach der Anpassung muss das Infotainment-System neu gestartet werden.

``` yaml
Steuergerät 5F → Anpassung:
Car_Function_Adaptations_Gen2:
- menu_display_driving_school → Aktivieren
- menu_display_driving_school_over_threshold_high → Aktivieren

Car_Function_List_CAN_Gen2:
- Driving_school → Verfügbar
→ Übernehmen
```

---

## Lautstärke-Sprung beim Start verhindern

Manchmal startet die Head-Unit mit einer deutlich höheren Lautstärke als beim Ausschalten eingestellt war.

``` yaml
Steuergerät 5F → Anpassung:
Adjustment_fm_tuner_mono_stereo:
- l_hf_stereo_lower_threshold: 20 dBµV (vorher 37 dBµV)
→ Übernehmen
```

---

## Elektronischer Sprachverstärker (ICC)

Für die Aktivierung des ICC muss eine Parametrie geladen werden. Anschließend ist ein langer Druck auf die Ein/Aus-Taste am Gerät erforderlich, um es neu zu starten.

---

## GLONASS-Antenne für Navigation nutzen

Erweitert den GPS-Empfang um GLONASS-Satelliten für eine genauere Positionsbestimmung.

``` yaml
Steuergerät 5F → Anpassung:
Navigation_GNSS_Receiver_Setting:
- default_hw_reception: Deaktivieren
- gps: Deaktivieren
- galileo: Deaktivieren
- glonass: Deaktivieren
- compass: Deaktivieren
- external_gps_1: Aktivieren
- external_gps_2: Deaktivieren
→ Übernehmen
```

``` yaml
Steuergerät 75 → Anpassung:
GPS: internal_GPS_output_on_CAN
Navigation_Type: Type_2:
- Gnss_data_rate: 5 Hz (vorher 1 Hz)
→ Übernehmen
```

---

## Siehe auch
* [Kombiinstrument](kombiinstrument.md) – Tacho-Codierungen
* [Licht-Codierung](licht.md) – Beleuchtungsanpassungen
* [Praxis-Codierungen](anleitungen.md) – Allgemeine Workflows
