# SMR-D und Flash-Dateien – Beschaffung & Formate

**Fokusthema:** Beschaffung und Verwendung von Mercedes-ECU-Dateien (SMR-D, CBF, CFF/FRF)  
**Zielgruppe:** Techniker, Codierer, Enthusiasten mit DTS Monaco / Vediamo / XENTRY

---

## 1. Dateitypen im Überblick

Mercedes verwendet proprietäre Container-Formate, die je nach Fahrzeuggeneration variieren.

### 1.1 CBF vs. SMR-D (Projektdateien)

Diese Dateien enthalten die Fahrzeug-Gesamtstruktur, Bus-Topologie, Adressierung und Variantencodierung. Sie werden in Engineering-Tools zwingend benötigt.

* **Format:** CBF-Dateien sind proprietäre Vector-Container. SMR-D-Dateien sind strukturierte, XML-ähnliche Beschreibungen (ODX-basiert).
* **Einsatzbereich:** CBF-Dateien werden für ältere Fahrzeuge (bis ca. 2015) eingesetzt. SMR-D-Dateien für moderne Fahrzeuge (ab ca. 2016, z.B. W205, W213).
* **Tools:** CBF wird in Vediamo und älteren DTS Monaco Versionen genutzt. SMR-D wird in DTS Monaco (nativ) und Xentry genutzt.
* **Konzept:** CBF ist eine einzelne Steuergeräte-Datei. SMR-D ist eine komplette Fahrzeug-Projektdatei (Container).
* **Standardpfad:** Für CBF variiert der Pfad je nach Quelle. SMR-D befindet sich oft in `Xentry\Kontexte\ODXProjekte\PKW_COMMON\dbr`.

> **Wichtig:** SMR-D ist projektbasiert – im Gegensatz zu CBF. Für das korrekte Fahrzeug-Projekt muss die SMR-D-Datei exakt zur Baureihe und Ausstattung passen.

### 1.2 CFF / SMR-F (Flash-Container)

CFF (Compact Flash File) und SMR-F sind Flash-Dateien, die die eigentliche Firmware für Steuergeräte enthalten.

* **Verwendung:** CFF wird in DTS Monaco und Vediamo verwendet. SMR-F in XENTRY SDFlash.
* **Inhalt:** Beide enthalten Firmware und Kalibrierung.
* **Herkunft:** Beide stammen aus der SDFlash-Datenbank. CFF teilweise auch von Drittanbietern.
* **Standardpfad:** `Xentry\SDFlash\Release\PKW` für beide.

*(Hinweis: FRF-Dateien stammen ursprünglich aus dem VAG-Kosmos, werden aber von einigen Spezial-Tools auch im Mercedes-Umfeld unterstützt.)*

---

## 2. Woher bekommt man SMR-D / CBF?

### 2.1 Eigene XENTRY-Installation (Legal & Kostenlos)
Die sicherste Quelle ist die eigene XENTRY-Installation. Jede XENTRY-Version enthält die Dateien für die zum Release-Zeitpunkt unterstützten Fahrzeuge.

**Extraktion:**
1. XENTRY installieren.
2. Pfad öffnen: `C:\Program Files (x86)\Mercedes-Benz\Xentry\Kontexte\ODXProjekte\PKW_COMMON\dbr`
3. Benötigte SMR-D-Dateien kopieren und in DTS Monaco/Vediamo einbinden.

> **Warnung:** Die SMR-D/CBF-Version muss zur DTS-Version passen. Eine CBF-Datei aus einer neueren XENTRY-Version funktioniert oft **nicht** mit älteren DTS-Versionen ("Cannot work CBF file").

### 2.2 Community-Sammlungen (Full-Sets)
In Foren (z.B. MHHAuto) und speziellen Repos werden SMR-D-Sets geteilt.
* **Qualität prüfen:** Prüfsummen abgleichen und Dateigröße prüfen (korrupte Downloads).

### 2.3 Online-Tools zur Identifikation
* **MBTools ECU Finder:** Kostenloses Tool, zeigt die exakt benötigte SMR-D-Datei für Fahrzeug + Steuergerät an.
* **BinUnlock Catalog:** Suche nach SMR-D nach Modell/ECU-ID.

---

## 3. Woher bekommt man Flash-Dateien (CFF/FRF)?

### 3.1 XENTRY SDFlash-Datenbank (Offiziell)
Die offizielle SDFlash-Datenbank enthält Firmware-Updates.  
**Standardpfad:** `C:\Program Files (x86)\Mercedes-Benz\SDFlash\Release\PKW`

> **Lebensgefahr für die ECU:** Die CFF-Datei **muss exakt zur ECU-Hardware-Nummer (A-Nummer) passen** (z. B. `A2229000001`). Eine falsche Datei kann das Steuergerät unwiederbringlich "bricken".

### 3.2 Donor-ECU auslesen (Empfohlenes Vorgehen)
Der sicherste Weg ist das Auslesen einer identischen Donor-ECU aus einem funktionierenden Fahrzeug.
1. Identische ECU (gleiche HW-Nr.) beschaffen.
2. EEPROM + Flash mit DTS Monaco oder Vediamo auslesen.
3. Datei auf Ziel-ECU übertragen.

---

## 4. Typische Fehler & Lösungen

* **SMR-D-Version passt nicht:** Dies passiert, wenn eine ältere Datei für ein neues Modell verwendet wird. Lösung: Aktuellere SMR-D aus neuerem XENTRY-Release beschaffen.
* **SMR-D-Datei korrupt:** Kann durch unterbrochene Downloads entstehen. Lösung: Datei neu herunterladen oder Prüfsumme checken.
* **Flash-Datei inkompatibel:** Die CFF-Datei passt nicht zur HW-Nr. Lösung: HW-Nr. vor dem Flashen strikt abgleichen.

---

## 5. Best Practices: Datei-Management

Ordnung ist das halbe Leben. Lege dir eine saubere Ordnerstruktur an:
```text
/SMR-D/
  /XENTRY_2021.12/
    /W205/
    /W213/
  /XENTRY_2023.09/
    /W206/
/CFF/
  /SAM/
  /EZS/
```
* **Original-Dateien sichern** – nie nur eine Quelle überschreiben.
* **Versionen dokumentieren** – notieren, welche SMR-D aus welchem XENTRY-Release stammt.

---

## Siehe auch
* [DTS Monaco](dts_monaco.md) – Wie man die hier beschafften Dateien in Projekte einbindet und flasht.
* [Software & Architektur](architektur.md) – Grundlegende Zusammenhänge im Diagnose-Netzwerk.
