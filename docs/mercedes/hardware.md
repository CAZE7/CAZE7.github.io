# 🔌 Hardware & Interfaces für Mercedes-Benz

Dieses Dokument beschreibt die Hardware für Diagnose, Codierung und Firmware-Updates bei Mercedes-Benz Fahrzeugen. Der Fokus liegt auf der Unterscheidung zwischen proprietären Multiplexern (SD Connect / VCI) und J2534-Passthrough-Geräten.

## 1. SD Connect & VCI (Professionelle Interfaces)

Für professionelle Werkstätten und weitreichende Eingriffe an modernen Fahrzeugen sind Original-Multiplexer oder hochwertige Clones oft unumgänglich.

| Interface | Protokolle | Besonderheiten | Community-Einschätzung |
| :--- | :--- | :--- | :--- |
| **SD Connect C4** | K-Line, CAN, UDS | Klassiker, extrem erprobt, Wireless möglich | Clone-Qualität sehr unterschiedlich; WLAN-Module oft instabil |
| **SD Connect C5** | K-Line, CAN, UDS, erweitertes DoIP | Verbesserte DoIP-Unterstützung gegenüber C4 | Gute Mittelklasse; einige C5 sind technisch C4-Clones im anderen Gehäuse |
| **VCI C6 (Original)** | Voll-DoIP, CAN-FD, USB/LAN/WLAN | Aktuelles Mercedes-Interface | Referenzstandard, aber sehr teuer |
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

## 2. J2534-Passthrough-Devices (Budget & Einstieg)

Für Privatanwender haben sich **J2534-Passthru-Geräte** als kosteneffizientester Standard etabliert. Diese Interfaces kommunizieren mit OEM-Software wie Xentry (PassThru Edition).

| Device | Protokolle / DoIP | Eignung | Bekannte Einschränkungen |
| :--- | :--- | :--- | :--- |
| **Tactrix OpenPort 2.0 (Original)** | CAN, K-Line / **Nein** | Ältere Fahrzeuge (ca. 2005-2015) | Kein DoIP; für DAS-Offline-Programming teilweise zu langsame Datenrate |
| **Tactrix OpenPort 2.0 (Clone)** | CAN, K-Line / **Nein** | Hobby/Einstieg | Datenrate nicht voll DAS-kompatibel; **Risiko bei ECU-Flashing** |
| **VXDIAG VCX SE (Benz-Version)** | CAN, DoIP / **Ja** | Universell (inkl. DoIP) | Zenzefi-Zertifikat erforderlich für DoIP-Fahrzeuge |
| **VXDIAG VCX SE (J2534)** | CAN / **Theoretisch** | Eingeschränkt | Benötigt Benz-Lizenz für volle Funktionalität |

!!! tip "Wichtiger Hinweis zu DoIP"
    Für Fahrzeuge ab ca. 2015 mit Ethernet-Backbone ist **DoIP** (Diagnostics over Internet Protocol) zwingend erforderlich. VXDIAG-Modelle bieten dies oft, der OpenPort 2.0 jedoch nicht.

!!! warning "OpenPort 2.0 Clone – Das Datenrate-Problem"
    In der Community mehrfach bestätigt: Chinesische OpenPort 2.0-Clones haben eine reduzierte Datenrate, die bei DAS-Offline-Programming (insbesondere Instrumentencluster-Updates an W169, W245 etc.) zu unvollständigen Flashes führen kann. Dies resultierte bei mehreren Nutzern in gebrickten Steuergeräten.
    **Lösung:** Für Offline-Programming ausschließlich Original-Tactrix oder SD Connect C4/C5 verwenden!

## 3. ELM327 – Absolut ungeeignet!

!!! danger "Achtung: Bricking-Gefahr durch ELM327-Clones"
    Billige ELM327-Adapter (oft für Smartphone-Apps genutzt) sind für Codierung und Flashen **absolut ungeeignet**. Sie weisen oft eine unvollständige Protokoll-Implementierung (fehlende ISO-TP-Flow-Control) und elektrische Instabilitäten auf. 
    Werden Flash-Routinen unterbrochen (z.B. durch verlorene Frames), bleibt der Bootloader oder Applikationsbereich unvollständig. Resultat: Die ECU ist funktional "gebricked" und erfordert teures Bench-Recovery.

---

## Siehe auch
* [Software & Architektur](software.md) – Passende XENTRY-Versionen für die Hardware.
* [DTS Monaco](dts_monaco.md) – Engineering-Tool zur Nutzung mit der hier genannten Hardware.
* [Praxis-Codierungen](anleitungen.md) – Praktische Anwendung der Hardware am Fahrzeug.
