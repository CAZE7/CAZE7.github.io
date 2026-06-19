const TRAILER_HEX = "0000000000000000003B0FC769BFFF15ECD445B8196D2203D6D56BD8F22748B37D68F863DAC57E23C90A5FEEF0C06394C8D48A2EAA4F0FB658557400E66441DDC7D5AC3610AA4D45056C0C6E17C7E4B60C40E52FFA891938AF186ED20AE83A99EB10F3088479E6CBD2770C1563B5AE235B440BEF16EBE696576E108F2F9F897D963DEFBAD3ABDF2FFE";

let codes = [];
let selectedCount = 0;

function validateLength(actual, expected, alertId, label) {
  const el = document.getElementById(alertId);
  if (!el) return;

  el.className = 'admonition'; // Reset to base admonition

  if (actual === 0) {
    el.classList.add('failure');
    el.innerHTML = `<p class="admonition-title">Fehler</p><p>${label} darf nicht leer sein!</p>`;
    el.style.display = 'block';
  } else if (actual !== expected) {
    el.classList.add('warning');
    el.innerHTML = `<p class="admonition-title">Warnung</p><p>${label} sollte genau ${expected} Zeichen lang sein! (Aktuell: <b>${actual}/${expected}</b>)</p>`;
    el.style.display = 'block';
  } else {
    el.classList.add('success');
    el.innerHTML = `<p class="admonition-title">OK</p><p>${label} Status ist korrekt.</p>`;
    el.style.display = 'block';
  }
}

function stringToHex(str) {
  return Array.from(str)
    .map(ch => ch.charCodeAt(0).toString(16))
    .join("");
}

function renderCodes() {
  const codesContainerEl = document.getElementById("codes-container");
  const vinInputEl = document.getElementById("vin");
  const vcrnInputEl = document.getElementById("vcrn");
  const jumbotronEl = document.getElementById("no-codes-message");

  if (!codesContainerEl || !vinInputEl || !vcrnInputEl) return;

  codesContainerEl.innerHTML = "";

  const vin = vinInputEl.value;
  const vcrn = vcrnInputEl.value;

  const timestampHex = Math.floor(Date.now() / 1000)
    .toString(16)
    .toUpperCase();

  codes.forEach(item => {
    if (!item.visible) return;

    const hexVin = stringToHex(vin).toUpperCase();
    const finalCode = `1102${item.code}03${vcrn.toUpperCase()}${hexVin}00${timestampHex}${TRAILER_HEX}`;

    const wrapper = document.createElement("div");
    wrapper.className = "fec-result-item";
    wrapper.style.marginBottom = "1.5rem";

    const label = document.createElement("label");
    label.className = "md-typeset font-weight-bold";
    label.style.display = "block";
    label.style.marginBottom = "0.5rem";
    label.style.fontWeight = "bold";
    label.textContent = item.name;

    const textarea = document.createElement("textarea");
    textarea.className = "fec-textarea";
    textarea.readOnly = true;
    textarea.value = finalCode;
    textarea.style.width = "100%";
    textarea.style.minHeight = "80px";
    textarea.style.padding = "10px";
    textarea.style.borderRadius = "8px";
    textarea.style.border = "1px solid rgba(0,0,0,0.1)";
    textarea.style.backgroundColor = "var(--md-default-bg-color--lightest)";
    textarea.style.color = "var(--md-default-fg-color)";
    textarea.style.fontFamily = "var(--md-code-font)";
    textarea.style.fontSize = "0.85em";
    textarea.setAttribute("aria-label", "Generierter Code für " + item.name);

    textarea.addEventListener("click", async function () {
      this.select();
      try {
        await navigator.clipboard.writeText(this.value);
        // Optional: Kurzes visuelles Feedback durch eine Notifikation (hier nur Console wegen Limitierungen)
        console.log('Copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
    textarea.addEventListener("focus", function () {
      this.select();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(textarea);
    codesContainerEl.appendChild(wrapper);
  });

  if (jumbotronEl) {
    jumbotronEl.style.display = selectedCount > 0 ? "none" : "block";
  }
}

document.addEventListener("DOMContentLoaded", function() {
    const vinInputEl = document.getElementById("vin");
    const vcrnInputEl = document.getElementById("vcrn");

    if (vinInputEl) {
      vinInputEl.addEventListener("keyup", function () {
        const value = this.value;
        codes.forEach(item => (item.vin = value));
        validateLength(value.length, 17, "avin", "VIN");
        renderCodes();
      });
      // Initial validation
      validateLength(vinInputEl.value.length, 17, "avin", "VIN");
    }
    
    if (vcrnInputEl) {
      vcrnInputEl.addEventListener("keyup", function () {
        const value = this.value;
        codes.forEach(item => (item.vcrn = value));
        validateLength(value.length, 10, "avcrn", "VCRN");
        renderCodes();
      });
      // Initial validation
      validateLength(vcrnInputEl.value.length, 10, "avcrn", "VCRN");
    }
    
    document.querySelectorAll(".fec-checkbox").forEach(input => {
      input.addEventListener("change", function () {
        const codeValue = this.value;
        const name = this.getAttribute("data-name");
        const existingItem = codes.find(item => item.code === codeValue);
    
        if (this.checked) {
          if (existingItem) {
            existingItem.visible = true;
          } else {
            const vinVal = vinInputEl ? vinInputEl.value : "";
            const vcrnVal = vcrnInputEl ? vcrnInputEl.value : "";
    
            codes.push({
              code: codeValue,
              vcrn: vcrnVal,
              vin: vinVal,
              visible: true,
              name: name
            });
          }
          selectedCount++;
        } else {
          if (existingItem) {
            existingItem.visible = false;
          }
          selectedCount--;
        }
    
        renderCodes();
      });
    });
});
