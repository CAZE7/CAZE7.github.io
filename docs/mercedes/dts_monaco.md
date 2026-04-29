# 🏎️ DTS Monaco – Engineering-Level Codierung & Flashing

DTS Monaco ist das Engineering-Diagnosetool von Mercedes-Benz, das tieferen Zugriff auf Steuergeräte bietet als XENTRY oder Vediamo. Es arbeitet projektbasiert mit **CBF-Dateien** (Einzel-Steuergeräte-Beschreibungen für ältere Modelle) und **SMR-D-Dateien** (Fahrzeug-Projektdateien für neuere Modelle).

## 1. Was ist DTS Monaco?

| Funktion | DTS Monaco | Vediamo | XENTRY |
| :--- | :--- | :--- | :--- |
| Schnelle ECU-Codierung aller Steuergeräte | ✅ Ja | ❌ Nein | Teilweise |
| ECU-Software-Backup/-Restore | ✅ Ja | ✅ Ja | ❌ Nein |
| ECU-Flashing (Firmware-Update) | ✅ Ja | Teilweise | Nur SDFlash |
| Alle Fehlercodes schnell lesen/löschen | ✅ Ja | ❌ Nein | ✅ Ja |
| ECU-Daten-Switch (Ersatzgerät programmieren) | ✅ Ja | ❌ Nein | ❌ Nein |
| SeedKey-Sicherheitsfreischaltung | ✅ Ja | ✅ Ja | ❌ Nein |
| Variantencodierung | ✅ Ja | ✅ Ja | ✅ Ja |
| Projektbasiertes Arbeiten | ✅ Ja | ❌ Nein | ❌ Nein |

**Kernunterschied:** Vediamo ist dateibasiert (CBF einzeln laden), während DTS Monaco ein komplettes Fahrzeugprojekt mit allen Steuergeräten, CBF- und SMR-D-Dateien zusammenfasst.

## 2. Systemanforderungen & Installation

### 2.1 Hardware-Voraussetzungen
| Komponente | Minimum | Empfohlen | Hinweis |
| :--- | :--- | :--- | :--- |
| Betriebssystem | Windows 10 Pro 64-Bit | Windows 10/11 Pro, frische Installation | Home-Edition kann Netzwerk-Probleme verursachen |
| RAM | 8 GB | 16 GB | SMR-D-Datenbanken können groß werden |
| Festplatte | 100 GB SSD | 256 GB SSD | Projekte + SMR-D + CBF + Flash-Container |
| Interface | J2534 (OpenPort 2.0) | SD Connect C4/C6, VXDIAG VCX SE | Version 9.02 arbeitet mit Passthrough-Devices problematisch |
| Stromversorgung | 30 A Battery-Stabilizer | 50-70 A Diagnose-Stabilizer | Essenziell für Flashing |

!!! warning "DTS Monaco 9.02 + Passthrough = Probleme"
    In der Community mehrfach bestätigt: DTS Monaco 9.02 funktioniert nicht zuverlässig mit J2534-Passthrough-Devices wie OpenPort 2.0. Das Tool erkennt das Interface, bricht bei längeren Kommunikationen aber ab oder friert ein.

    **Lösungsweg:**
    * Für OpenPort 2.0: DTS Monaco 8.14 oder 8.16 verwenden – diese Versionen sind mit J2534 stabil.
    * Für DoIP-Fahrzeuge (W206, W223): VXDIAG VCX SE oder SD Connect C6 verwenden.
    * Monaco 9.02 nur mit originalen oder hochwertigen C6-Clones und LAN-Verbindung nutzen.

### 2.2 Installation (Samik FullFix)
Der Samik FullFix ist ein community-validiertes All-in-One-Installationspaket, das Base-Software, Treiber, Patches und Datenbanken enthält.

!!! info "Samik FullFix Installationsablauf"
    1. Frische Windows-Installation mit allen Updates, .NET Framework 3.5/4.8.
    2. Visual C++ Redistributables (2005–2022) installieren.
    3. Java Runtime (JRE 8, ggf. JDK) installieren.
    4. Samik FullFix als Administrator ausführen – Auswahlmenü für gewünschte DTS-Version (8.14, 8.16, 9.02).
    5. Base-Installation abwarten → Neustart.
    6. Samik FullFix erneut starten → Caesar-Treiber installieren.
    7. Activation/Patch über Samik FullFix anwenden (Admin).
    8. Neustart → SMR-D und CBF aus dem Paket in die entsprechenden Verzeichnisse entpacken.
    9. Test-Projekt erstellen und Verbindung prüfen.

