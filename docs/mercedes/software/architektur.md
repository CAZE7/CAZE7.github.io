# Software, Architektur & Fehlerbehebung

Dieses Dokument beschreibt die Software-Architektur, Installationsroutinen und Sicherheitsmechanismen (Zenzefi, Seed & Key) bei Mercedes-Benz Fahrzeugen.

---

## 1. Diagnose-Architektur bei Mercedes

Mercedes-Benz nutzt ein hierarchisches Diagnose- und Kodiersystem, das sich grundlegend von offenen OBD2-Systemen unterscheidet:

### 1.1 Protokolle und Transport
* **K-Line / KWP2000:** Ältere Modelle (bis ca. 2005) nutzen die serielle K-Line-Diagnose (ISO 9141 / ISO 14230).
* **CAN-Bus:** Mittlere Modellgenerationen (2005–2015) basieren auf CAN-Diagnose mit UDS/KWP2000-Services über ISO-TP.
* **Ethernet / DoIP:** Moderne Fahrzeuge (ab ca. 2015) setzen auf einen Ethernet-Backbone mit Diagnostics over Internet Protocol (DoIP, ISO 13400). DoIP kapselt UDS-Nachrichten in TCP/UDP und ermöglicht Gigabit-Datenraten.

### 1.2 Sicherheitsmechanismen: Seed & Key
Sensible Funktionen sind durch **Seed & Key** (ISO 14229, UDS-Service 0x27) geschützt.
1. Das Diagnosesystem fordert einen **Seed** (Zufallswert) von der ECU an.
2. Der Seed wird mit einem Algorithmus in einen **Key** umgerechnet.
3. Der Key wird an die ECU zurückgesendet. Bei korrektem Wert wird die Session entsperrt.

*Ohne korrekten Seed/Key-Zugriff sind tiefe Eingriffe (Varianten-Codierung, Flashing) unmöglich.* Seed/Key-Generatoren sind oft nur über spezialisierte Tools verfügbar.

---

## 2. Die drei XENTRY-Varianten

XENTRY ist die offizielle Diagnosesoftware. Sie existiert in drei technisch unterschiedlichen Distributionen:

### 2.1 XENTRY OpenShell (XDOS)
**Zweck:** Professionelle Werkstattdiagnose  
**Hardware-Voraussetzung:** SD Connect C4/C5/C6, VXDIAG  
**Fahrzeugabdeckung:** Vollständig (inkl. älteste Modelle)

### 2.2 XENTRY PassThru (XPT)
**Zweck:** J2534-konforme Diagnose  
**Hardware-Voraussetzung:** OpenPort 2.0, VXDIAG J2534  
**Fahrzeugabdeckung:** ~95%, Einschränkungen bei DoIP

### 2.3 XENTRY Diagnostics
**Zweck:** Offizielle Werkstattversion  
**Hardware-Voraussetzung:** Original Mercedes VCI  
**Fahrzeugabdeckung:** Vollständig (mit Online-Zugang)

!!! info "Entscheidungshilfe"
    Für Werkstätten mit älteren Fahrzeugen (pre-2015) ist **XENTRY OpenShell** die vielseitigste Lösung. Für reine DoIP-Neufahrzeuge benötigt man entweder original VCI C6 oder hochwertige Clone-Alternativen mit korrekter **Zenzefi**-Zertifikation.

---

## 3. Software-Installation: Der korrekte Ablauf

XENTRY-Installationen scheitern häufig an falscher Treiber-Installation oder veralteten Abhängigkeiten. 

### 3.1 Installationsreihenfolge (Community-Validiert)
1. Windows-Grundinstallation (Win 10/11 Pro 64-Bit), .NET Framework 3.5/4.8 aktiviert.
2. Visual C++ Redistributables (alle Versionen 2005-2022) installieren.
3. Java Runtime Environment installieren (oft JRE 8).
4. XENTRY-Base-Installation aus ISO (als Administrator).
5. **Neustart.**
6. Treiber-Installation für Interface (C4-Treiber VON DER XENTRY-ISO, nicht von Drittanbietern).
7. **Neustart.**
8. Patches/Medicines anwenden (Admin).
9. StartKey/Activation einspielen.
10. **Neustart.**
11. Zenzefi installieren (falls DoIP-Fahrzeuge geplant).

!!! warning "Treiber-Chaos beim Caesar-Treiber"
    Ein klassischer Fehler ist die Installation von Treibern aus alternativen "All-in-One"-Paketen. 
    * XDOS nutzt oft Caesar 3.3.5.1
    * PassThru erfordert Caesar 3.3.6.2
    * In `C:\Windows\System32\drivers\` prüfen, welche `caesar.dll` vorhanden ist!

---

## 4. Zenzefi-Zertifikate (Die DoIP-Schwelle)

Zenzefi ist Mercedess Zertifikatsmanagement-System für die gesicherte Kommunikation mit modernen DoIP-Fahrzeugen (W206, W223, W167 MOPF2).

### 4.1 Certificate import failure
**Symptom:** P12/DCS wird abgelehnt  
**Lösungsweg:** Zenzefi auf Version 12.2023 downgraden; Root-CA manuell importieren

### 4.2 Missing Root CA
**Symptom:** Zertifikat als "untrusted" markiert  
**Lösungsweg:** Manuelles Einspielen der Legacy-CAs

### 4.3 Server not accessible
**Symptom:** "Server for diagnosis certificates is not accessible"  
**Lösungsweg:** Offline-Properties-Dateien aktualisieren oder korrekten StartKey verwenden

---

## 5. Erweiterte Fehlerbehebung

### 5.1 XENTRY Error 2221-45 & 3.91
* **Symptom:** XENTRY startet nicht oder bricht mit Fehler ab.
* **Ursache:** Inkompatible "Medicine"-Version oder fehlende DAS-Lizenz.
* **Lösung:** Aktuelles "FullFix"-Paket für die spezifische XENTRY-Version besorgen und ausführen. StartKey prüfen.

### 5.2 "The data are faulty"
* **Symptom:** XENTRY verbindet sich nicht, Addon-Update hat `ModulEinstieg_Template.gmf` zerschossen.
* **Lösung:** In `C:\ProgramData\Mercedes-Benz\logs\Xentry\` Logs prüfen. Defekte `.gmf` Datei im Ordner `BR_Templates` aus einem Backup wiederherstellen.

### 5.3 Login Failure / "Insufficient user rights"
* **Symptom:** DoIP-Fahrzeuge verweigern Verbindung.
* **Ursache:** `offline_properties` Dateien abgelaufen.
* **Lösung:** In `Xentry\bin\` die Dateien `offline_properties` und `offline_properties2` durch aktuelle Versionen ersetzen.

---

## 6. Versionskompatibilität

Für Werkstätten mit breitem Fahrzeugspektrum ist **XENTRY 2023.09** in der Community als besonders ausgewogen und stabil dokumentiert. Für reine Neufahrzeuge ab 2024 ist **XENTRY 2024.03+** mit korrektem Zenzefi-Setup erforderlich.


## Siehe auch
* [Multiplexer](../hardware/multiplexer.md) – Welche Profi-Hardware du brauchst.
* [DTS Monaco](dts_monaco.md) – Der Guide für das Engineering-Tool DTS Monaco.
* [SMR-D Quellen](smr_d.md) – Wo SMR-D und CFF Dateien gespeichert sind.
