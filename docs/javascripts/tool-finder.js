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
        tool = "Keine Empfehlung";
        desc = "Ein Smartphone ist für tiefes Flashen nicht sicher genug (Verbindungsabbrüche). Bitte nutze zwingend einen Windows-Laptop mit ODIS oder VCP.";
      } else {
        tool = "OBDeleven";
        desc = "Ideal für schnelle Diagnose und One-Click-Codierungen via Bluetooth-Dongle direkt am Smartphone.";
      }
    } else {
      if (answers.goal === 'Profi') {
        tool = "VCP (Vag Can Professional) oder ODIS";
        desc = "Die ultimativen Profi-Lösungen für Firmware-Flashen und das Hochladen von ZDC-Containern.";
      } else {
        tool = "VCDS (Ross-Tech)";
        desc = "Der absolute Goldstandard für Diagnose und detaillierte Langcodierung am Laptop.";
      }
    }
  } else {
    if (answers.device === 'Smartphone') {
      tool = "Warnung";
      desc = "Für Mercedes raten wir von Smartphone-Codierungen (wie Carly) dringend ab, da die Gefahr von EZS-Schäden extrem hoch ist. Nutze einen Laptop!";
    } else {
      if (answers.goal === 'Profi') {
        tool = "SD Connect C4/C6 & DTS Monaco";
        desc = "Für Engineering und Flashen brauchst du einen robusten Multiplexer (z.B. SD Connect) sowie DTS Monaco oder Vediamo.";
      } else {
        tool = "Tactrix OpenPort / VXDIAG & XENTRY PassThru";
        desc = "Für Diagnose und Standard-Codierungen ist ein günstiger J2534-Adapter (OpenPort oder VXDIAG VCX SE) in Kombination mit XENTRY PassThru ideal.";
      }
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

window.setBrand = setBrand;
window.setGoal = setGoal;
window.setDevice = setDevice;
window.resetFinder = resetFinder;
