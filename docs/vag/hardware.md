# 🔌 Hardware & Adapter

Dieses Dokument beschreibt die Hardware-Anforderungen und Kommunikationsprotokolle für Fahrzeuge der Marken VW, Audi, Seat und Skoda (VAG). Der Fokus liegt auf der technischen Architektur und den verwendeten Protokollen.

## 1. Diagnose-Architektur und Kommunikationsprotokolle

Die Steuergeräte-Kommunikation im VAG-Konzern basiert auf drei wesentlichen technologischen Generationen:

* :material-serial-port: **K-Line (ISO 9141):** Einsatz in älteren Modellen (ca. vor 2005). Die Kommunikation erfolgt seriell und mit geringer Datenrate.
* :material-network-outline: **CAN-Bus:** Der Industriestandard für Fahrzeuge ab ca. 2005. Es kommen Protokolle wie KWP2000 (ältere Modelle) oder UDS (Unified Diagnostic Services, ab ca. 2009) zum Einsatz.
* :material-ethernet: **DoIP (Diagnostics over IP):** Bei aktuellen Modellen (z. B. Golf 8, ID-Serie) für hohe Datenvolumina (Infotainment-Updates, Flash-Vorgänge am Gateway) verwendet.

## 2. Best Practices für Hardware

Um Fehlfunktionen oder eine dauerhafte Beschädigung ("Bricking") von Steuergeräten zu vermeiden, sind folgende Regeln einzuhalten:

| Regel | Technische Relevanz |
| :--- | :--- |
| **Spannungssicherung** | Die Bordspannung muss stabil sein (empfohlen ≥ 12,5 V). Bei längeren Arbeiten ist ein Ladegerät mit Puffer-Modus obligatorisch. |
| **Hardware-Validierung** | Nutzen Sie ausschließlich validierte Interfaces. Minderwertige Nachbauten (Klone) führen häufig zu Kommunikationsabbrüchen während kritischer Schreibvorgänge. |
