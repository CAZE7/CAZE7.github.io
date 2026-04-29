# 📁 SMR‑D‑ und Flash‑Dateien – Beschaffung & Best Practices (Mercedes)

**Status:** Wissensplattform für Fahrzeugcodierung

**Fokusthema:** Beschaffung und Verwendung von Mercedes‑ECU‑Dateien (SMR‑D, CFF/FRF)

**Zielgruppe:** Techniker, Codierer, Enthusiasten mit DTS Monaco / Vediamo / XENTRY

---

## 1. Dateitypen im Überblick (Mercedes‑only)

### 1.1 SMR‑D – Steuergerät‑Motor‑Reparatur‑Daten
SMR‑D ist das neuere, projektbasierte Format, das CBF in neueren Fahrzeugen ablöst.

| Merkmal      | Beschreibung |
|--------------|--------------|
| **Verwendung** | DTS Monaco (projektbasiert), XENTRY |
| **Inhalt**      | Fahrzeugprojekt mit Steuergeräteliste, Bus‑Topologie, Adressierung, Variantencodierung |
| **Format**      | Container‑Datei, oft mehrere ECUs pro Fahrzeug |
| **Herkunft**    | XENTRY‑Installation, Datenbank‑Sammlungen |
| **Standardpfad in XENTRY** | `C:\Program Files (x86)\Mercedes-Benz\Xentry\Kontexte\ODXProjekte\PKW_COMMON\dbr` |

> **Info:** SMR‑D ist projektbasiert – im Gegensatz zu CBF (einzelne Steuergeräte‑Datei). Für das korrekte Fahrzeug‑Projekt muss die SMR‑D‑Datei exakt zur Baureihe und Ausstattung passen.

### 1.2 CFF / SMR‑F – Flash‑Container
CFF (Compact Flash File) und SMR‑F sind Flash‑Dateien, die die eigentliche Firmware für Steuergeräte enthalten.

| Merkmal | CFF | SMR‑F |
|---------|-----|------|
| **Verwendung** | DTS Monaco, Vediamo | XENTRY SDFlash |
| **Inhalt** | Firmware + Kalibrierung | Firmware + Kalibrierung |
| **Format** | Mercedes‑proprietär | Mercedes‑proprietär |
| **Herkunft** | SDFlash‑Datenbank, Drittanbieter | SDFlash‑Datenbank |
| **Standardpfad in XENTRY SDFlash** | `C:\Program Files (x86)\Mercedes-Benz\SDFlash\Release\PKW` |

### 1.3 FRF – Flash Resource File
FRF‑Dateien sind alternative Flash‑Container, die ursprünglich aus dem VAG‑Kosmos stammen. Im Mercedes‑Umfeld rar, aber von einigen Spezial‑Tools unterstützt.

---

## 2. Woher bekommt man SMR‑D?

### 2.1 Eigene XENTRY‑Installation (Legal & Kostenlos)
Die sicherste Quelle für SMR‑D‑Dateien ist die eigene XENTRY‑Installation. Jede XENTRY‑Version enthält die Dateien für die zum Release‑Zeitpunkt unterstützten Fahrzeuge.

| Vorteil | Nachteil |
|--------|----------|
| Legal und kostenlos | Nur Fahrzeuge bis XENTRY‑Release‑Datum |
| Passend zur Tool‑Version | Keine neueren Fahrzeuge als Release |
| Kein Versionskonflikt | Installation von XENTRY nötig |

**Extraktion:**
1. XENTRY (z. B. über Samik FullFix) installieren.
2. Pfad öffnen: `C:\Program Files (x86)\Mercedes-Benz\Xentry\Kontexte\ODXProjekte\PKW_COMMON\dbr`
3. Benötigte SMR‑D‑Dateien kopieren und in DTS Monaco/Vediamo einbinden.

> **Warning:** Die SMR‑D‑Version muss zur DTS‑/Vediamo‑Version passen. Eine CBF‑Datei aus einer neueren XENTRY‑Version funktioniert **nicht** mit älteren DTS‑Monaco‑Versionen ("Cannot work CBF file").

