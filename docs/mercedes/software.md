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

---

## 5. Systemarchitektur: Die drei XENTRY-Varianten
XENTRY existiert in drei technisch unterschiedlichen Distributionen. Die Wahl bestimmt Hardware-Kompatibilität, Fahrzeugabdeckung und verfügbare Funktionen.

| Variante | Zweck | Hardware | Fahrzeugabdeckung | Schlüsselfunktionen |
| :--- | :--- | :--- | :--- | :--- |
| **XENTRY OpenShell (XDOS)** | Professionelle Werkstattdiagnose | SD Connect C4/C5/C6, VXDIAG VCX SE | Vollständig, inkl. älteste Modelle | DAS-Modus, Offline-SDFlash, SCN-Coding, alle Sonderfunktionen |
| **XENTRY PassThru (XPT)** | J2534-konforme Passthrough-Diagnose | OpenPort 2.0, VXDIAG J2534, OEM-Interfaces | ~95%, Einschränkungen bei DoIP/Neufahrzeugen | Quick Test, Fehlerspeicher, Grundcodierung, eingeschränkte Programmierung |
| **XENTRY Diagnostics** | Offizielle Mercedes-Werkstattversion | Original Mercedes VCI | Vollständig mit Online-Zugang | SCN-Online-Coding, Live-Updates, volle Herstellergarantie |

!!! info "Entscheidungshilfe"
    Für professionelle Werkstätten mit älteren Fahrzeugen (pre-2015) ist XENTRY OpenShell mit SD Connect C4/C5 weiterhin die vielseitigste Lösung. Für reine DoIP-Neufahrzeuge (W206, W223, W167 MOPF2) benötigt man entweder original VCI C6 oder hochwertige Clone-Alternativen mit korrekter Zenzefi-Zertifikation.

## 6. Hardware-Ökosystem: Interfaces im Vergleich

### 6.1 SD Connect C4 / C5 / C6

| Interface | Protokolle | Besonderheiten | Community-Einschätzung |
| :--- | :--- | :--- | :--- |
| **SD Connect C4** | K-Line, CAN, UDS | Klassiker, extrem erprobt, Wireless möglich | Clone-Qualität sehr unterschiedlich; WLAN-Module oft instabil |
| **SD Connect C5** | K-Line, CAN, UDS, erweitertes DoIP | Verbesserte DoIP-Unterstützung gegenüber C4 | Gute Mittelklasse; einige C5 sind technisch C4-Clones im anderen Gehäuse |
| **VCI C6 (Original)** | Voll-DoIP, CAN-FD, USB/LAN/WLAN | Aktuelles Mercedes-Interface, ~3.000 € | Referenzstandard, aber teuer |
| **VCI C6 (Clone)** | DoIP, CAN, USB/LAN | ~450 €, chinesische Nachbauten | Funktioniert bei vielen, Zenzefi-Probleme häufig; Qualitätsschwankungen |

!!! warning "C4/C5/C6 Clone-Fallen"
    * **Qualitätsschwankungen:** C4-Clones aus verschiedenen Chargen können sich im PCB-Layout, WLAN-Chip und CAN-Transceiver unterscheiden. Ein "guter" C4-Clone verbindet stabil über WLAN, ein schlechter verliert die Verbindung bei längeren Codierungen.
    * **Erkennung durch XENTRY:** Neuere XENTRY-Versionen prüfen MUX-Hardware-IDs. Clones mit falscher oder duplizierter Hardware-ID werden teilweise blockiert oder erzeugen Lizenzfehler.
    * **Stromversorgung:** Einige C4-Clones sind empfindlich auf Spannungseinbrüche beim Fahrzeug-Cranking. Stabile 12V-Bordnetzspannung ist essenziell.

**Lösungsweg für instabile C4-Verbindungen:**
* Verbindung bevorzugt per LAN-Kabel statt WLAN herstellen.
* Im XENTRY-Control-Panel prüfen, ob MUX als "SDconnect" erkannt wird.
* Firmware des C4 auf aktuellste stabile Version flashen (viele Clones kommen mit veralteter Firmware).
* Bei dauerhaften Verbindungsabbrüchen: Anderen USB-Port oder aktiver USB-Hub mit eigener Stromversorgung verwenden.

### 6.2 J2534-Passthrough-Devices (PassThru)

