# Software, Sicherheit & Architektur (VAG)

Dieses Dokument beschreibt die verfügbaren Werkzeuge, die Sicherheitsarchitekturen (SFD, CP) und das korrekte methodische Vorgehen bei Modifikationen der Steuergeräte-Software im VAG-Konzern.

---

## 1. Die Diagnose-Software im Detail

Im VAG-Konzern gibt es nicht "die eine" Software für alles. Die Wahl des Tools richtet sich nach der Aufgabe.

### 1.1 VCDS vs. VCP
Beide Tools sind für Privatanwender und freie Werkstätten konzipiert, decken aber unterschiedliche Spezialgebiete ab.

* **Fokus:** VCDS ist fokussiert auf Fehlerdiagnose und Langcodierung. VCP (Vag Can Pro) fokussiert sich auf Flashen und Datensätze (Parametrierung).
* **Bedienung:** VCDS ist sehr intuitiv und bietet exzellente Klartext-Labels. VCP ist komplexer und die UI wirkt veraltet.
* **ZDC Datensätze:** Mit VCDS nicht möglich. Mit VCP möglich und unersetzlich für Retrofits.
* **Firmware Flashen:** Mit VCDS nicht möglich. Mit VCP möglich (.odx, .frf, .sgo Dateien).
* **SFD Unlock:** Mit VCDS teilweise möglich (manuelle Token). Mit VCP ebenfalls teilweise.

> **Fazit:** Wer nur "Codieren" will (Start/Stop, Gurtwarner), kauft VCDS. Wer Hardware nachrüstet (Kameras, Scheinwerfer), die einen Datensatz (ZDC) benötigen, kommt an VCP nicht vorbei.

### 1.2 ODIS Service (ODIS-S) vs. ODIS Engineering (ODIS-E)
ODIS ist die offizielle OEM-Software von Volkswagen.

* **ODIS-S (Service):** Wird in der Vertragswerkstatt genutzt. Ist stark gefochten durch geführte Fehlersuche. Es verbindet sich mit dem VAG-Zentralserver (SVM), um Steuergeräte exakt so zu codieren, wie das Auto das Werk verlassen hat. *Manuelles Herumcodieren ist hier extrem umständlich.*
* **ODIS-E (Engineering):** Das Tool der VAG-Entwickler. Es ist offline-fähig, hat keine geführte Fehlersuche, erlaubt aber das schonungslose Flashen von Container-Dateien (`.frf`, `.odx`) und massenhafte Ändern von Hex-Werten.

---

## 2. Sicherheitskonzepte: SFD und CP

Moderne Fahrzeuge lassen sich nicht mehr einfach so codieren. VW hat massive Schutzmechanismen eingebaut.

### 2.1 SFD (Schutz Fahrzeug Diagnose)
Seit dem Modelljahr 2020 (Golf 8, MQB-evo Plattform) ist für Schreibzugriffe auf kritische Steuergeräte die **SFD-Authentifizierung** erforderlich.

* **Das Problem:** Man kann Steuergeräte auslesen, aber sobald man einen Wert ändern will (Adaptation/Coding), verweigert die ECU den Zugriff ("Security Access denied").
* **Die Lösung:** Die Software generiert eine Anfrage, die zum VW-Server geschickt wird. Dieser schickt ein Krypto-Token zurück, das die ECU für 90 Minuten entsperrt.
* **Wie umgehen?** Offizielle ODIS-Nutzer machen das via GeKo-Account. Für Privatanwender hat **OBDeleven** (und teilweise VCDS/VCP) eine automatische SFD-Integration, die über den Server des Tool-Herstellers läuft.
* **Physische Bedingung:** Bei fast allen VAG SFD-Fahrzeugen muss zwingend die **Motorhaube geöffnet** sein, damit das Gateway die Codierung zulässt!

### 2.2 CP (Komponentenschutz / Component Protection)
Der Komponentenschutz ist ein Diebstahlschutz, der seit Audi A6 (4F) eingeführt wurde.

* **Das Problem:** Baust du ein gebrauchtes Steuergerät (z.B. Infotainment, Tacho) aus einem anderen Auto ein, funktioniert es nur eingeschränkt (z.B. Radio spielt nur auf einer Box, Tacho blinkt "Safe").
* **Die Lösung:** Das Gateway merkt, dass die Seriennummer der ECU nicht zur VIN des Autos passt. Der Schutz kann **nur online via ODIS-S (und GeKo-Account)** bei VW/Audi aufgehoben werden. Offline-Lösungen erfordern tiefes EEPROM/Immo-Hacking auf dem Tisch (Bench).

---

## 3. Best Practices & Backup-Regeln

* **Die Admap-Pflicht:** Vor *jeder* Änderung muss ein vollständiges Abbild (Admap / Adaptation Map) des Steuergeräts exportiert werden. Ohne Admap weißt du im Fehlerfall nicht, wie die alten Anpassungskanäle hießen!
* **Dokumentation:** VCDS speichert alle Änderungen automatisch im Ordner `C:\Ross-Tech\VCDS\Debug\CodingLog.txt`. Überprüfe diesen bei Problemen.

---

## 4. Glossar

*[Admap]: Adaptation Map (Backup aller Anpassungskanäle eines Steuergeräts)
*[ZDC]: Zukünftige Diagnose-Container (Binäre Datensätze für Parametrierung, exklusiv für VCP/ODIS)
*[SVM]: Software Versions Management (Der zentrale VW-Server, der die Original-Konfiguration deines Autos kennt)
*[GeKo]: Geheimnis und Komponentenschutz (Account für VAG-Mitarbeiter mit hohen Berechtigungen)
*[MQB]: Modularer Querbaukasten (Fahrzeugplattform z.B. Golf 7/8, Octavia)
*[MLB]: Modularer Längsbaukasten (Fahrzeugplattform z.B. Audi A4, Q5)
*[SFD]: Schutz Fahrzeug Diagnose (Token-basierte Schreibsperre ab 2020)
*[CP]: Component Protection / Komponentenschutz (Diebstahlsperre für gebrauchte ECUs)

* **[Admap]:** Adaptation Map. Ein CSV/TXT-Backup aller Anpassungskanäle eines Steuergeräts.
* **[ZDC]:** Zukünftige Diagnose-Container. Binäre Parameter-Datensätze (für Licht, Sound, Kamera-Kalibrierung), die mit VCP geflasht werden.
* **[SVM]:** Software Versions Management. Das Hersteller-Backend, das die Werks-Ausstattung verwaltet.
* **[GeKo]:** Zertifizierter Zugang zum VAG-Server (Geheimnis & Komponentenschutz).
* **[MQB] / [MLB]:** Modulare Fahrzeugplattformen bei VAG (Quer- vs. Längsmotoren).

---

## Siehe auch
* [Praxis-Codierungen](anleitungen.md) – Praktische Anleitung für VCDS und VCP.
* [Hardware & Interfaces](hardware.md) – Details zu VAS6154, VCDS-Clones und DoIP.
