---
title: Mercedes Praxis-Codierungen & Retrofits | W205, W213, W222
description: Schritt-für-Schritt-Anleitungen für typische Komfort- und Retrofit-Codierungen an Mercedes-Benz Fahrzeugen mit DTS Monaco oder Vediamo.
keywords: Mercedes, Codierung, Retrofit, W205, W213, W222, Sprinter, VS30, DTS Monaco, Vediamo, VMAX, AMG-Menü
---
# Praxis-Codierungen & Workflows

Diese Seite bietet detaillierte Schritt-für-Schritt-Anleitungen für typische Komfort- und Retrofit-Codierungen an Mercedes-Benz Fahrzeugen (W205, W213, W222, Sprinter VS30 etc.). 

!!! info "Grundlagen & Setup"
    Diese Workflows basieren auf der Nutzung von DTS Monaco und richten sich an fortgeschrittene Anwender. Wenn du noch nie mit DTS Monaco gearbeitet hast, lies dir zwingend zuerst den [DTS Monaco Guide](../software/dts_monaco.md) durch, um zu verstehen, wie man ein Projekt anlegt, Security Access erhält und Flasht.

---

## 1. Spezifische Codierungen

!!! danger "Wichtiger Sicherheitshinweis"
    Alle Eingriffe erfolgen auf eigenes Risiko. Falsche Variantencodierungen oder fehlerhafter Security-Access können Steuergeräte unbrauchbar machen. Vor jeder Änderung **muss** die aktuelle Varianten-Codierung der ECU in eine Datei exportiert (Backup) werden.

### 1.1 Grundvoraussetzungen & Basis-Workflow

Bevor du mit einer spezifischen Codierung beginnst, müssen diese Voraussetzungen erfüllt sein:

* **Hardware & Software:** DTS Monaco (ab Version 8.16 für aktuelle SMR-D Dateien empfohlen) sowie ein DoIP-fähiges Interface (z. B. SDconnect C4/C6 oder VXDIAG VCX SE Benz).
* **Fahrzeugzustand:** Zündung EIN (Position 2), Motor AUS, stabile Bordspannung von ca. 13,5–14 V (Ladegerät empfohlen).
* **SMR-D Dateien:** Die passenden Dateien können aus dem Installationsverzeichnis von Xentry in das DTS-Projekt importiert werden.

??? tip "Der generelle Codier-Ablauf (Klicken zum Öffnen)"
    1. **Firewall Unlock:** Viele Steuergeräte (z. B. via EZS167 oder BCMFA2) sind geschützt. Führe unter *Generic Jobs* den **Security Access** (Level 37, 3B oder via Seed/Key) aus.
    2. **Extended Start:** Öffne die Ziel-ECU in einem neuen Tab und führe *Extended Start* aus.
    3. **Codieren:** Wechsle ins *Variant Coding*, wähle die Domain, ändere die Fragmente und klicke auf **Do Coding**.
    4. **Speichern & Reset:** Bei neuen Fahrzeugen muss die Änderung fixiert werden: Führe **Synchronize to Non-volatile Memory** und anschließend einen **Hard Reset** aus.

---

### 1.2 Kombiinstrument (Tacho) & Assistenzsysteme

??? info "AMG Menü freischalten"
    *Aktiviert das begehrte AMG Menü im Standard-Tacho. Bietet digitale Öltemperatur, Wassertemperatur, Ganganzeige und den Laptimer (Rundenzeiten).*

    1. Verbinde die ECU des Instrumenten-Clusters (z. B. **IC204, IC213, IC222**).
    2. Führe den *Security Access* (oder Diagnostic Session Unlock) aus.
    3. Wechsle ins *Variant Coding* und suche die Domain **Menu Settings** oder **AMG Options** (Bezeichnung variiert je nach IC).
    4. Setze den Parameter `AMG Menu` auf **On** / **Active**.
    5. Wähle bei Modellen mit Farbtacho zusätzlich `AMG Startlogo` auf **Active**, damit das Logo beim Einstieg erscheint.
    6. Führe *Do Coding* aus und mache einen *Hard Reset* des Tachos.

??? info "Verkehrszeichen-Erkennung (VZE / TSA)"
    *Zeigt Tempolimits im Tacho und Headunit an. Voraussetzung: Es ist bereits eine Frontkamera (z. B. vom Spurhalteassistent) verbaut.*

    1. **EZS:** *Security Access Level 3B* ausführen. Domain `EVC CfgBit_65_96 Write` → Fragment `513 ROAD SIGN DETECTION (SLA)` auf **ja** setzen.
    2. **Kamera (MMPC):** Domain `TSA coding Write` → Display Mode State für *Headunit* und *Instrument Cluster* auf **on** setzen. Warnparameter anpassen.
    3. **Headunit (HU):** Domain `Vehicle Functions Write` → Fragment `TSA` (oder `SLR`) auf **aktiviert** setzen.
    4. ECU Resets für alle drei Steuergeräte durchführen.

