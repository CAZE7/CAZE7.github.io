# 💻 Software & Sicherheit

Dieses Dokument beschreibt die technischen Grundlagen, Software-Werkzeuge und Sicherheitsmechanismen für Diagnose, Codierung und Firmware-Updates bei Mercedes-Benz Fahrzeugen.

## 1. Diagnose-Architektur bei Mercedes

Mercedes-Benz nutzt ein hierarchisches Diagnose- und Kodiersystem, das sich grundlegend von offenen Systemen unterscheidet:

### Protokolle und Transport

* :material-serial-port: **K-Line / KWP2000:** Ältere Modelle (bis ca. 2005) nutzen die serielle K-Line-Diagnose (ISO 9141 / ISO 14230).
* :material-network-outline: **CAN-Bus:** Mittlere Modellgenerationen (2005–2015) basieren auf CAN-Diagnose mit UDS/KWP2000-Services über ISO-TP.
* :material-ethernet: **Ethernet / DoIP:** Moderne Fahrzeuge (ab ca. 2015) setzen auf einen Ethernet-Backbone mit Diagnostics over Internet Protocol (DoIP, ISO 13400). DoIP kapselt UDS-Nachrichten in TCP/UDP und ermöglicht Gigabit-Datenraten, die für große Firmware-Übertragungen essenziell sind.

### Sicherheitsmechanismen

!!! abstract "Sicherheitskonzept: Seed & Key"
    Mercedes schützt sensible Funktionen durch **Seed & Key** (ISO 14229, UDS-Service 0x27). Der Ablauf ist streng reguliert:
    
    1. Das Diagnosesystem fordert einen **Seed** von der ECU an.
    2. Der Seed wird mit einem proprietären Algorithmus in einen **Key** umgerechnet.
    3. Der Key wird an die ECU zurückgesendet. Bei korrektem Wert wird die Session für Codierung/Flashen entsperrt.
    
    *Ohne korrekten Seed/Key-Zugriff sind tiefe Eingriffe unmöglich.* Seed/Key-Generatoren sind oft nur über spezialisierte Tools oder Dienstleister verfügbar.

Zusätzlich existieren **Online-Backend-Schutzmechanismen** (z.B. für Start-Freigaben und Variantencodierung), die eine Verbindung zum Daimler-System erfordern.

## 2. Software-Werkzeuge

### :material-laptop: Xentry (Offizielle Diagnosesoftware)
Xentry ist die aktuelle Diagnosesoftware von Mercedes-Benz und der direkte Nachfolger von DAS/Star Diagnosis.

* **Funktionalität:** Vollständige Fahrzeugdiagnose mit geführter Fehlersuche, SCN-Codierung (standardisierte Varianten-Codierung), Firmware-Flashen über FRF-Container sowie Online-Funktionen (Kommunikation mit dem Daimler-Backend).
* **Standard vs. Passthru:**
    * *Standard Xentry:* Erfordert SD-Connect-Multiplexer (C4, C5, C6).
    * *Xentry Passthru:* Kompatibel mit günstigen J2534-Geräten (z.B. Tactrix OpenPort 2.0). Verzichtet auf vollständigen DoIP-Support für alte Fahrzeuge, reicht aber für modernere CAN-basierte Modelle (2005–2015) völlig aus.

*(Hinweis: Xentry speichert CBF- und SMR-D-Dateien lokal ab, typischerweise unter `Xentry\ODXProjekte\PKW_COMMON\dbr`, von wo aus Vediamo und DTS Monaco sie nutzen können.)*

### :material-tools: Vediamo (Engineering-Tool)
Ein Engineering-Tool von Mercedes/Vector für die tiefe Diagnose und Codierung.

* **Einsatzgebiet:** Primär für Variantencodierungen und Komfortanpassungen, wenn Xentry keine grafische Option bietet.
* **Merkmale:** Zugriff auf Diagnose-Services und DIDs (Datenobjekte). Es unterstützt hauptsächlich CBF-Dateien (Fahrzeuge bis ca. 2015) und nutzt Seed & Key-basierten Security-Access über externe Generatoren.

### :material-monitor-dashboard: DTS Monaco (Engineering-Plattform)
Das moderne Engineering-Tool für Diagnose, Codierung und Flashen auf Basis von SMR-D/SMR-F-Daten.

* **Eigenschaften:** Bietet native SMR-D/SMR-F-Projektunterstützung für moderne Fahrzeuge, DoIP-Support und komplexe Workspaces mit vordefinierten Masken.
* **Anwendung:** Setzt tiefgreifende Kenntnisse voraus und wird für umfangreiche Codier- und Flasharbeiten verwendet.

!!! warning "Consumer-Apps (Smartphone)"
    Smartphone-basierte Apps (wie Carly) bieten nur Standard-OBD-Funktionen und sind für tiefe Variantencodierungen oder Firmware-Updates ungeeignet. Gründe dafür sind fehlende codierbare Parameter in Consumer-APIs, fehlende Seed-&-Key-Mechanismen sowie limitierter DoIP-Support.

## 3. Datenformate: CBF vs. SMR-D/SMR-F

Mercedes verwendet proprietäre Container-Formate, die je nach Fahrzeuggeneration variieren:

| Feature | CBF-Dateien | SMR-D / SMR-F Dateien |
| :--- | :--- | :--- |
| **Format** | Proprietäre Vector-Container | Strukturierte, XML-ähnliche Beschreibung |
| **Einsatzbereich** | Ältere Fahrzeuge (bis ca. 2015) | Moderne Fahrzeuge (ab ca. 2016, z.B. W205, W213) |
| **Tools** | Vediamo, alte DTS Monaco Versionen | DTS Monaco (nativ), neuere Vediamo Versionen, Xentry |
| **Charakteristik** | Erfordert oft manuelle Interpretation von Hex-Daten | Automatische Validierung von Änderungen |

## 4. Typische Fehler und Ursachen

| **Fehlerbild** | **Häufige Ursache** | **Prävention & Lösung** |
| :--- | :--- | :--- |
| **Flashen bricht ab** | Instabile J2534-Verbindung, fehlerhafte ISO-TP | USB-Hub/Kabel prüfen, professionelle Hardware nutzen. |
| **ECU nicht erreichbar** | DoIP-Fahrzeug an nicht-DoIP-Hardware angeschlossen | Fahrzeuggeneration prüfen, DoIP-Hardware (VXDIAG) wählen. |
| **Seed/Key-Fehler** | Falscher Generator genutzt oder Session abgelaufen | Seed neu anfordern, modellspezifischen Generator nutzen. |
| **Falscher Fahrzeugtyp** | VIN nicht korrekt übertragen | VIN 3x überprüfen, Fahrzeugdaten ggf. manuell eingeben. |
| **Spannungsabfall** | Batterie schwach, instabile Stromversorgung | Batterie muss min. 13,5V haben, externes Ladegerät nutzen. |
