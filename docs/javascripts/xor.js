let decodeString = "c9d2";
let codeLength = 4;

let origCodeInput, calcCodeInput, copyBtn;

document.addEventListener("DOMContentLoaded", function() {
  origCodeInput = document.getElementById("origCode");
  calcCodeInput = document.getElementById("calcCode");
  copyBtn = document.getElementById("copyBtn");

  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');

  if (codeParam && origCodeInput) {
    origCodeInput.value = codeParam;
    calculateXor();
  }
});

function calculateXor() {
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
  if(origCodeInput) origCodeInput.value = "";
  if(calcCodeInput) calcCodeInput.value = "";
  if(copyBtn) copyBtn.style.display = "none";
}

function copyResult() {
  if (!calcCodeInput || !copyBtn) return;

  const textToCopy = calcCodeInput.value;
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Kopiert!";
    setTimeout(() => { copyBtn.innerText = originalText; }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

window.calculateXor = calculateXor;
window.clearAll = clearAll;
window.copyResult = copyResult;
