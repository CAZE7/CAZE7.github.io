# Häufig gestellte Fragen (FAQ)

Willkommen im FAQ-Bereich! Hier beantworten wir die häufigsten Fragen rund um Fahrzeug-Diagnose, Codierung und Flashen für VAG (VW, Audi, Seat, Skoda) und Mercedes-Benz.

*Tipp: Klicke auf eine Frage, um die Antwort aufzuklappen!*

---

## 1. Grundlagen & Diagnose-Konzepte

??? faq "Was ist der Unterschied zwischen Codierung und Flashen?"
    Dies ist eine der wichtigsten Unterscheidungen:
    
    * **Codierung (Coding):** Du änderst Einstellungen, die bereits in der Software des Steuergeräts vorhanden sind (z.B. Gurtwarner aus, Tagfahrlicht-Optionen). Es wird keine neue Software aufgespielt, sondern nur "Schalter" umgelegt.
    * **Flashen (Flashing):** Du überschreibst die komplette Betriebssoftware (Firmware) des Steuergeräts mit einer neuen Version (z.B. Update von Version 001 auf 002). Dies ist deutlich riskanter und erfordert eine stabile Stromversorgung.
    * **Parametrierung (Datasets/ZDC):** Eine Mischform. Hier werden Datenpakete (z.B. Sound-Charakteristiken oder Lichtkurven) in das Steuergerät geladen, die über normale Codierung nicht erreichbar sind.

