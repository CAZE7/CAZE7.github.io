# 🛠️ Praxis-Codierungen

Dieses Dokument bietet eine prägnante, technische Anleitung für Privatanwender zum Einstieg in Diagnose, Codierung und einfache Flash-Aufgaben im VAG-Konzern (VW, Audi, Škoda, Seat).

## 1. Voraussetzungen

- Grundkenntnisse CAN/UDS, ISO-TP und OBD-II
- Stabiler Laptop mit Windows (Treiber-Management)
- J2534-kompatibles Interface (z.B. VXDIAG, OpenPort für ältere Modelle)
- Software: VCDS für Diagnose, ODIS- oder ODIS-Engineering (je nach Aufgabe), VCP für erweiterte Parametrisierung

## 2. Methoden der Steuergeräte-Modifikation

Im VAG-Konzern wird zwischen drei Arten der Anpassung unterschieden:

1. **Lange Codierung (Long Coding):** Änderung hexadezimaler Werte in den Bytes eines Steuergeräts (z. B. Aktivierung einer Hardware-Komponente).
2. **Anpassungskanäle (Adaptations):** Änderung spezifischer Parameter (z. B. Schwellenwerte für Sensoren oder Zeitintervalle) in einer Klartext-Struktur.
3. **Datensätze (Datasets/ZDC):** Binärdateien, die komplexe Kennlinien enthalten, welche nicht über Codierung oder Anpassung erreichbar sind (z. B. Lichtkurven oder Sound-Charakteristiken).

## 3. Allgemeiner Codier-Workflow (VCDS / OBDeleven)

1. **Fahrzeugidentifikation:** VIN prüfen und sicherstellen, dass das Diagnose-Interface richtig verbunden ist.
2. **Vollständigen Scan durchführen:** (Alle Steuergeräte auslesen) und Dokumentation/Autoscan speichern.
3. **Backup:** Steuergerätedaten / Long Coding exportieren (Admap erstellen).
4. **Security prüfen (SFD/CP):** benötigte Tokens/Autorisierung klären (Motorhaube öffnen bei neuen Modellen).
5. **Änderungen durchführen:** (Codierung/Adaptation) in kleinen Schritten, wie in der jeweiligen Anleitung beschrieben.
6. **Validierung:** Fehler löschen, Testfahrten durchführen, Messwertüberprüfungen.

## 4. Wichtige Hinweise

- Flash-Vorgänge nur mit validierten Containern und stabiler Verbindung
- Bei SFD/CP sind OEM-Backend-Token erforderlich; Offline-Tools haben Grenzen
- Batterieversorgung während Flashen sicherstellen
