# Mercedes-Benz: Diagnose, Codierung und Flashen

Dieses Dokument beschreibt die technischen Grundlagen, verfügbaren Werkzeuge und Hardware-Schnittstellen für die Fahrzeugdiagnose, Steuergeräte-Codierung und Firmware-Updates bei Mercedes-Benz. Der Fokus liegt auf der technischen Machbarkeit über J2534-Passthru-Geräte und Engineering-Tools im Vergleich zu proprietären Systemen.

---

## 1. Diagnose-Architektur und Protokolle

Die Kommunikation mit Steuergeräten (ECUs) bei Mercedes-Benz basiert je nach Fahrzeuggeneration auf unterschiedlichen Netzwerkarchitekturen.

* :material-serial-port: **K-Line / KWP2000:** Eingesetzt in Fahrzeugen bis etwa Mitte der 2000er Jahre (ISO 9141 / ISO 14230). 
    * *Technisches Limit:* Moderne J2534-Adapter unterstützen K-Line physisch oft nur auf spezifischen Pins (meist Pin 7). Bei älteren HHT-Fahrzeugen (38-Pin-Diagnosedose) ist die Kommunikation daher häufig nicht oder nur stark eingeschränkt möglich.
* :material-network-outline: **CAN-Bus:** Der Standard für Fahrzeuge zwischen ca. 2005 und 2015. Die Diagnose erfolgt über CAN mit KWP2000- oder UDS-Diensten, gekapselt via ISO-TP.
* :material-ethernet: **Ethernet / DoIP:** Ab ca. 2015 (z.B. W205, W213, W223) wird ein Ethernet-Backbone mit Diagnostics over Internet Protocol (DoIP, ISO 13400) genutzt. DoIP ermöglicht die hohen Datenraten, die für Firmware-Updates komplexer Systeme (z.B. Infotainment) zwingend erforderlich sind.

### Sicherheitsmechanismen und Zugriffsschutz

Kritische ECU-Funktionen sind durch Security-Access-Verfahren nach UDS (Service 0x27) geschützt.

1. **Seed & Key:** Das Diagnosesystem fordert einen "Seed" (Startwert) von der ECU an. Ein Generator berechnet daraus den "Key", der zur Authentifizierung zurückgesendet wird.
    * *Risiko:* Ein falsches Security-Level (z.B. Level 9 bei IC_204 zur AMG-Menü-Freischaltung) ohne den exakt passenden Generator kann zu Steuergeräte-Sperren oder undefiniertem Verhalten führen. Neben kommerziellen Tools existieren Open-Source-Lösungen wie *MBSeedKey*, die jedoch proprietäre DLL-Dateien voraussetzen.
2. **Online-Zertifikate (Zenzefi):** Bei aktuellen DoIP-Fahrzeugen (ab W206/W223) sind tiefe Diagnose- und Codierfunktionen zusätzlich durch Zenzefi-Zertifikate abgesichert. Diese erfordern in der Regel eine autorisierte Verbindung zum Hersteller-Backend und sind zeitlich limitiert.

---

## 2. Software-Werkzeuge

### Xentry (Offizielle Diagnosesoftware)
Xentry dient der standardisierten Diagnose, Fehlersuche und SCN-Codierung.

* **Xentry OpenShell (XDOS):** Konzipiert für proprietäre Multiplexer (SD-Connect C4/C5/C6) oder kompatible VCIs (z.B. VXDIAG VCX SE).
* **Xentry Passthru:** Konzipiert für standardisierte J2534-Schnittstellen (z.B. OpenPort 2.0). 
    * *Lizenz-Einschränkungen:* Bei Nutzung einer offiziellen Passthru-Lizenz ist der Diagnoseumfang bei älteren Fahrzeugen herstellerseitig oft auf abgasrelevante Systeme (Motor/Getriebe) beschränkt. Bei Modellen ab ca. 2018 ist der Zugriff breiter.

### Vediamo (Engineering-Tool)
Ein auf CBF-Dateien basierendes Engineering-Tool für den direkten Zugriff auf DIDs und Variantencodierungen.
* **Einsatz:** Primär genutzt für Fahrzeuge bis ca. 2015.
* **Limitierungen:** Der Betrieb über J2534-Hardware ist möglich, weist aber Instabilitäten auf. Insbesondere beim Flashen mittels CFF-Dateien über den OpenPort 2.0 werden häufig Systemhänger gemeldet. Die Unterstützung des neueren SMR-D-Formats ist fehleranfällig.

