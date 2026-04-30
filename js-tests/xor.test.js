/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load the JavaScript code
const xorJsCode = fs.readFileSync(path.resolve(__dirname, '../docs/javascripts/xor.js'), 'utf8');

// Run it once in the global context
// Because the script explicitly does `window.calculateXor = calculateXor;`,
// this works to expose the function correctly.
eval(xorJsCode);

describe('calculateXor', () => {
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `
      <div>
        <input type="text" id="origCode" value="" />
        <input type="text" id="calcCode" value="" />
        <button id="copyBtn" style="display: none;">Kopieren</button>
      </div>
    `;

    // Mock alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calculates XOR correctly for valid input', () => {
    const origCodeInput = document.getElementById('origCode');
    const calcCodeInput = document.getElementById('calcCode');
    const copyBtn = document.getElementById('copyBtn');

    origCodeInput.value = '1234';

    // Call the function
    window.calculateXor();

    expect(calcCodeInput.value).toBe('DBE6');
    expect(copyBtn.style.display).toBe('block');
    expect(window.alert).not.toHaveBeenCalled();
  });

  test('shows alert for invalid length input', () => {
    const origCodeInput = document.getElementById('origCode');
    const calcCodeInput = document.getElementById('calcCode');

    origCodeInput.value = '123'; // 3 characters

    // Call the function
    window.calculateXor();

    expect(calcCodeInput.value).toBe('');
    expect(window.alert).toHaveBeenCalledWith('Die Länge des eingegebenen Wertes muss genau 4 Zeichen betragen.');
  });

  test('shows alert for non-hex input', () => {
    const origCodeInput = document.getElementById('origCode');
    const calcCodeInput = document.getElementById('calcCode');

    origCodeInput.value = '123G'; // Contains non-hex 'G'

    // Call the function
    window.calculateXor();

    expect(calcCodeInput.value).toBe('');
    expect(window.alert).toHaveBeenCalledWith('Nur HEX-Zeichen (0-9, A-F) sind erlaubt.');
  });

  test('handles missing DOM elements gracefully', () => {
    // Remove inputs
    document.body.innerHTML = '';

    // Should not throw
    expect(() => {
      window.calculateXor();
    }).not.toThrow();
  });
});