### 2.2 Community‑Sammlungen (Full‑Sets)
In Foren, Telegram‑Gruppen und speziellen Datenbank‑Repos werden komplette SMR‑D‑Sets geteilt, die aus verschiedenen XENTRY‑Releases extrahiert wurden.

**Typischer Inhalt:**
- SMR‑D‑Dateien aus XENTRY 09.2022, 03.2023, 09.2023 etc.
- Kategorisiert nach Baureihe (W205, W213, W222, W167, W206, W223 …)

**Qualität prüfen:**
- Prüfsummen (MD5/SHA) mit der Quelle abgleichen.
- Dateigröße prüfen – stark verkleinerte Dateien deuten auf Korruption hin.
- Test‑Projekt in DTS Monaco anlegen, bevor am Fahrzeug gearbeitet wird.

### 2.3 Fachhandel & Dienstleister
| Anbieter‑Typ | Kosten | Qualität | Hinweis |
|--------------|--------|----------|--------|
| Forum‑Marktplatz (MHHAuto, Digital Eliteboard) | 20‑100 USD pro Set | Variabel | Einzelkauf, oft ohne Support |
| Komplettlösung‑Anbieter | 300‑800 USD | Hoch | Installation, Support, Updates inkl. |
| Remote‑Support | 50‑200 USD pro Session | Hoch | Techniker liefert SMR‑D remote |

> **Warning:** Der Verkauf von Mercedes‑proprietären SMR‑D‑Dateien ist rechtlich **bedenklich**. Für private Nutzung ist das Risiko gering, für gewerbliche Nutzung sollte eine offizielle XENTRY‑Lizenz erworben werden.

### 2.4 Online‑Tools zur Identifikation
| Tool | URL | Funktion |
|------|-----|----------|
| MBTools ECU Finder | https://mbtools.com/ecu | Zeigt benötigte SMR‑D‑Datei für Fahrzeug + Steuergerät |
| BinUnlock Catalog | https://binunlock.com | Suche nach SMR‑D nach Modell/ECU‑ID |

> **Info:** MBTools ECU Finder ist kostenlos und liefert exakt die Dateinamen, die in der XENTRY‑Datenbank zu finden sind – ideal für die gezielte Beschaffung.

---

## 3. Woher bekommt man Flash‑Dateien (CFF/FRF)?

### 3.1 XENTRY SDFlash‑Datenbank (Official)
Die offizielle SDFlash‑Datenbank enthält Firmware‑Updates für viele Mercedes‑Steuergeräte.

**Standardpfad:** `C:\Program Files (x86)\Mercedes-Benz\SDFlash\Release\PKW`

| Vorteil | Nachteil |
|--------|----------|
| Original Mercedes‑Firmware | Nur bis XENTRY‑Release‑Datum |
| Sicher und getestet | Keine neueren Updates außerhalb des Release‑Umfangs |

> **Warning:** Die CFF‑Datei **muss exakt zur ECU‑Hardware‑Nummer passen** (z. B. `A2229000001`). Eine falsche Datei kann das Steuergerät bricken.

### 3.2 Shops & Community‑Quellen
| Quelle | Typ | Preisrahmen | Hinweis |
|--------|-----|------------|--------|
| MHHAuto / Digital Eliteboard | Forum‑Marktplatz | 20‑50 USD pro Datei | Einzelkauf, Vertrauensbasis |
| Telegram‑Gruppen | Community‑Sharing | Oft kostenlos / getauscht | Qualität variabel, keine Garantie |
| Spezial‑Shops | Commercial | 50‑200 USD pro Set | Oft mit Support, manchmal Subscription |
| Donor‑ECU auslesen | Hardware‑Quelle | Kosten der ECU | Original‑Flash aus einem gleichen ECU auslesen |

> **Warning:** Flash‑Dateien aus dubiosen Quellen können modifiziert, unvollständig oder für falsche HW‑Version sein – hohes Brick‑Risiko.

**Sicherheits‑Check vor Flashing:**
1. ECU‑Hardware‑Nummer (A‑Nummer) auslesen.
2. CFF‑Datei‑Header prüfen (Mercedes‑Signature).
3. Prüfsumme vergleichen, falls verfügbar.
4. Nur Dateien aus offizieller SDFlash‑Datenbank oder verifizierter Quelle nutzen.

