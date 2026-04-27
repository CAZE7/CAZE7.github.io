# Willkommen beim OBD-Expert Guide 🚗💻

Finde in wenigen Klicks genau das richtige **Diagnose-Werkzeug**, das perfekt zu deinem Fahrzeug und deinem Vorhaben passt. Unser Finder ist nun auf professionelle Standards vorkonfiguriert.

<div id="obd-finder-app">
  
  <div id="step1" class="finder-step">
    <h3>1. Welche Automarke fährst du?</h3>
    <button class="md-button md-button--primary" onclick="setBrand('VAG')">VW, Audi, Seat, Skoda (VAG)</button>
    <button class="md-button md-button--primary" onclick="setBrand('Mercedes')">Mercedes-Benz</button>
  </div>

  <div id="step2" class="finder-step" style="display:none;">
    <h3>2. Was hast du vor?</h3>
    <button class="md-button md-button--primary" onclick="setGoal('Diagnose')">Fehler lesen & löschen</button>
    <button class="md-button md-button--primary" onclick="setGoal('Codierung')">Codierung (Anpassungen)</button>
    <button class="md-button md-button--primary" onclick="setGoal('Profi')">Profi-Arbeit (Flashen/Parametrieren)</button>
  </div>

  <div id="step3" class="finder-step" style="display:none;">
    <h3>3. Welches Gerät nutzt du?</h3>
    <button class="md-button md-button--primary" onclick="setDevice('Smartphone')">Smartphone (iOS/Android)</button>
    <button class="md-button md-button--primary" onclick="setDevice('Laptop')">Windows Laptop</button>
  </div>

  <div id="result" class="finder-step" style="display:none; text-align: center;">
    <h3 style="color: var(--md-primary-fg-color);">🎯 Unsere Empfehlung:</h3>
    <h2 id="tool-name" style="margin-top: 0;"></h2>
    <p id="tool-desc" style="font-size: 1.1em; line-height: 1.5;"></p>
    <br>
    <button class="md-button" onclick="resetFinder()">Suche neu starten</button>
  </div>

</div>

<script>
let answers = { brand: '', goal: '', device: '' };

function setBrand(brand) {
  answers.brand = brand;
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
}

function setGoal(goal) {
  answers.goal = goal;
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'block';
}

function setDevice(device) {
  answers.device = device;
  document.getElementById('step3').style.display = 'none';
  calculateResult();
}

function calculateResult() {
  let tool = "";
  let desc = "";

  if (answers.brand === 'VAG') {
    if (answers.device === 'Smartphone') {
      if (answers.goal === 'Profi') {
        tool = "Keine Empfehlung (Smartphone ungeeignet)";
        desc = "Für Profi-Arbeiten am VAG-Konzern (Flashen) ist ein Smartphone technisch nicht sicher genug. Bitte nutzen Sie einen Laptop mit VCP oder ODIS.";
      } else {
        tool = "OBDeleven";
        desc = "Die einzige empfehlenswerte Smartphone-App für VAG. Ideal für einfache Codierungen und Diagnose via Bluetooth-Dongle.";
      }
    } else { // Laptop
      if (answers.goal === 'Profi') {
        tool = "VCP (VAG CAN PRO) oder ODIS";
        desc = "Professionelle Lösungen für Flashen und ZDC-Container. ODIS für Werkstatt-Niveau, VCP für ambitionierte Experten.";
      } else {
        tool = "VCDS (Ross-Tech)";
        desc = "Der stabile Standard für Diagnose und Codierung am Laptop. Sicher, schnell und extrem zuverlässig für alle Fahrzeuge (bis 2020 ohne SFD-Einschränkung).";
      }
    }
  } else if (answers.brand === 'Mercedes') {
    if (answers.device === 'Smartphone') {
      tool = "Keine Empfehlung";
      desc = "Für Mercedes-Fahrzeuge wird keine Codierung oder Diagnose per Smartphone empfohlen (Gefahr von EZS-Schäden). Nutzen Sie für sichere Arbeit zwingend einen Laptop.";
    } else { // Laptop
      tool = "VXDIAG (VCX SE) oder Passthru-Kabel";
      desc = "Die empfohlenen Schnittstellen für Mercedes. VXDIAG für moderne DoIP-Fahrzeuge, Passthru-Kabel (J2534) für Standard-Diagnose und Codierung mit Xentry oder DTS Monaco.";
    }
  }

  document.getElementById('tool-name').innerText = tool;
  document.getElementById('tool-desc').innerText = desc;
  document.getElementById('result').style.display = 'block';
}

function resetFinder() {
  answers = { brand: '', goal: '', device: '' };
  document.getElementById('result').style.display = 'none';
  document.getElementById('step1').style.display = 'block';
}
</script>

<style>
.finder-step button { margin: 5px; width: 100%; max-width: 320px; }
.finder-step { padding: 10px 0; }
</style>

---
## Schnelleinstieg Ratgeber

<div class="grid cards" markdown>

-   :material-car-cog:{ .lg .middle } __VAG Konzern__
    ---
    Alles zu VCDS, VCP, ODIS und OBDeleven.
    [:octicons-arrow-right-24: Zum VAG Guide](vag-codierung-neu.md)

-   :material-car-info:{ .lg .middle } __Mercedes-Benz__
    ---
    Diagnose via Passthru, VXDIAG und Engineering-Tools.
    [:octicons-arrow-right-24: Zum Mercedes Guide](mercedes-codierung-neu.md)

-   :material-shield-check:{ .lg .middle } __Sicherheit__
    ---
    Wichtige Hinweise und Haftungsausschluss.
    [:octicons-arrow-right-24: Rechtliches lesen](haftungsausschluss.md)

</div>