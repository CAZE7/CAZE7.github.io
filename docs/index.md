---
title: OBD Expert Guide – Diagnose, Codierung und Engineering
description: Eine kuratierte Wissensbasis für Mercedes-Benz und den VAG-Konzern auf Herstellerniveau.
keywords: OBD, Diagnose, Codierung, VAG, Mercedes, VCDS, Xentry, OBDeleven, Flashen, Steuergerät, Passthru
hide:
  - navigation # Versteckt die linke Navigation auf der Startseite für einen sauberen Look
---

## Interaktiver Tool-Finder

Du bist dir unsicher, welche Hard- oder Software du für dein Projekt benötigst? Beantworte drei kurze Fragen, und unser System gibt dir eine fundierte Empfehlung!

<div id="obd-finder-app" style="max-width: 600px; margin: 0 auto;">
  <div id="step1" class="finder-step">
    <p><strong>1. Welche Automarke fährst du?</strong></p>
    <button class="md-button md-button--primary" onclick="window.setBrand('VAG')">VW, Audi, Seat, Skoda</button>
    <button class="md-button md-button--primary" onclick="window.setBrand('Mercedes')">Mercedes-Benz</button>
  </div>
  <div id="step2" class="finder-step" style="display:none;">
    <p><strong>2. Was hast du am Fahrzeug vor?</strong></p>
    <button class="md-button md-button--primary" onclick="window.setGoal('Diagnose')">Fehler lesen & löschen</button>
    <button class="md-button md-button--primary" onclick="window.setGoal('Codierung')">Komfort-Codierungen anpassen</button>
    <button class="md-button md-button--primary" onclick="window.setGoal('Profi')">Firmware Flashen & Engineering</button>
  </div>
  <div id="step3" class="finder-step" style="display:none;">
    <p><strong>3. Welches Gerät bevorzugst du?</strong></p>
    <button class="md-button md-button--primary" onclick="window.setDevice('Smartphone')">Smartphone / Tablet</button>
    <button class="md-button md-button--primary" onclick="window.setDevice('Laptop')">Windows Laptop</button>
  </div>
  <div id="result" class="finder-step" style="display:none;">
    <p style="font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0; opacity: 0.6;">Deine Experten-Empfehlung</p>
    <h3 id="tool-name"></h3>
    <p id="tool-desc"></p>
    <button class="md-button" onclick="window.resetFinder()" style="margin-top: 1rem;">Neu starten</button>
  </div>
</div>

<script src="javascripts/tool-finder.js"></script>

---

# Willkommen im OBD Expert Guide

**Diagnose, Codierung und Engineering auf Herstellerniveau.**

Diese Wissensdatenbank bietet tiefe Einblicke und Praxis-Workflows für Mercedes-Benz und den VAG-Konzern. Lerne, wie du die richtige Hard- und Software einsetzt, versteckte Potenziale freischaltest und Steuergeräte (ECUs) sicher programmierst, ohne sie zu beschädigen.

---

## Wissensbereiche

Wähle deinen Bereich, um in die detaillierten Anleitungen und Best-Practices einzutauchen:

<div class="grid cards" markdown>

-   **Mercedes-Benz Guide**

    ---

    Tiefe Einblicke in XENTRY, DTS Monaco, Seed & Key Mechanismen und SMR-D Projektdateien.

    [:octicons-arrow-right-24: Zur Mercedes-Übersicht](mercedes/software/architektur.md)

-   **VAG Konzern Guide**

    ---

    Alles rund um VW, Audi, Seat & Skoda. Meistere VCDS, ODIS, VCP und den Umgang mit SFD-Schutz.

    [:octicons-arrow-right-24: Zur VAG-Übersicht](vag/software.md)

-   **FAQ & Hilfe**

    ---

    Antworten auf die häufigsten Fragen zu Hardware (Passthru vs. Multiplexer), Soft-Bricks und Flashen.

    [:octicons-arrow-right-24: Zu den FAQs](faq.md)

-   **Sicherheit & Haftung**

    ---

    Wichtige Regeln zur Batteriespannung und rechtliche Hinweise, bevor du dein Auto flashst.

    [:octicons-arrow-right-24: Zu den Hinweisen](haftungsausschluss.md)

</div>
