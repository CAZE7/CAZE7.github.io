# VAG-Konzern: Diagnose, Codierung und Parametrierung

Dieses Dokument beschreibt die technischen Grundlagen sowie die verfügbaren Werkzeuge für Fahrzeuge der Marken VW, Audi, Seat und Skoda (VAG). Der Fokus liegt auf der technischen Architektur, den verwendeten Protokollen und dem korrekten methodischen Vorgehen bei Modifikationen der Steuergeräte-Software.

---

## 1. Diagnose-Architektur und Kommunikationsprotokolle

Die Steuergeräte-Kommunikation im VAG-Konzern basiert auf drei wesentlichen technologischen Generationen:

* :material-serial-port: **K-Line (ISO 9141):** Einsatz in älteren Modellen (ca. vor 2005). Die Kommunikation erfolgt seriell und mit geringer Datenrate.
* :material-network-outline: **CAN-Bus:** Der Industriestandard für Fahrzeuge ab ca. 2005. Es kommen Protokolle wie KWP2000 (ältere Modelle) oder UDS (Unified Diagnostic Services, ab ca. 2009) zum Einsatz.
* :material-ethernet: **DoIP (Diagnostics over IP):** Bei aktuellen Modellen (z. B. Golf 8, ID-Serie) für hohe Datenvolumina (Infotainment-Updates, Flash-Vorgänge am Gateway) verwendet.

### Sicherheitskonzept: SFD (Software-Sicherungs-Funktion)

Seit dem Modelljahr 2020 (MQB-evo Plattform) ist für Schreibzugriffe auf kritische Steuergeräte die **SFD-Authentifizierung** erforderlich.

1. **Funktionsweise:** Schreibzugriffe sind werksseitig gesperrt und müssen über ein kryptografisches Token freigeschaltet werden.
2. **Token-Verfahren:** Die Freischaltung erfolgt online über den Hersteller oder durch Diagnose-Tools mit integrierter SFD-Schnittstelle.
3. **Physische Bedingung:** Bei vielen SFD-geschützten Fahrzeugen ist eine **geöffnete Motorhaube** Voraussetzung für die Annahme von Codierbefehlen durch das Gateway.

---

## 2. Software-Werkzeuge im Vergleich

Die Auswahl der Software richtet sich nach der Komplexität der geplanten Änderung und der vorhandenen Hardware-Schnittstelle.

| Software | Profil | Einsatzbereich |
| :--- | :--- | :--- |
| **VCDS (Ross-Tech)** | PC-basiert (Windows) | Standard für Diagnose und Varianten-Codierung bis ca. MJ 2020. Hohe Stabilität und umfangreiche Klartext-Datenbank (Labels). Unterstützt kein Flashen. |
| **OBDeleven** | App-basiert (Android/iOS) | Mobile Lösung für Diagnose und Codierung. Bietet automatisierte SFD-Freischaltung und geführte Anpassungen ("One-Click-Apps"). Erfordert aktive Internetverbindung. |
| **VCP (VAG CAN PRO)** | PC-basiert (Windows) | Experten-Tool für das Schreiben von **ZDC-Containern** (Datensätzen) und das Flashen von Firmware. Notwendig für die Parametrierung nachgerüsteter Hardware. |
| **ODIS (Service)** | Offizielle OEM-Software | Geführte Fehlersuche und Online-Anbindung an das Hersteller-Backend (SVM) für offizielle Software-Aktualisierungen. |

---

## 3. Methoden der Steuergeräte-Modifikation

Im VAG-Konzern wird zwischen drei Arten der Anpassung unterschieden:

1. **Lange Codierung (Long Coding):** Änderung hexadezimaler Werte in den Bytes eines Steuergeräts (z. B. Aktivierung einer Hardware-Komponente).
2. **Anpassungskanäle (Adaptations):** Änderung spezifischer Parameter (z. B. Schwellenwerte für Sensoren oder Zeitintervalle) in einer Klartext-Struktur.
3. **Datensätze (Datasets/ZDC):** Binärdateien, die komplexe Kennlinien enthalten, welche nicht über Codierung oder Anpassung erreichbar sind (z. B. Lichtkurven oder Sound-Charakteristiken).

---

## 4. Best Practices für sicheres Arbeiten

Um Fehlfunktionen oder eine dauerhafte Beschädigung ("Bricking") von Steuergeräten zu vermeiden, sind folgende Regeln einzuhalten:

| Regel | Technische Relevanz |
| :--- | :--- |
| **Vollständiges Backup** | Vor jeder Änderung muss ein Abbild (Admap/Autoscan) aller Steuergeräte erstellt werden, um den Ursprungszustand wiederherstellen zu können. |
| **Spannungssicherung** | Die Bordspannung muss stabil sein (empfohlen ≥ 12,5 V). Bei längeren Arbeiten ist ein Ladegerät mit Puffer-Modus obligatorisch. |
| **Hardware-Validierung** | Nutzen Sie ausschließlich validierte Interfaces. Minderwertige Nachbauten (Klone) führen häufig zu Kommunikationsabbrüchen während kritischer Schreibvorgänge. |
| **Dokumentation** | Änderungen sollten einzeln durchgeführt und unmittelbar danach auf ihre Funktion geprüft werden. |

---
