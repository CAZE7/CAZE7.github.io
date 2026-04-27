# Mercedes-Benz: Diagnose, Codierung und Flashen

Dieses Dokument beschreibt die technischen Grundlagen sowie die praktisch verfügbaren Werkzeuge und Hardware für Diagnose, Codierung und Firmware-Updates bei Mercedes-Benz Fahrzeugen. Der Fokus liegt auf kostengünstigen Lösungen wie J2534-Passthru-Geräten und Engineering-Tools in Kombination mit Budget-Hardware, nicht auf proprietären Star-Diagnosis-Multiplexern.

---

## Diagnose-Architektur bei Mercedes

Mercedes-Benz nutzt ein hierarchisches Diagnose- und Kodiersystem, das sich grundlegend von offenen Systemen unterscheidet:

### Protokolle und Transport

- **K-Line / KWP2000:** Ältere Modelle (bis ca. 2005) nutzen serielle K-Line-Diagnose (ISO 9141 / ISO 14230).
- **CAN-Bus:** Mittlere Modellgenerationen (2005–2015) basieren auf CAN-Diagnose mit UDS/KWP2000-Services über ISO-TP.
- **Ethernet/DoIP:** Moderne Fahrzeuge (ab ca. 2015) setzen auf Ethernet-Backbone mit Diagnostics over Internet Protocol (DoIP, ISO 13400). DoIP kapselt UDS-Nachrichten in TCP/UDP und ermöglicht Gigabit-Datenraten, essentiell für große Firmware-Übertragungen.

### Sicherheitsmechanismen

Mercedes schützt sensible Funktionen durch **Seed & Key** (ISO 14229, UDS-Service 0x27):

- Das Diagnosesystem fordert einen **Seed** von der ECU an.
- Der Seed wird mit einem proprietären Algorithmus in einen **Key** umgerechnet.
- Der Key wird zurück an die ECU gesendet; bei korrektem Wert wird die Session für Codierung/Flashen entsperrt.

Ohne korrekten Seed/Key-Zugriff sind tiefe Eingriffe unmöglich. Seed/Key-Generatoren sind oft nur über spezialisierte Tools oder Dienstleister verfügbar.

Zusätzlich existieren **Online-Backend-Schutzmechanismen** (z.B. für Start-Freigaben und Variantencodierung), die Verbindung zum Daimler-System erfordern.

---

## Software-Werkzeuge

### Xentry (Offizielle Mercedes-Diagnosesoftware)

**Xentry** ist die aktuelle Diagnosesoftware von Mercedes-Benz und Nachfolger von DAS/Star Diagnosis.

**Funktionalität:**
- Vollständige Fahrzeugdiagnose mit geführten Fehlersuche-Workflows
- SCN-Codierung (standardisierte Codierung für Varianten)
- Firmware-Flashen über FRF-Container
- Online-Funktionen (Start-Freigaben, Variantencodierung, Kommunikation mit Daimler-Backend)

**Xentry Passthru vs. Standard:**
- **Standard Xentry:** Erfordert SD-Connect-Multiplexer (C4, C5, C6)
- **Xentry Passthru:** Kompatibel mit J2534-Geräten wie Tactrix OpenPort 2.0; verzichtet auf vollständigen DoIP-Support für sehr alte Fahrzeuge, ist aber für modernere CAN-basierte Modelle (2005–2015 ohne Ethernet) völlig ausreichend.

Xentry speichert CBF- und SMR-D-Dateien lokal (typisch: `Xentry\ODXProjekte\PKW_COMMON\dbr`), die von Vediamo und DTS Monaco genutzt werden können.

### Vediamo (Engineering-Tool)

**Vediamo** ist ein Engineering-Tool von Mercedes/Vector für tiefe Diagnose und Codierung.

**Merkmale:**
- Zugriff auf Diagnose-Services, DIDs (Datenobjekte) und Variantencodierung
- Unterstützung für CBF-Dateien (ältere Fahrzeuge, ca. bis 2015)
- Seed & Key-basierter Security-Access über externe Generatoren
- Begrenzte SMR-D-Unterstützung in neueren Versionen

Vediamo wird primär für Variantencodierung und Komfortanpassungen genutzt, wenn Xentry keine grafische Option bietet. Die Arbeit mit Seed/Key erfordert, dass der Diagnostiker einen Seed von der ECU anfordert und diesen manuell in einen Key umrechnet (über Seed-Key-Generatoren oder Dienstleister).

### DTS Monaco (Engineering-Plattform)

**DTS Monaco** ist ein modernes Engineering-Tool für Diagnose, Codierung und Flashen auf Basis von SMR-D/SMR-F-Daten.

**Eigenschaften:**
- Native SMR-D/SMR-F-Projektunterstützung (moderne Fahrzeuge)
- Komplexe Workspaces mit vordefinierten Masken für Variantencodierung und Flashen
- Integrierte Security-Access-Funktionen über Seed & Key
- DoIP-Support für Ethernet-basierte Fahrzeuge

