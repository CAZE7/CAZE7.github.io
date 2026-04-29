# Passthrough Dongles (Budget & Einstieg)

Für Privatanwender, Enthusiasten und Codierer, die keine teuren Werkstatt-Multiplexer kaufen wollen, haben sich **J2534-Passthru-Geräte** als kosteneffizientester Standard etabliert. 

Diese Interfaces kommunizieren reibungslos mit OEM-Software wie Xentry (spezielle "PassThru Edition").

---

## 1. Die gängigsten Passthrough-Devices

* **Tactrix OpenPort 2.0 (Original):** CAN, K-Line. Kein DoIP. Geeignet für ältere Fahrzeuge (ca. 2005-2015). Bekannte Einschränkungen: Für DAS-Offline-Programming teilweise zu langsame Datenrate.
* **Tactrix OpenPort 2.0 (Clone):** CAN, K-Line. Kein DoIP. Eignung für Hobby/Einstieg. Bekannte Einschränkungen: Datenrate nicht voll DAS-kompatibel; hohes Risiko bei ECU-Flashing.
* **VXDIAG VCX SE (Benz-Version):** CAN, DoIP. Universell einsetzbar (inkl. DoIP). Bekannte Einschränkungen: Zenzefi-Zertifikat erforderlich für DoIP-Fahrzeuge (teilweise schwierig zu beschaffen).
* **VXDIAG VCX SE (J2534):** CAN. DoIP theoretisch. Eingeschränkt geeignet. Bekannte Einschränkungen: Benötigt spezielle Benz-Lizenz für volle Funktionalität.

---

## 2. Die DoIP-Schwelle

!!! tip "Wichtiger Hinweis zu DoIP"
    Für Fahrzeuge ab ca. 2015 (mit Ethernet-Backbone wie W206, W223) ist **DoIP** (Diagnostics over Internet Protocol) zwingend erforderlich. Die neueren Steuergeräte sprechen kein klassisches CAN mehr für große Datenmengen. 
    
    VXDIAG-Modelle bieten DoIP oft an (inkl. Ethernet-Buchse). Ein OpenPort 2.0 unterstützt **kein DoIP**, er ist für moderne Neufahrzeuge also fast nutzlos!

---

## 3. Warnung vor billigen Dongles

### 3.1 Das Tactrix Clone-Problem
!!! warning "OpenPort 2.0 Clone – Das Datenrate-Problem"
    In der Community mehrfach bestätigt: Chinesische OpenPort 2.0-Clones (ca. 20-30 €) haben eine reduzierte Datenrate auf dem CAN-Bus, die bei DAS-Offline-Programming (insbesondere Instrumentencluster-Updates an W169, W245 etc.) zu unvollständigen Flashes führen kann. 
    
    Dies resultierte bei vielen Nutzern in gebrickten (zerstörten) Steuergeräten.
    **Lösung:** Für Offline-Programming (Flashen) ausschließlich Original-Tactrix oder einen SD Connect Multiplexer verwenden!

### 3.2 ELM327 – Absolut ungeeignet!
!!! danger "Bricking-Gefahr durch ELM327-Clones"
    Billige ELM327-Adapter (oft für 5 € für Smartphone-Apps wie Torque genutzt) sind für Codierung und Flashen in Xentry/Monaco **absolut ungeeignet**. Sie weisen oft eine unvollständige Protokoll-Implementierung (fehlende ISO-TP-Flow-Control) auf. 
    Werden Flash-Routinen unterbrochen, bleibt der Bootloader unvollständig. Resultat: Die ECU ist funktional "gebricked".

---

## Siehe auch
* [Multiplexer (SD Connect)](multiplexer.md) – Die professionelle Alternative für Werkstätten.
* [Diagnose Architektur](../software/architektur.md) – Welche XENTRY-Version du für dein Passthru-Gerät brauchst.
