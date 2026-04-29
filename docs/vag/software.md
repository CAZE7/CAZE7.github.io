# 💻 Software & Sicherheit

Dieses Dokument beschreibt die verfügbaren Werkzeuge und das korrekte methodische Vorgehen bei Modifikationen der Steuergeräte-Software im VAG-Konzern.

## 1. Software-Werkzeuge im Vergleich

Die Auswahl der Software richtet sich nach der Komplexität der geplanten Änderung und der vorhandenen Hardware-Schnittstelle.

| Software | Profil | Einsatzbereich |
| :--- | :--- | :--- |
| **VCDS (Ross-Tech)** | PC-basiert (Windows) | Standard für Diagnose und Varianten-Codierung bis ca. MJ 2020. Hohe Stabilität und umfangreiche Klartext-Datenbank (Labels). Unterstützt kein Flashen. |
| **OBDeleven** | App-basiert (Android/iOS) | Mobile Lösung für Diagnose und Codierung. Bietet automatisierte SFD-Freischaltung und geführte Anpassungen ("One-Click-Apps"). Erfordert aktive Internetverbindung. |
| **VCP (VAG CAN PRO)** | PC-basiert (Windows) | Experten-Tool für das Schreiben von **ZDC-Containern** (Datensätzen) und das Flashen von Firmware. Notwendig für die Parametrierung nachgerüsteter Hardware. |
| **ODIS (Service)** | Offizielle OEM-Software | Geführte Fehlersuche und Online-Anbindung an das Hersteller-Backend (SVM) für offizielle Software-Aktualisierungen. |

## 2. Sicherheitskonzept: SFD (Software-Sicherungs-Funktion)

Seit dem Modelljahr 2020 (MQB-evo Plattform) ist für Schreibzugriffe auf kritische Steuergeräte die **SFD-Authentifizierung** erforderlich.

1. **Funktionsweise:** Schreibzugriffe sind werksseitig gesperrt und müssen über ein kryptografisches Token freigeschaltet werden.
2. **Token-Verfahren:** Die Freischaltung erfolgt online über den Hersteller oder durch Diagnose-Tools mit integrierter SFD-Schnittstelle.
3. **Physische Bedingung:** Bei vielen SFD-geschützten Fahrzeugen ist eine **geöffnete Motorhaube** Voraussetzung für die Annahme von Codierbefehlen durch das Gateway.

## 3. Best Practices & Backup-Regeln

| Regel | Technische Relevanz |
| :--- | :--- |
| **Vollständiges Backup** | Vor jeder Änderung muss ein Abbild (Admap/Autoscan) aller Steuergeräte erstellt werden, um den Ursprungszustand wiederherstellen zu können. |
| **Dokumentation** | Änderungen sollten einzeln durchgeführt und unmittelbar danach auf ihre Funktion geprüft werden. |
