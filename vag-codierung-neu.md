# :material-car-cog: VAG-Konzern: Diagnose, Codierung und Parametrierung

Dieses Dokument beschreibt die technischen Grundlagen sowie die verfügbaren Werkzeuge für Fahrzeuge der Marken VW, Audi, Seat und Skoda (VAG). Der Fokus liegt auf für Privatanwender zugänglichen Lösungen und dem korrekten technischen Vorgehen.

---

## 1. Diagnose-Architektur bei VAG

Die Steuergeräte-Kommunikation im VAG-Konzern hat sich über drei Generationen entwickelt:

### Protokolle und Transport

* :material-serial-port: **K-Line (ISO 9141):** Einsatz in älteren Modellen (ca. vor 2005). Die Kommunikation ist langsam und erfolgt seriell.
* :material-network-outline: **CAN-Bus:** Der Standard für Fahrzeuge von ca. 2005 bis heute. Er nutzt Protokolle wie KWP2000 (älter) oder UDS (modern, ab ca. 2009/2010).
* :material-ethernet: **DoIP (Ethernet):** Bei neuesten Modellen (z.B. Golf 8, ID-Serie) für große Datenmengen (Karten-Updates, Flash-Vorgänge) am Infotainment oder Gateway genutzt.

### Sicherheitsmechanismen

!!! abstract "Sicherheitskonzept: SFD (ab 2020)"
    Ab dem Modelljahr 2020 (MQB-evo Plattform) hat VAG die **Software-Sicherungs-Funktion (SFD)** eingeführt. 
    
    1. **Schutz:** Schreibzugriffe auf kritische Steuergeräte sind gesperrt.
    2. **Freischaltung:** Erfordert ein Online-Token. Tools wie OBDeleven oder VCP bieten hierfür mittlerweile automatisierte Lösungen an.
    3. **Hardware-Sperre:** Bei fast allen SFD-geschützten Fahrzeugen **muss die Motorhaube offen sein**, um Codierungen zu schreiben.

---

## 2. Software-Werkzeuge

Für VAG-Fahrzeuge gibt es ein breites Ökosystem an Software, die sich in Funktionsumfang und Zielgruppe unterscheidet:

=== "VCDS (Ross-Tech)"
    **Profil:** Der langjährige Standard für Windows-Laptops.
    
    * **Stärken:** Extrem stabil, riesige Label-Datenbank (Klartext-Erklärungen), sehr sicher bei der Diagnose und Standard-Codierung.
    * **Einsatz:** Ideal für Fahrzeuge von 1995 bis ca. 2020. Unterstützt kein Flashen und nur eingeschränkt SFD.
    * **Technik:** Nutzt die klassische Long-Coding- und Anpassungs-Struktur.

=== "OBDeleven"
    **Profil:** Smartphone-basierte Lösung (iOS/Android) mit Bluetooth-Dongle.
    
    * **Stärken:** Sehr komfortabel, "One-Click-Apps" für Anfänger, voller SFD-Support (automatisiert).
    * **Einsatz:** Ideal für Nutzer, die keinen Laptop mitführen möchten und schnelle Anpassungen (z.B. Gurtwarner, Zeigertest) suchen.
    * **Besonderheit:** Benötigt für fast alle Funktionen eine aktive Internetverbindung.

=== "VCP (VAG CAN PRO)"
    **Profil:** Professionelles Tool für Fortgeschrittene und Experten.
    
    * **Stärken:** Kann **ZDC-Container** (Datensätze) schreiben. Dies ist notwendig, um nachgerüstete Hardware (z.B. Rückfahrkameras oder Matrix-LED) zu parametrieren. Unterstützt zudem das Flashen von Steuergeräten.
    * **Einsatz:** Notwendig für Retrofits und tiefe Eingriffe in die Steuergeräte-Logik.

=== "ODIS (Service-Software)"
    **Profil:** Die offizielle Software der Vertragswerkstätten.
    
    * **Stärken:** Geführte Fehlersuche, direkter Zugriff auf das Hersteller-Backend für Software-Updates (SVM).
    * **Einsatz:** Primär im gewerblichen Umfeld für offizielle Reparaturleitfäden und Komponenten-Freischaltungen relevant.

---

## 3. Datenformate und Coding-Logik

Im Gegensatz zu anderen Herstellern ist die VAG-Struktur sehr modular aufgebaut:

* **Lange Codierung (Long Coding):** Hexadezimale Werte, die Funktionen im Steuergerät aktivieren oder deaktivieren (z.B. Byte 18 für die Lichtkonfiguration).
* **Anpassungskanäle (Adaptations):** Einzelne Parameter, die oft im Klartext geändert werden können (z.B. die Helligkeit der Tagfahrleuchten in %).
* **Datensätze (ZDC/Datasets):** Enthalten Kennlinien und komplexe Konfigurationen, die nicht über Codierung erreichbar sind (z.B. Sound-Charakteristik des Radios).

---

## 4. Sicherheitsaspekte & Best Practices

!!! danger "Achtung: Bricking-Gefahr durch instabile Hardware"
    Billige ELM327-Klone oder schlechte USB-Kabel können während des Schreibvorgangs die Kommunikation unterbrechen. Dies führt oft zum Absturz des Bootloaders im Steuergerät. Nutzen Sie nur validierte Interfaces (VCDS, VCP, OBDeleven).

| **Regel** | **Bedeutung** |
| :--- | :--- |
| **Backup zuerst** | Erstellen Sie vor jedem Eingriff ein "Abbild" (Admap) des Steuergeräts. |
| **Spannung halten** | Die Bordspannung sollte stabil über 12.5V liegen (Ladegerät nutzen). |
| **Einzelne Schritte** | Nie mehrere Änderungen gleichzeitig schreiben; nach jedem Schritt Funktion prüfen. |
| **Label prüfen** | Codieren Sie nur, wenn das Tool die Bedeutung der Bits im Klartext anzeigt. |

---

## 5. Praxis-Anleitungen (Quick-Access)

Hier findest du typische Anpassungen, sortiert nach Kategorien.

??? info ":material-bell-off: Gurtwarner deaktivieren"
    1. Steuergerät `17` (Schalttafeleinsatz) wählen.
    2. Funktion `07` (Codierung) -> Assistent für lange Codierung.
    3. Bit für "Gurtwarnung aktiv" suchen und deaktivieren.
    4. Bestätigen und Speichern.

??? info ":material-gauge: Zeigertest / Inszenierung"
    *Lässt die Tachonadeln beim Einschalten der Zündung einmal voll ausschlagen.*
    
    1. Steuergerät `17` (Schalttafeleinsatz) wählen.
    2. `Anpassung` (Kanal 10) öffnen.
    3. Kanal `Inszenierung` oder `Staging` wählen.
    4. Wert auf `aktiv` setzen und speichern.

??? info ":material-lightbulb-outline: Komfortblinken Zyklus ändern"
    *Ändert die Anzahl der Blinkvorgänge beim Tippen des Hebels (Standard: 3).*
    
    1. Steuergerät `09` (Zentralelektrik) wählen.
    2. `Anpassung` öffnen.
    3. Kanal `Komfortblinken (Blinkzyklen)` suchen.
    4. Wert (1-5) anpassen und speichern.