??? info "Lane Keep Assist „Last Mode“"
    *Der Spurhalteassistent schaltet sich nicht mehr automatisch bei jedem Start ein, sondern speichert deinen letzten Zustand ab.*

    1. **MMPC** (Kamera/Assistenz-Steuergerät) mit *Extended Start* verbinden.
    2. Domain `LDP coding` → `LDP UI Variant` auf **Variant 10. [...] Last Mode** setzen.
    3. Domain `VANS coding Write` (bei Sprinter) → `ALDW Reactivation Mode` auf **Last Mode**.

---

### 1.3 Motor, Getriebe & Fahrwerk

??? info "Start/Stop „Last Mode“ (z. B. MED40)"
    *Verhindert, dass sich ECO Start/Stop bei jedem Motorstart automatisch reaktiviert.*

    1. ECU **MED40** verbinden und *Security Access* via Seed/Key Calculator anfordern.
    2. Im *Variant Coding* zur Zeile **Betriebsstrategie Stopp Start** navigieren.
    3. Wert von *„Default ON“* auf **„Stopp Start Standard Logik, Last Mode“** ändern.
    4. Codieren und *Hard Reset* durchführen.

??? info "Vmax Aufhebung (Geschwindigkeitsbegrenzung)"
    *Anheben der werkseitigen Abregelung (oft auf 210 km/h oder 250 km/h eingestellt) auf den maximalen Wert.*

    1. Verbinde das Steuergerät **CPC_NG** (oder CR61 / MED40 je nach Baureihe).
    2. Nutze externe Hex-Services (z. B. `22 C1 60` zum Lesen der aktuellen Limitierung) oder suche im Variant Coding Tab nach der Domain für **VMAX** / **Maximum Speed Limitation 1 & 2**.
    3. Setze den Wert auf **250 km/h**, **300 km/h** oder hebe ihn komplett auf (Hex `FF FF`).
    4. *Warnung:* Solche Eingriffe in das Antriebsstrang-Steuergerät erfordern absolute Präzision. Kontrolliere das Ergebnis nach dem *Hard Reset* zwingend in Xentry unter den Ist-Werten des Steuergerätes.

---

### 1.4 MBUX / Headunit (HU5 / HU6)

??? info "Apple CarPlay / Android Auto (HU6)"
    *Aktiviert die Smartphone-Integration (Voraussetzung: Keine FEC/Zertifikatssperre der neuesten Updates aktiv).*

    1. HU6 verbinden und **Security Access Level 3B** ausführen.
    2. In der Variantencodierung folgende Parameter auf **On** / **Activated** setzen:
        * `Smartphone_Integration`, `Apple_CarPlay`, `CarPlay_Fullscreen`, `Google_Automotive_Link`.
    3. Limitierungen wie `CarPlay_Trial` auf **Off** setzen.
    4. **Write Coding** und danach HU6 über Hard Reset (oder Power-Button ~10s drücken) neu starten.

??? info "Video in Motion / VIM (NTG 5.5 High)"
    *Schaltet Videos (USB/DVD) während der Fahrt frei (Nur NTG 5.5 High).*

    1. Headunit (**HU5.5**) im Variant Coding Tab verbinden.
    2. Parameter *Geschwindigkeitsbegrenzung Video* (TV/DVD während Fahrt) suchen.
    3. Wert von *limited* auf **always on** (oder *no limit*) ändern und ECU resetten.

??? info "Ambient Light (64-Farben Menü)"
    1. **HU5/6** Variantencodierung öffnen.
    2. In der Domain für *Ambient light* den Parameter **Ambient Light Menu** auf **On** setzen.
    3. Anzahl der Zonen (z. B. *Front, Rear, Footwell*) und Helligkeitsstufen (z. B. *5 Steps*) passend zur Hardware konfigurieren.

---

### 1.5 Allgemeine Komfortfunktionen

??? info "Automatisch anklappbare Außenspiegel"
    *Spiegel klappen beim Verriegeln ein und beim Entriegeln wieder aus.*

    1. EZS167 entsperren und Extended Start ausführen.
    2. **HU6:** `Exterior Mirror Convenience` auf **installed**.
    3. **Türsteuergeräte (Fahrer & Beifahrer - z. B. DMFL222 / DMFR222):** * `Einklappen beim Verriegeln verfügbar` auf **on** setzen.
        * `Gehäuseklappung beginnt bereits bei Entriegelung` auf **on** setzen.
    4. Non-volatile Memory Sync und ECU Hard Reset ausführen

---

## Siehe auch
* [DTS Monaco Guide](../software/dts_monaco.md) – Detaillierte Anleitung zur Einrichtung von DTS Monaco.
* [SMR-D Quellen](../software/smr_d.md) – Wo du die benötigten Projektdateien für die Codierung findest.
* [Multiplexer](../hardware/multiplexer.md) – Übersicht der passenden Hardware für diese Codierungen.
