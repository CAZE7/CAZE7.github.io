# Hardware & Interfaces (VAG)

Dieses Dokument beschreibt die Hardware-Anforderungen und Kommunikationsprotokolle für Fahrzeuge der Marken VW, Audi, Seat, Škoda, Bentley und Lamborghini. Der Fokus liegt auf der Unterscheidung zwischen professionellen Interfaces, Consumer-Lösungen und typischen "Clone-Fallen".

---

## 1. Diagnose-Architektur & Protokolle

Die Steuergeräte-Kommunikation im VAG-Konzern durchlief drei wesentliche technologische Generationen:

* **K-Line (ISO 9141 / KW1281):** Einsatz in älteren Modellen (vor ca. 2005). Die Kommunikation erfolgt seriell und mit sehr geringer Datenrate.
* **CAN-Bus:** Der Industriestandard ab ca. 2005 (Golf 5, Audi A3 8P). Es kommen Protokolle wie TP2.0 und später UDS (Unified Diagnostic Services, ab ca. 2009) zum Einsatz.
* **DoIP (Diagnostics over IP):** Bei aktuellen Modellen (z. B. Golf 8, ID-Serie, Audi e-tron) für hohe Datenvolumina verwendet. Ohne DoIP-fähige Hardware sind Firmware-Updates an modernen Gateways schlicht unmöglich.

---

## 2. Professionelle Hardware

Für tiefgreifende Codierungen, Parametrierungen und Flashing wird Hardware mit nativer PC-Anbindung benötigt.

### 2.1 VCDS HEX-V2 / HEX-NET (Ross-Tech)
Das ultimative Tool für Diagnose und Langcodierung.
* **Eignung:** Perfekt für Fehlerdiagnose, Codierung und Anpassungen.
* **Protokolle:** K-Line, CAN, UDS. (DoIP-Unterstützung variiert je nach Modell-Generation).
* **Limitierung:** Kann **nicht** flashen und unterstützt **keine ZDC-Parameter**.

??? danger "Die VCDS Clone-Falle"
    Auf asiatischen Marktplätzen werden unzählige "HEX-V2" Kabel für 20-30 € verkauft. 
    **Achtung:** Fast alle diese Kabel sind intern alte, geklonte HEX-CAN Chips (ATmega), die lediglich in einem neuen HEX-V2-Gehäuse stecken. Sie unterstützen keine modernen UDS-Fahrzeuge (ab MQB Plattform, Golf 7 aufwärts) korrekt. Wenn du damit versuchst, ein MQB-Steuergerät zu codieren, riskierst du Datenverlust in der Codierung!

### 2.2 VAS 6154A (Original VAG)
Das offizielle Diagnose-Interface für ODIS Service und ODIS Engineering.
* **Eignung:** Flashen, SVM-Online-Codierung, geführte Fehlersuche.
* **Protokolle:** Vollständige Unterstützung aller Protokolle inkl. nativen DoIP und CAN-FD.

??? warning "Die VAS 6154 Clone-Falle"
    Der Markt ist überflutet mit "VAS 6154" Clones. Meist handelt es sich dabei intern um alte **VAS 5054A** Platinen (oder schlechte J2534-Derivate), die kein echtes DoIP können. Für einen Golf 8 (MQB-evo) sind diese Clones absolut unbrauchbar. Es gibt extrem teure "echte" 6154-Clones, jedoch ist für Privatnutzer ein VXDIAG oft die bessere, günstigere PassThru-Alternative.

### 2.3 VCP (VAG CAN PRO)
Spezialist für Firmware-Updates und Parametrierung.
* **Eignung:** Unersetzlich für Retrofits (Nachrüstungen), da es als einziges Tool (neben ODIS) *ZDC-Dateien* (Binäre Datensätze) auf Steuergeräte schreiben kann.
* **Smartcard:** Das Interface ist an eine USB-Smartcard (Dongle) gebunden.

---

## 3. Consumer-Hardware & Dongles

### 3.1 OBDeleven
Ein Bluetooth-Dongle (Android/iOS), der sich zum mächtigsten VCDS-Konkurrenten entwickelt hat.
* **Vorteile:** Offizielle SFD-Freischaltung (Software-Fingerprint-Detection) integriert! Man muss keinen GeKo-Account bei VW haben, um Golf 8 Steuergeräte zu entsperren.
* **Nachteile:** Erfordert Internet, Credits-System für vorgefertigte "One-Click-Apps", **kann nicht flashen**.

### 3.2 VCDS Mobile / Carista / Carly
Gute Tools für schnelle Fehlersuche, aber für tiefe Codierungen oder Flashing völlig ungeeignet.

---

## 4. Best Practices für Hardware

Um Fehlfunktionen oder das "Bricking" (Zerstören) von Steuergeräten zu vermeiden:

1. **Spannungssicherung:** Die Bordspannung muss während des Flashens absolut stabil sein (≥ 12,5 V). Ein Diagnose-Ladegerät mit Puffer-Modus (min. ++30+a++) ist obligatorisch. Ein Abbruch wegen Unterspannung zerstört den Bootloader.
2. **Kabel vs. Bluetooth:** Zum Flashen **niemals** eine drahtlose Verbindung (Bluetooth/WLAN) nutzen. Ein kurzer Verbindungsabbruch reicht, um die ECU zu bricken. Nutze immer ein USB-Kabel (z.B. VCP oder VAS6154 per USB).

---

## Siehe auch
* [Software & Sicherheit](software.md) – Detaillierter Vergleich der Software (VCDS, ODIS, VCP).
* [Praxis-Codierungen](anleitungen.md) – Wie du die Hardware in der Praxis anwendest.
* [FAQ](../faq.md) – Antworten zu SFD und Clone-Kabeln.