!!! danger "Antivirus & Defender / Treiber"
    **Antivirus:** Deaktiviere vor der Installation Windows Defender (Tamper-Protection). Setze danach Ausnahmen für `C:\Program Files (x86)\Mercedes-Benz\`.
    **CBF-Mismatches:** Eine CBF-Datei aus einer neueren XENTRY-Version kann mit einer älteren DTS Monaco-Version nicht verarbeitet werden (Fehler „Cannot work CBF file“).

## 3. Interface-Konfiguration

### 3.1 J2534-Adapter einbinden
1. *System Configuration* → *Add* → *J2534 Device*
2. Gerät auswählen (OpenPort 2.0 / VXDIAG)
3. Verbindungstest durchführen.
4. Als "Virtual Diagnostic System" im Projekt hinterlegen.

### 3.2 SD Connect C4/C6 einbinden
1. *System Configuration* → *Add* → *SD-Connect*
2. IP-Adresse eingeben → "Remote SD-Connect" wählen (LAN/WLAN)
3. MUX-Test durchführen.

*(Empfehlung: Für Flashing immer LAN-Kabel nutzen!)*

## 4. Projektsystem verstehen

Ein DTS Monaco-Projekt fasst zusammen:
* **SMR-D-Datei:** Fahrzeug-Gesamtstruktur (Steuergeräte-Liste, Bus-Topologie, Adressen).
* **CBF-Dateien:** Einzel-Steuergeräte-Beschreibungen (oft für Legacy-ECUs im selben Auto).
* **Variantencodier-Werte:** Werkscodierung des Fahrzeugs.
* **Flash-Container:** Firmware-Updates.

!!! warning "Projekt ohne SMR-D = unbrauchbar"
    Ohne gültige SMR-D kann kein Steuergerät korrekt adressiert werden. Immer zuerst ein vollständiges Fahrzeugprojekt anlegen!

### 4.1 Projekt erstellen
1. **Create Project** im Startbildschirm wählen.
2. Fahrzeugidentifikation eingeben (VIN oder Baureihe).
3. SMR-D-Datei laden (Datenbank oder eigenes Projekt).
4. CBF-Dateien zuordnen (automatisch oder manuell).
5. Projekt speichern.

## 5. Codierung & Flashing in der Praxis

### 5.1 Variantencodierung
1. Projekt laden → Ziel-Steuergerät auswählen.
2. **Variant Coding** Tab öffnen.
3. **ZUERST: "Read coding from ECU"** und als Backup sichern!
4. Werte ändern (Dropdown oder Hex).
5. **Write coding to ECU** anklicken.
6. Hard Reset / Ignition OFF/ON (je nach Steuergerät).

### 5.2 SeedKey-Freischaltung (Security Access)
| Level | Bedeutung |
| :--- | :--- |
| 1 | Grundlegende Diagnose |
| 3 | Erweiterte Diagnose, Fehlerspeicher löschen |
| 5 / 37 / 3B | Variantencodierung |
| 9 / 10 | ECU-Flashing, Security-Functions |
| 11+ | Engineering-Funktionen, Immobilizer |

*Warnung:* Beginne immer mit dem niedrigstmöglichen Level. Zu viele falsche Versuche sperren die ECU!

### 5.3 ECU-Flashing (Firmware Updates)
1. Battery-Stabilizer (50-70 A) anschließen. Ohne = Lebensgefahr für die ECU!
2. Projekt laden → Ziel-ECU auswählen → **ECU Programming** öffnen.
3. Flash-Container (CFF/FRF) laden.
4. HW-Nummern strikt vergleichen!
5. SeedKey Level 9/10 freischalten.
6. **Start Programming** – NICHT unterbrechen (kein Zündung aus, kein Laptop zuklappen).
7. Warten bis 100 % → Ignition OFF/ON.
8. Fehlercodes löschen und Funktionstest.

## 6. Bekannte Fehler & Lösungen

| Symptom | Ursache | Lösung |
| :--- | :--- | :--- |
| **"Cannot work CBF file"** | CBF-Datei neuer als DTS-Version | Passende (ältere) CBF-Version verwenden |
| **"No communication with ECU"** | Falscher Bus/Adresse, ECU schläft | Bus-Konfiguration in SMR-D prüfen, Zündung AN |
| **"Security access denied"** | Falscher SeedKey, falsches Level | SeedKey neu berechnen, Level prüfen |
| **Projekt lädt extrem langsam** | Fragmentierte DB, langsame HDD | Nicht benötigte Dateien entfernen, SSD nutzen |

---

## Siehe auch
* [Praxis-Codierungen & Workflows](anleitungen.md) – Praktische Schritt-für-Schritt Anleitungen.
* [SMR-D & Flash-Dateien Beschaffung](smr-d_quellen.md) – Wo man die notwendigen Projektdateien (SMR-D/CBF) herbekommt.
* [Software & Architektur](software.md) – Allgemeine Infos zu XENTRY und Diagnosesystemen.
* [Glossar](software.md#6-glossar) – Begriffserklärungen.
