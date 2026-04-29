# Praxis-Codierungen & Workflows (VAG)

Dieses Dokument bietet praxisnahe Anleitungen für beliebte Codierungen und Retrofits im VAG-Konzern. Wir behandeln typische Anpassungen und den professionellen VCP-Workflow zum Flashen von Datensätzen.

---

## 1. Grundregeln vor jeder Codierung

Bevor du mit VCDS oder OBDeleven anfängst, Werte zu ändern:

1. **Auto-Scan durchführen:** Lese alle Steuergeräte aus und speichere das Protokoll. So hast du die ursprüngliche Codierung (Long Coding) gesichert.
2. **Admap erstellen:** Speichere für das Steuergerät, an dem du arbeitest, zwingend die Anpassungskanäle (Adaptation Map) als Datei ab.
3. **Motorhaube auf:** Bei Fahrzeugen ab ca. 2020 (Golf 8, Octavia NX) muss für Diagnose-Schreibzugriffe (SFD) die Motorhaube entriegelt sein!
4. **Zündung an, Motor aus:** Es sei denn, das Tutorial verlangt explizit einen Motorstart.

---

## 2. Beliebte Anpassungen (Beispiele)

### 2.1 Zeigerausschlag (Needle Sweep / Staging)
*Beim Einschalten der Zündung schlagen die Tachonadeln einmal komplett bis zum Anschlag aus.*

=== "Mit VCDS"
    1. Steuergerät **`17 - Schalttafeleinsatz`** auswählen.
    2. Auf **`Codierung - 07`** klicken.
    3. Den **Assistent für lange Codierung** öffnen.
    4. In **Byte 1** das **Bit 0** aktivieren (Bezeichnung oft: *Zeigertest / Inszenierung aktiv*).
    5. Fenster schließen und **Ausführen** klicken.

=== "Mit OBDeleven"
    1. Steuergerät **`17 - Schalttafeleinsatz`** auswählen.
    2. Auf **`Anpassung`** gehen.
    3. Den Kanal **`Inszenierung`** (oder *Staging*) suchen.
    4. Wert von *Inaktiv* auf **Aktiv** setzen.
    5. Änderungen übernehmen (Grüner Haken drücken).

*(Hinweis: Bei virtuellen Cockpits / Active Info Display heißt der Kanal oft "Inszenierung" in der Anpassung statt Codierung).*

### 2.2 Start/Stop Automatik dauerhaft deaktivieren
*Verhindert das automatische Ausgehen des Motors.*

!!! warning "Grenzen bei neuen Modellen (ab ca. 2019)"
    Bei älteren Modellen (MQB, z.B. Golf 7 Vor-Facelift) ließ sich das System leicht über die Spannungsgrenze austricksen. Bei neueren Modellen (SFD-Generation) ist dies per normaler Codierung oft **nicht mehr möglich**, da das Motorsteuergerät die Werte überschreibt. Hier helfen oft nur noch Hardware-Dongles (Start-Stop Memory Module).

**Für ältere Modelle (z.B. Golf 7 VFL, Audi A3 8V):**

1. Steuergerät **`19 - Diagnoseinterface (Gateway)`** öffnen.
2. Auf **`Anpassung - 10`** klicken.
3. Den Kanal **`Start/Stopp Außentemperaturvorgabe - Minimaltemperatur`** suchen.
4. Den Wert von `-50°C` auf **`50°C`** (oder den maximalen Wert) ändern.
5. Speichern. *Das Auto denkt nun, es sei zu heiß für Start/Stop und deaktiviert die Funktion mit einem Symbol im Tacho.*

---

## 3. Der VCP-Workflow: Datensätze (ZDC) flashen

Wer im VAG-Konzern Kameras nachrüstet (z.B. A5 Vorfeldkamera für Lane Assist) oder spezielle Scheinwerfer (Matrix-LED) verbaut, wird merken: **Codierung allein reicht nicht!** Das Steuergerät benötigt eine Parameterdatei (Datensatz / ZDC), die festlegt, wie die Hardware arbeitet. Dies geht am besten mit **VCP (Vag Can Pro)**.

### 3.1 Was ist ein ZDC Container?
Eine ZDC-Datei (Zukünftige Diagnose Container) ist eine binäre, verschlüsselte Datei von VCP. Sie lädt Parameter-Daten (z.B. Lichtkurven, Sound-Profile, Lenkrad-Kennlinien) in das EEPROM des Steuergeräts. Ohne korrekten ZDC-Datensatz wirft ein neu verbautes Steuergerät oft den Fehler *„Datensatz ungültig / fehlend“*.

### 3.2 Anleitung: Flashen eines ZDC-Files

!!! danger "Spannung halten!"
    Flashe niemals ohne angeschlossenen ++30+a++ Battery-Stabilizer. Ein Absturz während des Schreibens zerstört die ECU.

1. **VCP starten:** Smartcard-Dongle einstecken und VCP öffnen.
2. **Auto verbinden:** Zündung AN. Klick auf *Connect*.
3. **Flasher öffnen:** Im Hauptmenü auf *Flasher* (oder `ZDC-Upload`) klicken.
4. **ZDC-Datei laden:** Klicke auf *File* und wähle die von VCP geladene ZDC-Datei aus dem File-Manager.
5. **Steuergerät wählen:** Im ZDC-Tool die Ziel-ECU (z.B. `A5 - Front Sensors`) auswählen.
6. **Profil wählen:** Die ZDC-Datei enthält oft Parameter für *verschiedene* Autos. Wähle im Dropdown zwingend das exakte Fahrzeugprofil (z.B. `VW Golf VII LHD Lane Assist`).
7. **Start Upload:** Klicke auf *Upload*. Der Balken läuft durch. **Nichts anfassen!**
8. **Hard Reset:** Nach erfolgreichem Flash das Steuergerät neu starten oder die Zündung für 2 Minuten komplett ausschalten.

*(Hinweis: VCP bietet in seinem File-Management einen eingebauten Downloader an, mit dem man Tausende fertige ZDC-Container für VAG-Fahrzeuge kostenfrei (bei aktiver Lizenz) herunterladen kann.)*

---

## Siehe auch
* [Software & Architektur](software.md) – Infos zu SFD, ODIS und Tools.
* [Hardware & Interfaces](hardware.md) – Das richtige Kabel für VCDS oder VCP wählen.
* [FAQ](../faq.md) – Antworten auf häufige Fragen.
