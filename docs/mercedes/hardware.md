# 🔌 Hardware & Adapter

Dieses Dokument beschreibt die praktisch verfügbaren Werkzeuge und Hardware für Diagnose, Codierung und Firmware-Updates bei Mercedes-Benz Fahrzeugen. Der Fokus liegt auf kostengünstigen Lösungen wie J2534-Passthru-Geräten in Kombination mit Budget-Hardware, nicht auf proprietären Star-Diagnosis-Multiplexern.

## 1. Hardware: Wege für Privatanwender

Für Privatanwender haben sich **J2534-Passthru-Geräte** als kosteneffizientester Standard etabliert. Diese Interfaces kommunizieren reibungslos mit OEM-Software wie Xentry.

| Gerät | Protokolle | Kompatibilität & Features |
| :--- | :--- | :--- |
| **Tactrix OpenPort 2.0** | CAN, K-Line, ISO-TP | Mercedes-Modelle ca. 2005–2015. Diagnose & Codierung möglich, Flashen modellabhängig. |
| **VXDIAG (VCX SE/Nano)** | CAN, K-Line, **DoIP** | Ideal für neuere Mercedes-Modelle. Wird häufig mit Xentry Passthru genutzt. |

!!! tip "Wichtiger Hinweis zu DoIP"
    Für Fahrzeuge ab ca. 2015 mit Ethernet-Backbone ist DoIP zwingend erforderlich. VXDIAG-Modelle bieten dies oft, der OpenPort 2.0 jedoch nicht.

## 2. Sicherheitsaspekte bei ECU-Programmierung

!!! danger "Achtung: Bricking-Gefahr durch ELM327-Clones"
    Billige ELM327-Adapter sind für Codierung und Flashen **absolut ungeeignet**. Sie weisen oft eine unvollständige Protokoll-Implementierung (fehlende ISO-TP-Flow-Control) und elektrische Instabilitäten auf. 
    Werden Flash-Routinen unterbrochen (z.B. durch verlorene Frames), bleibt der Bootloader oder Applikationsbereich unvollständig. Resultat: Die ECU ist funktional "gebricked" und erfordert teures Bench-Recovery.