### DTS Monaco (Engineering-Plattform)
Die aktuelle Plattform für moderne Architekturen, optimiert für SMR-D und SMR-F.
* **Einsatz:** Native Unterstützung aktueller DoIP-Fahrzeuge und Flash-Workflows.
* **Struktur:** Basiert auf vordefinierten Workspaces. Die Software übernimmt den Security-Access, sofern externe Seed-Key-Bibliotheken korrekt eingebunden sind.

---

## 3. Datenformate

* **CBF:** Ein älteres Vector-Containerformat. Es enthält Definitionen für Variantencodierungen und DIDs, erfordert jedoch ein hohes Maß an manueller Interpretation der Hexadezimal-Strukturen.
* **SMR-D / SMR-F:** Das moderne, XML-basierte Format. SMR-D enthält die strukturierten Steuergeräte-Beschreibungen, SMR-F die zugehörigen Firmware-Container. Für Fahrzeuge ab 2015 ist dieses Format der technische Standard.

---

## 4. Hardware-Schnittstellen (VCI)

| Hardware | Protokolle | Technische Einordnung |
| :--- | :--- | :--- |
| **Tactrix OpenPort 2.0** | CAN, ISO-TP, K-Line (limitiert) | Kosteneffizientes J2534-Interface. Funktional bei CAN-Fahrzeugen (Diagnose/Codierung). Fehlendes DoIP und Hardware-Limitierungen machen es für Flash-Vorgänge oder neuere Modelle ungeeignet. |
| **VXDIAG VCX SE Benz** | CAN, K-Line, DoIP | Wird von Xentry als C6-Multiplexer erkannt. Unterstützt moderne DoIP-Routinen und gilt als stabiler für Flash-Vorgänge. |
| **ELM327-Derivate** | CAN (eingeschränkt) | Ausschließlich für OBD2-Emissionsdiagnose geeignet. Häufig fehlen Hardware-Komponenten für fahrzeugspezifische Protokolle. Ein Einsatz für Codierungen oder Flashen ist aufgrund von Verbindungsabbrüchen fahrlässig (Bricking-Gefahr). |

---

## 5. Risiken bei ECU-Programmierung (Flashen)

Das Flashen von Steuergeräten birgt inhärente Risiken, die selbst bei offiziellen Werkstatt-Updates zu defekten Modulen ("Bricks") führen können.

* **Codierungsverlust:** Firmware-Updates überschreiben häufig den Speicherbereich der Variantencodierung. Beispiel: Beim Flashen des Steuergeräts `SAMF204` gehen Codierungen verloren. Ein vorheriges Backup (Encoding-Sicherung via DTS Monaco) ist zwingend erforderlich.
* **Protokoll-Abbrüche:** Instabile J2534-Treiber, mangelhafte USB-Kabel oder fehlende ISO-TP-Flow-Control bei billigen Adaptern unterbrechen den Flash-Vorgang. Bricht der Transfer im Bootloader-Status ab, ist die ECU über reguläre Diagnosewege nicht mehr erreichbar.
* **Spannungseinbrüche:** Flash-Vorgänge erfordern eine absolut stabile Bordnetzspannung (≥ 13,5 V). Ein externes, leistungsstarkes Batterieladegerät ist obligatorisch.

---

## 6. Praxis-Workflow: Einstieg für Hobbyanwender

Der folgende Leitfaden beschreibt die empfohlene technische Herangehensweise für Basis-Codierungen (z.B. Deaktivierung der Start-Stopp-Automatik) an CAN-Fahrzeugen (ca. Baujahr 2005–2015).

1. **Hardware-Setup:** * Verbindung über Tactrix OpenPort 2.0 (J2534) oder VXDIAG VCX SE herstellen.
   * Bordnetz durch externes Ladegerät stabilisieren.
2. **Identifikation:** * Xentry starten, Fahrzeug per VIN identifizieren und einen Kurztest durchführen, um den exakten Softwarestand und Fehlerspeichereinträge der Ziel-ECU zu ermitteln.
3. **Projektwahl (Engineering Tool):** * Vediamo oder DTS Monaco öffnen.
   * Das zur Baureihe exakt passende CBF- oder SMR-D-Projekt aus dem Xentry-Datenbestand laden.
4. **Sicherung:** * Verbindung zur ECU aufbauen.
   * Bestehende Codierwerte (Variant Coding) sichern.
5. **Authentifizierung:** * UDS Service `0x27` (Security Access) ansteuern.
   * Über einen Seed-Key-Generator den korrekten Key für den benötigten Entwicklungs-Level berechnen und an die ECU senden.
6. **Codierung & Reset:** * Gewünschte Parameter in den Dropdown-Menüs oder Hex-Werten anpassen.
   * Parameter in die ECU schreiben (`Hard Reset` oder `FN_ECU_Reset` ausführen, damit das Steuergerät die neuen Werte übernimmt).