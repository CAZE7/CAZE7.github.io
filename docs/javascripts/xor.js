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
  let inputElement = document.getElementById("origCode");
  if(!inputElement) return;
  
  let input = inputElement.value.trim();
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

  document.getElementById("calcCode").value = result;
}

function clearAll() {
  document.getElementById("origCode").value = "";
  document.getElementById("calcCode").value = "";
}

window.calculateXor = calculateXor;
window.clearAll = clearAll;