### 3.3 Donor‑ECU auslesen (empfohlen)
Der sicherste Weg ist das Auslesen einer identischen Donor‑ECU (gleiche HW‑Nr.) aus einem funktionierenden Fahrzeug.

**Ablauf:**
1. Identische ECU (z. B. vom Schrottplatz) beschaffen.
2. EEPROM + Flash mit DTS Monaco oder Vediamo auslesen.
3. Datei auf Ziel‑ECU übertragen.

> **Info:** Die **HW‑Nummer** muss exakt übereinstimmen – selbst minimale Abweichungen verhindern das Flashen.

---

## 4. Typische Fehler & Lösungen

| Fehler | Ursache | Lösung |
|--------|---------|--------|
| **SMR‑D‑Version passt nicht zum Fahrzeug** | Ältere SMR‑D‑Datei für neues Modell | Aktuellere SMR‑D aus neuerem XENTRY‑Release beschaffen |
| **SMR‑D‑Datei korrupt** | Unterbrochener Download, beschädigte Datei | Prüfsumme prüfen, Datei neu herunterladen |
| **Flash‑Datei inkompatibel** | CFF‑Datei für falsche HW‑Nr. | HW‑Nr. vor Flashen abgleichen, korrekte Datei wählen |
| **Datei‑Download unvollständig** | Netzwerk‑Abbruch, falsche Quelle | Größe prüfen, erneuten Download aus verifizierter Quelle durchführen |

---

## 5. Best Practices (Community)

### 5.1 Datei‑Management
```text
/SMR-D/
  /XENTRY_2021.12/
    /W205/
    /W213/
  /XENTRY_2022.06/
  /XENTRY_2023.09/
    /W206/
    /W223/
/CFF/
  /SAM/
  /EZS/
```
- **Original‑Dateien sichern** – nie nur eine Quelle überschreiben.
- **Versionen dokumentieren** – welche SMR‑D aus welchem XENTRY‑Release stammt.
- **Prüfsummen archivieren** – für spätere Integritäts‑Checks.

### 5.2 Vor der Verwendung
1. **Test‑Projekt** in DTS Monaco mit den SMR‑D‑Dateien anlegen.
2. **Quick‑Test** auf Fahrzeug durchführen – prüfen, ob alle Steuergeräte korrekt adressiert werden.
3. **Backup** der ECU‑Coding & Firmware erstellen, bevor Änderungen vorgenommen werden.

### 5.3 Rechtliche Sicherheit
- **Bevorzugen:** SMR‑D aus eigener XENTRY‑Installation.
- **Community‑Sammlungen:** Nur für privaten, nicht‑gewerblichen Gebrauch.
- **Gewerblich:** Original‑XENTRY‑Lizenz mit Online‑Zugang erwerben.

---

## 6. Glossar
| Begriff | Erklärung |
|---------|-----------|
| **SMR‑D** | Steuergerät‑Motor‑Reparatur‑Daten – projektbasierte Fahrzeug‑Projektdatei |
| **CFF** | Compact Flash File – Firmware‑Container für Mercedes‑Steuergeräte |
| **SMR‑F** | Flash‑Container (XENTRY SDFlash) |
| **FRF** | Flash Resource File – alternative Flash‑Container, selten im Mercedes‑Umfeld |
| **HW‑Nr.** | Hardware‑Nummer (A‑Nummer) des Steuergeräts |
| **SW‑Stand** | Software‑Version/Stand der Firmware |
| **SDFlash** | Mercedes‑Offline‑Flash‑System in XENTRY |
| **ODX** | Open Diagnostic Data Exchange – Format für Diagnosedaten |
| **DTS Monaco** | Mercedes Engineering‑Diagnosetool (projektbasiert) |
| **XENTRY** | Mercedes‑Diagnosesystem (OpenShell / PassThru / Diagnostics) |
| **MBTools ECU Finder** | Kostenloses Tool zur Identifikation benötigter SMR‑D‑Dateien |

---

*Quellen: AutoGMT, MHHAuto, Digital Eliteboard, Smartland, MBTools, Motorcarsoft, BinUnlock, CarTechnology, OBDII365‑Blog, Facebook‑Gruppen*