DTS Monaco setzt tiefgreifende Kenntnisse voraus und wird in Kombination mit geeigneter Hardware (J2534-Geräte oder SD-Connect-Multiplexer) für umfangreiche Codier- und Flasharbeiten verwendet.


### Consumer-Apps (Smartphone)

Smartphone-basierte Consumer-Apps bieten in der Regel nur Standard-OBD-Funktionen und sind für tiefe Variantencodierung oder Firmware-Updates ungeeignet. Technische Einschränkungen sind unter anderem fehlende codierbare Parameter in Consumer-APIs, Seed-&-Key-Sicherheitsmechanismen sowie die teilweise notwendige DoIP-Unterstützung. Sie eignen sich primär für einfache Diagnose und Komfortfunktionen.

---

## Hardware: Wege für Privatanwender

Für Privatanwender stehen folgende Ansätze zur Verfügung:

### J2534-Passthru-Geräte

**J2534** (SAE J2534) ist ein Standard für Diagnose-Interfaces, die mit OEM-Software wie Xentry zusammenarbeiten. Zwei verbreitete, erschwingliche Geräte sind:

- **Tactrix OpenPort 2.0:** Unterstützt CAN, K-Line, ISO-TP. Geeignet für viele Mercedes-Modelle ab ca. 2005 bis etwa 2015. Ermöglicht Diagnose und Codierung, Firmware-Updates sind je nach Modell und Softwarestand möglich.
- **VXDIAG (VCX SE / VCX Nano):** Unterstützt CAN, K-Line und bei einigen Modellen auch DoIP. Für viele neuere Mercedes-Modelle geeignet. Wird häufig mit Xentry Passthru oder als eigenständiges Interface genutzt.

**Hinweis zu DoIP:** Für Fahrzeuge ab ca. 2015 mit Ethernet-Backbone ist DoIP-Unterstützung erforderlich. VXDIAG-Modelle bieten dies teilweise, OpenPort 2.0 nicht. Für ältere Fahrzeuge genügt CAN-Unterstützung.

**Ablauf für Privatanwender:**
- J2534-Gerät mit PC verbinden und Treiber installieren
- Passende Software (z.B. Xentry Passthru, Vediamo, DTS Monaco) nutzen
- Fahrzeug über OBD-II-Buchse verbinden
- Diagnose, Codierung oder Firmware-Update gemäß Software-Anleitung durchführen

Andere professionelle Multiplexer (z.B. SD-Connect) sind für Privatanwender nicht relevant und werden hier nicht betrachtet.


---

## Datenformate: CBF und SMR-D/SMR-F

Mercedes verwendet proprietäre Container-Formate für Steuergeräte-Beschreibung und Firmware:

### CBF-Dateien

- **Format:** Proprietäre Vector-Container für Steuergeräte-Beschreibung
- **Inhalt:** Diagnose-Services, Variantencodierungsstrukturen (Bit/Byte-Definitionen), Entwicklungsfunktionen
- **Einsatzbereich:** Ältere Fahrzeuge (bis ca. 2015) ohne Ethernet-Architektur
- **Tools:** Vediamo, ältere Versionen von DTS Monaco
- **Charakteristik:** Weniger strukturiert, erfordert oft manuelle Interpretation von Hex-Daten

### SMR-D / SMR-F

- **SMR-D:** Steuergeräte-Motor-Reparatur-Daten; strukturiertes Format für Services, DIDs, Routine-Controls, Variantencodierung
- **SMR-F:** Variante für Flashdaten, eng mit SMR-D verknüpft
- **Einsatzbereich:** Moderne Fahrzeuge (ab ca. 2016); W205, W213, W223, W206 nutzen primär SMR-D
- **Tools:** DTS Monaco (native Unterstützung), Vediamo (mit eingeschränktem Support in neueren Versionen), Xentry
- **Charakteristik:** Strukturierter, XML-ähnliche Beschreibung, automatische Validierung von Änderungen

Xentry speichert diese Dateien lokal (z.B. `Xentry\ODXProjekte\PKW_COMMON\dbr`), aus denen Vediamo und DTS Monaco ihre Projektdaten beziehen können.

---

## Typische Fehler und Ursachen

| **Fehler** | **Ursache** | **Prävention** |
|---|---|---|
| **Flashen bricht ab** | Instabile J2534-Verbindung, fehlerhafte ISO-TP | USB-Hub/Kabel prüfen, professionelle Hardware nutzen |
| **ECU nicht erreichbar** | DoIP-Fahrzeug mit nicht-DoIP-Hardware | Fahrzeuggeneration überprüfen, richtige Hardware wählen |
| **Seed/Key-Fehler** | Falscher Seed-Key-Generator, Session abgelaufen | Seed neu anfordern, korrekten Generator für Modell nutzen |
| **Falscher Fahrzeugtyp erkannt** | VIN nicht korrekt übertragen | VIN 3x überprüfen, Fahrzeugdaten manuell eingeben |
| **Spannungsabfall während Flashen** | Schlechte Fahrzeugbatterie, instabile Stromversorgung | Batterie auf mindestens 13,5V überprüfen, Ladegerät nutzen |

