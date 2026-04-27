# Anleitung: Einstieg VAG-Codierung

Dieses Dokument bietet eine prägnante, technische Anleitung für Privatanwender zum Einstieg in Diagnose, Codierung und einfache Flash-Aufgaben im VAG-Konzern (VW, Audi, Škoda, Seat).

## Voraussetzungen

- Grundkenntnisse CAN/UDS, ISO-TP und OBD-II
- Stabiler Laptop mit Windows (Treiber-Management)
- J2534-kompatibles Interface (z.B. VXDIAG, OpenPort für ältere Modelle)
- Software: VCDS für Diagnose, ODIS- oder ODIS-Engineering (je nach Aufgabe), VCP für erweiterte Parametrisierung

## Kurzer Workflow

1. Fahrzeugidentifikation (VIN prüfen)
2. Vollständigen Scan durchführen (Alle Steuergeräte) und Dokumentation speichern
3. Backup: Steuergerätedaten / Long Coding exportieren
4. Security prüfen (SFD/CP): benötigte Tokens/Autorisierung klären
5. Änderungen durchführen (Codierung/Adaptation) in kleinen Schritten
6. Validierung: Fehler löschen, Testfahrten, Messwertüberprüfungen

## Wichtige Hinweise

- Flash-Vorgänge nur mit validierten Containern und stabiler Verbindung
- Bei SFD/CP sind OEM-Backend-Token erforderlich; Offline-Tools haben Grenzen
- Batterieversorgung während Flashen sicherstellen

---

<!-- Ende: vag-anleitung.md -->