| Device | Preis | DoIP | Eignung | Bekannte Einschränkungen |
| :--- | :--- | :--- | :--- | :--- |
| **Tactrix OpenPort 2.0 (Original)** | ~$170 | Nein | Ältere Fahrzeuge (W204, W212, W166) | Kein DoIP; für DAS-Offline-Programming teilweise zu langsame Datenrate |
| **Tactrix OpenPort 2.0 (Clone)** | ~$30 | Nein | Hobby/Einstieg | Datenrate nicht voll DAS-kompatibel; Risiko bei Control-Unit-Flashing |
| **VXDIAG VCX SE (Benz-Version)** | ~$300-400 | Ja (mit Lizenz) | Universell | Zenzefi-Zertifikat erforderlich für DoIP-Fahrzeuge |
| **VXDIAG VCX SE (J2534-Version)** | ~$200 | Theoretisch ja | Eingeschränkt | Benötigt Benz-Lizenz für volle Funktionalität; DoIP oft problematisch ohne korrekte Zenzefi-Konfiguration |

!!! warning "OpenPort 2.0 Clone – Das Datenrate-Problem"
    In der Community mehrfach bestätigt: Chinesische OpenPort 2.0-Clones haben eine reduzierte Datenrate, die bei DAS-Offline-Programming (insbesondere Instrumentencluster-Updates an W169, W245 etc.) zu unvollständigen Flashes führen kann. Dies resultierte bei mehreren Nutzern in gebrickten Steuergeräten.

**Lösungsweg:**
* Für DAS-Offline-Programming ausschließlich Original-Tactrix oder SD Connect C4/C5 verwenden.
* Wenn nur Clone verfügbar: Control-Unit vor dem Flash aus dem Fahrzeug ausbauen und On-Bench mit stabilier Stromversorgung programmieren.
* Immer Battery-Stabilizer (mindestens 30A) während des Flashvorgangs verwenden.

## 7. Software-Installation: Der korrekte Ablauf

### 7.1 Systemvoraussetzungen
* **Betriebssystem:** Windows 10/11 Pro (64-Bit), empfohlen: frische Installation
* **RAM:** Mindestens 8 GB, 16 GB empfohlen für XDOS mit SDFlash
* **Festplatte:** SSD empfohlen; XENTRY-Installation belegt 40-60 GB
* **Netzwerk:** Deaktiviert oder blockiert während Installation (Firewall/Hosts-Datei)
* **UAC:** Deaktiviert während Installation und erstem Start
* **Antivirus:** Vollständig deaktiviert oder Ausnahmen für Mercedes-Benz-Verzeichnisse

### 7.2 Installationsreihenfolge (kritisch!)

!!! info "Die Reihenfolge ist nicht optional"
    XENTRY-Installationen scheitern häufig an falscher Treiber-Installation oder veralteten Abhängigkeiten. Die Community hat folgende Reihenfolge als robust validiert:
    
    1. Windows-Grundinstallation mit allen Updates, .NET Framework 3.5/4.8 aktiviert
    2. Visual C++ Redistributables (alle Versionen 2005-2022) installieren
    3. Java Runtime Environment (oft JRE 8uXXX erforderlich für ältere Komponenten)
    4. XENTRY-Base-Installation aus ISO (start.exe als Administrator)
    5. Neustart
    6. Treiber-Installation für Interface (C4-Treiber VON DER XENTRY-ISO, nicht von Drittanbietern)
    7. Neustart
    8. Patches/Medicines anwenden (immer als Administrator ausführen)
    9. StartKey/Activation einspielen
    10. Neustart
    11. Zenzefi installieren (falls DoIP-Fahrzeuge geplant)
    12. Testverbindung mit einem bekannten Fahrzeug durchführen