---

## Sicherheitsaspekte bei ECU-Programmierung

### Fehler bei Firmware-Updates

Unterbrechungen während Flash-Routinen sind kritisch:

- **Incomplete Sector-Erase:** Bootloader oder Applikationsbereiche werden unvollständig beschrieben
- **Corrupted State Machine:** Fehlerhafte UDS-Befehle setzen ECU-Zustand in untestete Pfade
- **Spannungsausfälle:** Browning-Effekte oder Kontaktfehler unterbrechen Programmierroutinen

Resultat: ECU ist funktional „gebricked" und benötigt Bench-Recovery (Hardware-Programmer auf Steuergerät-Ebene).

### Warum ELM327-Clones problematisch sind

- **Unvollständige Protokoll-Implementierung:** Bestimmte CAN- oder ISO-TP-Varianten nicht korrekt
- **Fehlende ISO-TP-Flow-Control:** Frames gehen verloren bei hohen Buslasten
- **Elektrische Instabilität:** Schlechte Spannungsregler, fehlerhafte Lötstellen
- **Mangelnde Validierung:** Nicht für OEM-Flashe-Workflows konzipiert oder getestet

**Praktische Konsequenz:** Für reine OBD-Diagnose marginal geeignet; für Codierung/Flashen nicht geeignet. Billige Adapter „bricken" ECUs, wenn Flash-Vorgänge unterbrochen werden.

---

## Zusammenfassung der Wege für Privatanwender

### Diagnose und Codierung (CAN-basierte Fahrzeuge, ca. 2005–2015)
- **Empfohlene Hardware:** J2534-Passthru wie Tactrix OpenPort 2.0 oder VXDIAG
- **Software:** Xentry Passthru oder Vediamo
- **Hinweis:** Seed/Key-Mechanismus beachten, für tiefe Codierung erforderlich

### Diagnose und Codierung (neuere Fahrzeuge mit DoIP, ab ca. 2015)
- **Empfohlene Hardware:** VXDIAG (mit DoIP-Unterstützung)
- **Software:** Xentry Passthru oder DTS Monaco
- **Hinweis:** DoIP-Unterstützung prüfen, da für viele neue Modelle erforderlich

### Firmware-Updates und erweiterte Funktionen
- **Empfohlene Hardware:** VXDIAG (je nach Modell und Softwarestand)
- **Software:** DTS Monaco mit SMR-D/SMR-F-Dateien
- **Hinweis:** Engineering-Kenntnisse und passende Projektdaten notwendig

---

## Praktischer Workflow

### Diagnose mit J2534-Gerät

1. **Hardware vorbereiten:** OpenPort 2.0/VXDIAG mit PC verbinden, Treiber installieren
2. **Fahrzeug verbinden:** OBD-Adapter in Fahrzeug-OBD-II-Buchse stecken
3. **Xentry starten:** Passthru-Modus konfigurieren
4. **Fahrzeug identifizieren:** VIN eingeben oder Auto-Scan
5. **Diagnose durchführen:** Fehler lesen, Messwerte erfassen

### Codierung mit Vediamo/DTS Monaco

1. **Richtige CBF/SMR-D-Datei laden:** Aus Xentry-Projekten oder Datenbank
2. **Security-Access durchführen:** Seed anfordern → Key-Generator nutzen → Key eingeben
3. **Parameter anpassen:** Im Dateimodell die gewünschten Werte ändern
4. **Validieren:** System prüft Plausibilität der Änderungen
5. **Zurückflashen:** Geänderte Datei in ECU schreiben
6. **Test:** Fahrzeug starten, Funktionen überprüfen

### Firmware-Update mit DTS Monaco

1. **SMR-F-Container beschaffen:** Aktuelle Firmware für ECU-Modell/Version
2. **DoIP-Verbindung überprüfen:** Ethernet-Anbindung Fahrzeug prüfen
3. **DTS-Projekt laden:** Workspace für Fahrzeugmodell öffnen
4. **Sicherung durchführen:** Alte Firmware auslesen (für Rollback)
5. **Flash durchführen:** DTS Monaco überwacht Integrität, Checksummen automatisch validiert
6. **Recovery-Fenster:** Falls Fehler: Boot-Recovery nutzen (begrenzte Fähigkeit nach Interrupt)


=== "Anleitung: Einstieg VAG"
<!-- placeholder: Anleitung für Einstieg VAG (kein Inhalt) -->

=== "Anleitung: Einstieg Mercedes"
<!-- placeholder: Anleitung für Einstieg Mercedes (kein Inhalt) -->

