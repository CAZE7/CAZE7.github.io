const test = require('node:test');
const assert = require('node:assert');

// Mock browser globals needed when fec.js loads
global.document = {
  addEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => []
};

const { stringToHex, hasCode } = require('../fec.js');

test('stringToHex', async (t) => {
  await t.test('converts simple string to hex', () => {
    assert.strictEqual(stringToHex('A'), '41');
    assert.strictEqual(stringToHex('AB'), '4142');
  });

  await t.test('handles empty string', () => {
    assert.strictEqual(stringToHex(''), '');
  });

  await t.test('handles numbers in string', () => {
    assert.strictEqual(stringToHex('123'), '313233');
  });

  await t.test('handles special characters', () => {
    assert.strictEqual(stringToHex('!@#'), '214023');
  });

  await t.test('handles lowercase letters', () => {
    assert.strictEqual(stringToHex('abc'), '616263');
  });
});

test('hasCode', async (t) => {
  const list = [
    { code: '00040000', visible: true },
    { code: '00060000', visible: false }
  ];

  await t.test('returns true if code exists in the list', () => {
    assert.strictEqual(hasCode(list, '00040000'), true);
    assert.strictEqual(hasCode(list, '00060000'), true);
  });

  await t.test('returns false if code does not exist in the list', () => {
    assert.strictEqual(hasCode(list, '00050000'), false);
  });

  await t.test('returns false for empty list', () => {
    assert.strictEqual(hasCode([], '00040000'), false);
  });
});
