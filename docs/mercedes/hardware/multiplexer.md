# 🔌 Multiplexer (SD Connect & VCI)

Für professionelle Werkstätten und weitreichende Eingriffe an modernen Mercedes-Benz Fahrzeugen sind Original-Multiplexer oder hochwertige Clones unumgänglich. Sie bilden das Rückgrat der tiefen Fahrzeugdiagnose.

---

## 1. Die Geräte im Vergleich

| Interface | Protokolle | Besonderheiten | Community-Einschätzung |
| :--- | :--- | :--- | :--- |
| **SD Connect C4** | K-Line, CAN, UDS | Klassiker, extrem erprobt, Wireless möglich | Clone-Qualität sehr unterschiedlich; WLAN-Module oft instabil |
| **SD Connect C5** | K-Line, CAN, UDS, erweitertes DoIP | Verbesserte DoIP-Unterstützung gegenüber C4 | Gute Mittelklasse; einige C5 sind technisch C4-Clones im anderen Gehäuse |
| **VCI C6 (Original)** | Voll-DoIP, CAN-FD, USB/LAN/WLAN | Aktuelles Mercedes-Interface | Referenzstandard, aber sehr teuer |
| **VCI C6 (Clone)** | DoIP, CAN, USB/LAN | ~450 €, chinesische Nachbauten | Funktioniert bei vielen, Zenzefi-Probleme häufig; Qualitätsschwankungen |

---

## 2. Warnung vor Clone-Fallen

Der Markt für C4/C5/C6-Interfaces ist extrem von billigen Nachbauten (Clones) durchzogen. 

!!! warning "Gefahren bei Clones"
    * **Qualitätsschwankungen:** C4-Clones aus verschiedenen Chargen können sich im PCB-Layout, WLAN-Chip und CAN-Transceiver massiv unterscheiden. Ein "guter" C4-Clone verbindet stabil über WLAN, ein schlechter verliert die Verbindung bei längeren Codierungen.
    * **Erkennung durch XENTRY:** Neuere XENTRY-Versionen prüfen MUX-Hardware-IDs. Clones mit falscher oder duplizierter Hardware-ID werden teilweise blockiert oder erzeugen Lizenzfehler (Stichwort: Blacklist).
    * **Stromversorgung:** Einige C4-Clones sind empfindlich auf Spannungseinbrüche beim Fahrzeug-Cranking. Stabile 12V-Bordnetzspannung ist essenziell.

---

## 3. Lösungswege für instabile C4-Verbindungen

Solltest du Verbindungsabbrüche mit deinem C4-Multiplexer haben, arbeite diese Checkliste ab:

1. **Kabel-Pflicht:** Verbindung bevorzugt per LAN-Kabel statt WLAN herstellen. Flashen über WLAN ist absolut tabu!
2. **MUX-Erkennung:** Im XENTRY-Control-Panel prüfen, ob der MUX korrekt als "SDconnect" erkannt wird.
3. **Firmware Update:** Firmware des C4 auf aktuellste stabile Version flashen (viele Clones kommen mit veralteter Firmware). *Vorsicht: Hierbei können minderwertige Clones zerstört werden!*
4. **Strom:** Bei dauerhaften Verbindungsabbrüchen am PC: Anderen USB-Port oder aktiven USB-Hub mit eigener Stromversorgung verwenden.

---

## Siehe auch
* [Passthrough Dongles](dongles.md) – Die günstige Alternative für Diagnose und leichte Codierung.
* [Diagnose Architektur](../software/architektur.md) – Welche XENTRY-Version zu welchem Multiplexer passt.