??? faq "Was ist SFD (Schutz Fahrzeug Diagnose)?"
    SFD ist ein moderner Schreibschutz von Volkswagen (ab ca. 2020, z.B. Golf 8, ID.3). 
    
    * **Symptom:** Du kannst Fehler lesen, aber beim Codieren erhältst du die Meldung "Security Access Denied".
    * **Lösung:** Das Steuergerät muss online via Token entsperrt werden (z.B. mit OBDeleven). 
    * **Wichtig:** Bei fast allen SFD-Fahrzeugen ist eine **geöffnete Motorhaube** zwingend erforderlich!
    
    Detaillierte Informationen findest du auf der Seite [Software & Sicherheit](vag/software.md#21-sfd-schutz-fahrzeug-diagnose).

??? faq "Was ist der Komponentenschutz (CP)?"
    Der Komponentenschutz (Component Protection) ist ein Diebstahlschutz. Wenn du ein gebrauchtes Steuergerät (z.B. ein Infotainment aus einem anderen Auto) einbaust, erkennt das Fahrzeug, dass die Seriennummer nicht zur VIN passt.
    
    * **Folge:** Das Gerät funktioniert nur eingeschränkt (z.B. kein Ton, "SAFE"-Meldung).
    * **Lösung:** Der Schutz kann offiziell nur online über den Hersteller-Server (ODIS bei VAG, Xentry bei MB) aufgehoben werden.

??? faq "Warum brauche ich Login-Codes?"
    Viele Steuergeräte verlangen einen "Sicherheitszugriff" (Security Access), bevor sie Änderungen an der Codierung oder den Anpassungskanälen zulassen. 
    * Bekannte Codes für MQB: `20103`, `31347` (BCM), `19249` (Lenkung).
    * Ohne diesen Login werden deine Änderungen einfach nicht gespeichert.

---

## 2. Software & Diagnose-Tools

??? faq "Welche XENTRY-Version brauche ich: OpenShell oder PassThru?"
    Das hängt von deiner Hardware ab:
    
    - **Mit Multiplexer (SD Connect C4/C5/C6):** Nutze **XENTRY OpenShell (XDOS)**. Dies ist die Profi-Version für Multiplexer, die alle Protokolle (inkl. K-Line für alte Autos) unterstützt.
    - **Mit J2534 Adapter (Tactrix / VXDIAG):** Nutze **XENTRY PassThru (XPT)**. Diese Version ist für günstige Universal-Interfaces optimiert, hat aber Einschränkungen bei sehr alten Fahrzeugen (vor 2005).

??? faq "ODIS vs. VCDS vs. VCP: Welches Tool für VAG?"
    - **VCDS:** Das Schweizer Taschenmesser. Perfekt für Fehlerdiagnose, Service-Reset und Standard-Codierungen. Sehr intuitiv.
    - **VCP (Vag Can Pro):** Spezialist für Datensätze (ZDC) und Flashen. Unverzichtbar für Nachrüstungen (z.B. Rückfahrkamera), die eine Parametrierung benötigen.
    - **ODIS:** Die offizielle Werkstatt-Software. Extrem mächtig, aber kompliziert in der Bedienung. ODIS-E (Engineering) wird zum Flashen von Original-Files (`.frf`, `.odx`) genutzt.

??? faq "DTS Monaco: Version 8.16 oder 9.02?"
    - **8.16:** Der Klassiker. Sehr stabil, unterstützt fast alle Fahrzeuge bis ca. 2021. Läuft oft performanter auf älteren Laptops.
    - **9.02:** Die moderne Version. Unterstützt neue DoIP-Fahrzeuge besser, hat eine modernere UI und ist für die Arbeit mit Remote-Diagnose optimiert.
    *Hinweis: Projekte aus 8.16 sind nicht immer einfach in 9.02 zu öffnen.*

??? faq "Was ist der Unterschied zwischen SMR-D und CBF?"
    Beides sind Beschreibungsdateien für Mercedes-Steuergeräte:
    
    * **CBF:** Für ältere Baureihen (bis ca. 2015). Beschreibt einzelne Steuergeräte.
    * **SMR-D:** Für neuere Baureihen (ab W205/W213). ODX-basiert, oft als komplette Fahrzeug-Projekte organisiert.

??? faq "Woher bekomme ich Zenzefi-Zertifikate?"
    Zenzefi ist für moderne Mercedes-Modelle (ab ca. 2021, W206, W223) nötig, um überhaupt mit den Steuergeräten via DoIP kommunizieren zu dürfen. Ohne gültiges Zertifikat bleibt die Diagnose gesperrt. Diese Zertifikate sind meist an offizielle Accounts oder Hardware-Abos (z.B. VXDIAG Full) gebunden.

---

## 3. Hardware & Interfaces

??? faq "Brauche ich wirklich ein Batterieladegerät (Stabilizer)?"
    **Wenn du codierst oder flashst: JA! Absolut!**
    
    Ein Flashvorgang kann bis zu 45 Minuten dauern. Die Zündung muss an sein, was die Batterie massiv belastet. Bricht die Spannung unter ~12,5 V ein, bricht der Flashvorgang ab und das Steuergerät ist "gebrickt". 
    ==Ein normales 5A-Baumarkt-Ladegerät reicht NICHT.== Du benötigst einen Stabilisator, der konstant ++30A bis 50A++ liefern kann.

??? faq "Kann ich meinen billigen ELM327 Bluetooth-Adapter nutzen?"
    **Nein! Auf gar keinen Fall für Codierungen!**
    
    Diese Adapter sind für das Auslesen von Motordaten via Smartphone-App gedacht. Für echtes Coding fehlt ihnen die Stabilität und die korrekte Protokoll-Umsetzung. Ein Verbindungsabbruch während des Schreibens kann zum Defekt der ECU führen.

??? faq "Welches Interface ist für Mercedes am besten?"
    - **SD Connect C4 (DTS/Vediamo):** Der Standard. Unterstützt alles, inkl. DoIP und alter K-Line.
    - **VXDIAG VCX SE:** Günstige und sehr gute Alternative für moderne Fahrzeuge. Unterstützt DoIP nativ und arbeitet hervorragend mit Xentry PassThru und XDOS.

---

## 4. Fehlerbehebung & Best Practices

??? tip "Hilfe, DTS Monaco meldet 'Cannot work CBF file'!"
    Deine CBF-Datei ist wahrscheinlich "zu neu" für deine DTS-Version. Wenn du z.B. eine CBF aus einem XENTRY 2023 Release in ein DTS 8.14 lädst, kann dieses das Format nicht lesen.
    **Lösung:** Nutze eine CBF-Datenbank, die zeitlich zu deiner DTS-Version passt, oder update dein DTS.

??? tip "Nach dem Flashen ist mein Steuergerät 'tot' (Bricked). Was nun?"
    - **Soft-Brick:** Die ECU antwortet noch auf Pings. Versuche einen Not-Flash (Force Flash) mit der korrekten Original-Datei (`.cff` / `.frf`).
    - **Hard-Brick:** Keine Kommunikation mehr möglich. Hier hilft meist nur noch das Ausbauen und direkte Beschreiben des Chips auf dem Tisch (Bench-Modus) mit Tools wie KTAG oder Flex.

??? tip "Warum bricht die DoIP-Verbindung bei Mercedes ständig ab?"
    Meist liegt es an den Netzwerkeinstellungen deines Laptops:
    1. **Firewall:** Schalte die Windows-Firewall für die Diagnose-Session komplett aus.
    2. **IP-Adresse:** Stelle sicher, dass dein Netzwerkadapter auf "IP automatisch beziehen" steht, es sei denn, dein Interface verlangt eine statische IP (oft `169.254.x.x`).
    3. **WLAN:** Deaktiviere das WLAN, während du per Kabel (DoIP) diagnostizierst, um Routing-Konflikte zu vermeiden.

---

## 5. Glossar & Abkürzungen

| Abkürzung | Bedeutung |
| :--- | :--- |
| **ECU** | Electronic Control Unit (Steuergerät) |
| **VCI** | Vehicle Communication Interface (Der Diagnosekopf / Multiplexer) |
| **DoIP** | Diagnostics over Internet Protocol (Ethernet-Diagnose) |
| **SFD** | Schutz Fahrzeug Diagnose (VAG Schreibschutz ab 2020) |
| **CP** | Component Protection (Komponentenschutz / Diebstahlschutz) |
| **SVM** | Software Versions Management (VAG Online-Konfiguration) |
| **SCN** | Software Calibration Number (MB Online-Codierung) |
| **ZDC** | Datensatz / Parametrierung (VAG) |
| **Admap** | Adaptation Map (VCDS Backup aller Kanäle) |
| **GeKo** | Geheimnis und Komponentenschutz (VAG Server-Zugang) |
| **XDOS** | Xentry OpenShell (Mercedes Diagnose-Software für Multiplexer) |
| **XPT** | Xentry PassThru (Mercedes Diagnose-Software für J2534) |
| **ODIS** | Offboard Diagnostic Information System (VAG Diagnose-Software) |
| **MQB** | Modularer Querbaukasten (VAG Fahrzeugplattform) |
| **CBF / SMR-D** | Beschreibungsdateien für Mercedes-Steuergeräte |

*[ECU]: Electronic Control Unit (Steuergerät)
*[VCI]: Vehicle Communication Interface (Diagnosekopf, z.B. SD Connect)
*[DoIP]: Diagnostics over Internet Protocol (Moderne Netzwerkkommunikation)
*[SCN]: Software Calibration Number (Werkscodierung)
*[ODIS]: Offboard Diagnostic Information System (VAG Diagnose-Software)
*[SFD]: Schutz Fahrzeug Diagnose (VAG Schreibschutz ab 2020)
*[CP]: Component Protection (Komponentenschutz / Diebstahlschutz)
*[ZDC]: Datensatz / Parametrierung (VAG)
*[GeKo]: Geheimnis und Komponentenschutz (VAG Server-Zugang)
*[XDOS]: Xentry OpenShell (Mercedes Diagnose-Software für Multiplexer)
*[XPT]: Xentry PassThru (Mercedes Diagnose-Software für J2534)
*[Admap]: Adaptation Map (VCDS Backup aller Kanäle)
*[SVM]: Software Versions Management (VAG Online-Konfiguration)
*[MQB]: Modularer Querbaukasten (VAG Fahrzeugplattform)
*[CBF]: Control Base File (MB Beschreibungsdatei bis ca. 2015)
*[SMR-D]: Smart Diagnostic Resource - Description (MB Projektdatei ab ca. 2016)
