let decodeString = "c9d2";
let codeLength = 4;

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');

  if (codeParam) {
    const origCodeInput = document.getElementById("origCode");
    if(origCodeInput) {
        origCodeInput.value = codeParam;
        calculateXor();
    }
  }
});

function calculateXor() {
  let origCodeInput = document.getElementById("origCode");
  let calcCodeInput = document.getElementById("calcCode");
  let copyBtn = document.getElementById("copyBtn");
  
  if(!origCodeInput || !calcCodeInput) return;

  let input = origCodeInput.value.trim();
  let result = '';

  if (input.length !== codeLength) {
    alert("Die Länge des eingegebenen Wertes muss genau " + codeLength + " Zeichen betragen.");
    return;
  }

  if (!/^[0-9a-fA-F]+$/.test(input)) {
    alert("Nur HEX-Zeichen (0-9, A-F) sind erlaubt.");
    return;
  }

  for (let index = 0; index < codeLength; index++) {
    const a = parseInt(input.charAt(index), 16);
    const b = parseInt(decodeString.charAt(index), 16);
    const temp = (a ^ b).toString(16).toUpperCase();
    result += temp;
  }

  calcCodeInput.value = result;
  if(copyBtn) copyBtn.style.display = "block";
}

function clearAll() {
  let origCodeInput = document.getElementById("origCode");
  let calcCodeInput = document.getElementById("calcCode");
  let copyBtn = document.getElementById("copyBtn");

  if(!origCodeInput || !calcCodeInput) return;
  origCodeInput.value = "";
  calcCodeInput.value = "";
  if(copyBtn) copyBtn.style.display = "none";
}

let copyTimeout;

async function copyResult() {
  let calcCodeInput = document.getElementById("calcCode");
  let copyBtn = document.getElementById("copyBtn");

  if (!calcCodeInput) return;
  calcCodeInput.select();

  try {
    await navigator.clipboard.writeText(calcCodeInput.value);
    if (copyBtn) {
      if (copyTimeout) clearTimeout(copyTimeout);

      const isAlreadyCopied = copyBtn.innerText === "Kopiert!";
      const originalText = isAlreadyCopied ? copyBtn.getAttribute('data-original-text') : copyBtn.innerText;

      if (!isAlreadyCopied) {
          copyBtn.setAttribute('data-original-text', originalText);
      }

      copyBtn.innerText = "Kopiert!";

      copyTimeout = setTimeout(() => {
          copyBtn.innerText = originalText;
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

window.calculateXor = calculateXor;
window.clearAll = clearAll;
window.copyResult = copyResult;