!!! warning "Treiber-Chaos vermeiden"
    Ein klassischer Fehler ist die Installation von C4-Treibern aus alternativen Quellen (z.B. ältere XENTRY-Versionen, chinesische "All-in-One"-Pakete). Dies führt zu Versionskonflikten beim Caesar-Treiber (XDOS nutzt Version 3.3.5.1, PassThru erfordert 3.3.6.2).
    
    **Lösungsweg bei Caesar-Treiber-Konflikt:**
    * In `C:\Windows\System32\drivers\` prüfen, welche caesar.dll vorhanden ist.
    * Für XDOS: Caesar 3.3.5.1 muss aktiv sein.
    * Für PassThru: Caesar 3.3.6.2 muss aktiv sein.
    * Switching-Tools (Registry-Switcher) können zwischen XDOS und PassThru wechseln, setzen aber konsistente Treibervoraussetzungen voraus.

## 8. Zenzefi-Zertifikate: Die DoIP-Schwelle

### 8.1 Was ist Zenzefi?
Zenzefi ist Mercedess Zertifikatsmanagement-System für die gesicherte Kommunikation mit DoIP-Fahrzeugen. Moderne Mercedes (W206, W223, W167 MOPF2, W447 MOPF2) erfordern gültige Diagnosezertifikate auf dem VCI.

### 8.2 Bekannte Zenzefi-Probleme

| Problem | Symptom | Ursache | Lösungsweg |
| :--- | :--- | :--- | :--- |
| **Certificate import failure** | "Cannot import certificate" / P12/DCS wird abgelehnt | Zenzefi-Version inkompatibel mit XENTRY-Version | Zenzefi auf Version 12.2023 downgraden; Root-CA und Backend-CA manuell importieren |
| **Missing Root/Backend CA** | Zertifikat als "untrusted" markiert | Aktualisierte Zenzefi-Version hat geänderte CA-Struktur | Downgrade auf 12.2023 oder manuelles Einspielen der Legacy-CAs |
| **Zenzefi license failure** | Lizenzupload schlägt fehl (VXDIAG) | XENTRY 2024.03+ hat geänderte Lizenzvalidierung | Zwei Dateien in XENTRY-Verzeichnis ersetzen (von VXDIAG-Distributor erhalten) |
| **Server not accessible** | "The server for diagnosis certificates is not accessible" | Lizenz erfordert Online-Transaktion / ungültige Offline-Konfiguration | Offline-Properties-Dateien aktualisieren oder korrekten StartKey verwenden |

!!! warning "Zenzefi-Downgrade-Risiko"
    Ein Downgrade von Zenzefi auf 12.2023 kann zwar Zertifikatimporte retten, führt aber bei sehr neuen Fahrzeugen (2025+) möglicherweise zu verweigerten ECU-Verbindungen, da diese neuere Zertifikatsanforderungen haben. Immer Testfahrzeug mit geringerem Risiko zuerst verwenden.

## 9. Erweiterte Fehlerbehebung

### 9.1 XENTRY Error 2221-45 & 3.91
**Symptom:** XENTRY startet nicht oder bricht mit Fehler 2221-45 oder 3.91 ab.

**Ursachen:**
* Veraltete oder fehlende DLL-Dateien in der XENTRY-Installation
* Inkompatible "Medicine"-Version für die installierte XENTRY-Version
* Fehlende oder inkorrekte DAS-Lizenz

**Lösungsweg:**
* Aktuelles "FullFix"-Paket für die entsprechende XENTRY-Version besorgen (z.B. FullFix-Xentry-2021-12.exe).
* Als Administrator ausführen und "Configure" wählen.
* Fehlende Bilddateien, DLLs und der DAS License 0-Day-Fix werden automatisch ersetzt.
* Bei 3.91-Fehler: Prüfen, ob StartKey korrekt generiert und eingespielt wurde; Keygen-Version muss zur XENTRY-Version passen.

### 9.2 "The data are faulty"
**Symptom:** XENTRY verbindet sich nicht mit Fahrzeug; Fehlermeldung "The data are faulty".  
**Ursache:** Addon-Update hat `ModulEinstieg_Template.gmf` im Verzeichnis `C:\Program Files (x86)\Mercedes-Benz\Xentry\MB_PKW\Baureihe\BR_Templates\` mit einer neueren, inkompatiblen Version überschrieben.

**Lösungsweg:**
* In `C:\ProgramData\Mercedes-Benz\logs\Xentry\` die Logdateien prüfen.
* Wenn `MissingPluginException: Could not load file ... ModulEinstieg_Template.gmf` erscheint: Datei mit älterer Version aus Backup oder frischer ISO ersetzen.
* XENTRY neu starten.

### 9.3 Login Failure / "Insufficient user rights"
**Symptom:** XENTRY zeigt Login-Fehler oder "insufficient user rights for connecting to latest DoIP vehicles" (W223, W206, W213, W167).  
**Ursache:** Offline-Konfigurationsdateien (offline_properties) sind abgelaufen oder für die aktuelle XENTRY-Version nicht gültig.

**Lösungsweg:**
* Aktualisierte offline_properties-Dateien für die entsprechende XENTRY-Version besorgen (z.B. 2024.03, 2024.09).
* Zwei Dateien ersetzen:
  1. `C:\Program Files (x86)\Mercedes-Benz\Xentry\bin\offline_properties`
  2. `C:\Program Files (x86)\Mercedes-Benz\Xentry\bin\offline_properties2` (oder entsprechendes Zweitverzeichnis)
* *Wichtig:* Beide Dateien müssen ersetzt werden – nur eine zu aktualisieren reicht nicht.
* XENTRY neu starten; Standard-Login (oft: User `xentry`, Passwort `123456`) verwenden.

### 9.4 DoIP-Verbindungsprobleme
**Symptom:** CAN-Fahrzeuge verbinden einwandfrei, DoIP-Fahrzeuge (W206, W223, GLA X156 Headunit) erzeugen "No resources available" oder Verbindungsabbruch.

**Ursachen:**
* VCI unterstützt DoIP theoretisch, aber Zenzefi-Zertifikat fehlt oder ist ungültig
* VCI im falschen Modus (USB vs. LAN vs. WLAN)
* Bei VXDIAG J2534 ohne Benz-Lizenz: DoIP-Protokoll nicht freigeschaltet

**Lösungsweg:**
* In der VCI-Admin-Oberfläche (z.B. VXDIAG-Tool) prüfen, ob DoIP auf "ON" steht.
* Verbindung bevorzugt per LAN herstellen (stabiler als USB/WLAN bei DoIP).
* Zenzefi-Zertifikat prüfen und ggf. neu importieren.
* Bei VXDIAG: Benz-spezifische Lizenz erwerben; J2534-Generic-Version unterstützt DoIP bei Mercedes oft nur eingeschränkt.

## 10. Codierung und Programmierung

### 10.1 SCN-Coding

| Modus | Beschreibung | Voraussetzung |
| :--- | :--- | :--- |
| **SCN-Online-Coding** | Live-Verbindung zu Mercedes-Servern; aktuellste Daten | Händler-Account, Internet, original XENTRY Diagnostics |
| **SCN-Offline-Coding** | Lokal gespeicherte Codierdatensätze | Spezielle Freischaltung in XENTRY OpenShell; nicht alle Steuergeräte unterstützt |
| **SCN-Online via Token** | Bezahlte Einzeltransaktion ohne Händlervertrag | Drittanbieter-Tokens (Rechtslage beachten) |

!!! info "SCN-Offline-Coding Realität"
    Nicht alle Steuergeräte erlauben Offline-SCN-Coding. Einige Module (insbesondere sicherheitsrelevante wie Airbag, Drive-Authorization) verlangen zwingend Online-Verbindung. Vor dem Kauf einer Offline-SCN-Lösung prüfen, welche Baureihen und Steuergeräte tatsächlich unterstützt werden.

### 10.2 DAS-Offline-Programming / SDFlash
SDFlash ermöglicht Firmware-Updates ohne Internetverbindung.

* **Risiko:** Bei unterbrochenem Flashvorgang kann das Steuergerät unbrauchbar werden ("gebrickt").
* **Pflicht:** Battery-Stabilizer (mindestens 30A, besser 50A-70A) während gesamten Flashvorgangs.
* **Empfohlen:** Fahrzeugbatterie vorher auf >80% SoC laden.

!!! warning "Battery-Stabilizer ist nicht optional"
    Mehrere Community-Berichte bestätigen Totalausfälle von Steuergeräten durch Spannungseinbrüche während des Flashvorgangs. Ein einfaches Ladegerät reicht nicht – es muss ein spezieller Diagnose-Stabilizer mit mindestens 30A Dauerleistung sein.

### 10.3 Vediamo & DTS Monaco

| Tool | Einsatzzweck | Schwierigkeit |
| :--- | :--- | :--- |
| **Vediamo 4.2.2 / 5.1.1** | Direkter ECU-Zugriff, Variantencodierung, SeedKey-Entsperrung, CBF-Flashing | Mittel; CBF-SMRD-Dateien erforderlich |
| **DTS Monaco 8.14 – 9.02** | Erweitertes Engineering-Tool; unterstützt ältere und neuere Modelle; Projekt-basiert | Hoch; volle SMRD- und Projektdateien nötig |

**Vediamo Best Practices:**
* Immer Backup der Steuergeräte-Coding vor jeder Änderung erstellen.
* SeedKey-Level: Standard-Zugriff reicht für Coding; Level 9/10 erfordert Freischaltung und ist für Flashing/Security-Functions nötig.
* CBF-Dateien: Aktuelle CBF-Versionen müssen zur Fahrzeugsoftware passen; falsche CBF = Fehlfunktion.

## 11. Versionskompatibilität und Updates

### 11.1 XENTRY-Versionen und Fahrzeugabdeckung

| XENTRY-Version | Besonderheit | Empfohlene Hardware |
| :--- | :--- | :--- |
| **2021.06 – 2021.12** | Letzte Versionen mit breitem DAS-Support | SD Connect C4/C5 |
| **2022.06 – 2023.03** | Übergangsphase; SDFlash-Offline stabiler | SD Connect C4/C5/C6 |
| **2023.06 – 2023.09** | Sehr stabile Community-Versionen; breite Clone-Unterstützung | C4/C5/C6, VXDIAG |
| **2023.12 – 2024.03** | Zenzefi-Zertifikatsprüfung verschärft | Original oder gute C6-Clones |
| **2024.06+** | Erhöhte Online-Validierung; Härtere Clone-Erkennung | Original VCI C6 empfohlen |

!!! info "Versionswahl"
    Für Werkstätten mit breitem Fahrzeugspektrum (Alt + Neu) ist XENTRY 2023.09 in der Community als besonders ausgewogen und stabil dokumentiert. Für reine Neufahrzeuge ab 2024 ist XENTRY 2024.03+ mit korrektem Zenzefi-Setup erforderlich.

### 11.2 Clone-HDD/SSD-Probleme
Klonen einer XENTRY-Festplatte ist technisch möglich, führt aber häufig zu Aktivierungsverlust, da Hardware-IDs (MAC-Adresse, Festplatten-Seriennummer) in die Lizenzierung eingebunden sind.

**Lösungsweg:**
* Nach dem Klonen: Neue StartKey mit aktuellen Hardware- und App-IDs generieren.
* Alternativ: Fresh-Installation auf neuer SSD/HDD bevorzugen; anschließend Patches und Activation einspielen.

## 12. Wartung und Langzeitbetrieb

### 12.1 Systempflege
* **Regelmäßige Backups:** XENTRY-Systemabbild erstellen, nachdem alles stabil läuft.
* **Keine Windows-Updates während aktiver Diagnose-Phase:** Updates können Treiber oder .NET-Versionen ändern.
* **Hosts-Datei/ Firewall:** XENTRY darf nicht mit Mercedes-Servern kommunizieren (bei gepatchten Versionen), sonst droht Lizenzsperre.
* **Logdateien prüfen:** `C:\ProgramData\Mercedes-Benz\logs\` – bei Fehlern erste Anlaufstelle.

### 12.2 Langzeitstrategie

| Szenario | Empfohlene Vorgehensweise |
| :--- | :--- |
| **Reiner älterer Fuhrpark (W204, W212, W166)** | XENTRY OpenShell 2023.09 + SD Connect C4/C5 |
| **Gemischter Fuhrpark + erste DoIP-Fahrzeuge** | XENTRY 2023.12/2024.03 + VXDIAG VCX SE Benz |
| **Moderner Fuhrpark (W206, W223, W167 MOPF2)** | Original VCI C6 oder hochwertiger Clone + aktuelle Zenzefi-Lizenzen |
| **Budget-Lösung Einsteiger** | XENTRY PassThru + OpenPort 2.0 Original (kein DoIP) |

## 13. Glossar

| Begriff | Erklärung |
| :--- | :--- |
| **DAS** | Diagnosis Assistance System; ältere Diagnoseschicht in XENTRY für Fahrzeuge bis ca. 2014 |
| **XDOS** | XENTRY Diagnosis OpenShell; moderne Diagnoseschicht |
| **XPT** | XENTRY PassThru; J2534-kompatible Variante |
| **DoIP** | Diagnostics over Internet Protocol; Ethernet-basierte Diagnose für aktuelle Fahrzeuge |
| **SCN** | Software Calibration Number; Codierung/Programmierung von Steuergeräten |
| **SDFlash** | Offlinesoftwaredistribution-Flash; Firmware-Update ohne Internet |
| **Zenzefi** | Zertifikatsmanagement-System für DoIP |
| **VCI** | Vehicle Communication Interface; Hardware-Interface (C4/C5/C6) |
| **MUX** | Multiplexer; ältere Bezeichnung für das Diagnose-Interface |
| **CBF** | Controller Flash File; Flash-Datei für Steuergeräte |
| **SMRD** | Service Measure Recall Data; Projektdateien für DTS Monaco |
| **SeedKey** | Sicherheitsmechanismus zur Freischaltung von Steuergeräten |

*Quellen: Smartland Forum, MHHAuto, Digital Eliteboard, AutoGMT, CarTechnology, MBWorld, Reddit r/CarHacking, OBDII365-Blog, VXDIAG-Shop-Blog, Sterndiagnose.ch*

*Diese Dokumentation basiert auf gesammelten Community-Erfahrungen und dient als Wissensbasis. Für sicherheitsrelevante Codierungen wird die Konsultation eines Fachbetriebs empfohlen*
