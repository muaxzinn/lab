import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  PERIODIC_TABLE_ELEMENTS,
  getElementByAtomicNumber,
  getElementBySymbol,
  getElementsByCategory,
  getElementsByPeriod,
  getElementsByBlock,
  searchElements,
} from './periodic-table-data.ts';

describe('IUPAC Periodic Table of Elements (118 Elements)', () => {
  it('contains exactly 118 elements', () => {
    assert.strictEqual(PERIODIC_TABLE_ELEMENTS.length, 118);
  });

  it('contains sequential atomic numbers from 1 to 118 without gaps', () => {
    for (let i = 1; i <= 118; i++) {
      const el = PERIODIC_TABLE_ELEMENTS[i - 1];
      assert.strictEqual(el.atomicNumber, i, `Element at index ${i - 1} should have atomic number ${i}`);
    }
  });

  it('contains unique element symbols', () => {
    const symbols = new Set<string>();
    for (const el of PERIODIC_TABLE_ELEMENTS) {
      assert.ok(!symbols.has(el.symbol), `Duplicate symbol detected: ${el.symbol}`);
      symbols.add(el.symbol);
    }
    assert.strictEqual(symbols.size, 118);
  });

  it('verifies electron configuration shells sum to atomic number for neutral atoms', () => {
    for (const el of PERIODIC_TABLE_ELEMENTS) {
      const shellSum = el.electronsPerShell.reduce((acc, count) => acc + count, 0);
      assert.strictEqual(
        shellSum,
        el.atomicNumber,
        `Element ${el.symbol} (#${el.atomicNumber}) electronsPerShell sum (${shellSum}) does not match atomic number`
      );
    }
  });

  it('correctly resolves elements by atomic number', () => {
    const gold = getElementByAtomicNumber(79);
    assert.ok(gold);
    assert.strictEqual(gold.symbol, 'Au');
    assert.strictEqual(gold.name, 'Gold');
    assert.strictEqual(gold.thaiName, 'ทองคำ');

    const nonExistent = getElementByAtomicNumber(999);
    assert.strictEqual(nonExistent, undefined);
  });

  it('correctly resolves elements by symbol case-insensitively', () => {
    const carbon = getElementBySymbol('c');
    assert.ok(carbon);
    assert.strictEqual(carbon.atomicNumber, 6);

    const iron = getElementBySymbol('FE');
    assert.ok(iron);
    assert.strictEqual(iron.atomicNumber, 26);
  });

  it('verifies category and block filtering', () => {
    const nobleGases = getElementsByCategory('noble-gas');
    assert.ok(nobleGases.length >= 7, 'Should have at least 7 noble gases (He to Og)');
    assert.ok(nobleGases.some((el) => el.symbol === 'He'));
    assert.ok(nobleGases.some((el) => el.symbol === 'Ne'));
    assert.ok(nobleGases.some((el) => el.symbol === 'Og'));

    const sBlock = getElementsByBlock('s');
    assert.ok(sBlock.length > 0);
    assert.ok(sBlock.some((el) => el.symbol === 'H'));
    assert.ok(sBlock.some((el) => el.symbol === 'Na'));

    const lanthanides = getElementsByCategory('lanthanide');
    assert.strictEqual(lanthanides.length, 15, 'Lanthanides series contains 15 elements (57-71)');

    const actinides = getElementsByCategory('actinide');
    assert.strictEqual(actinides.length, 15, 'Actinides series contains 15 elements (89-103)');
  });

  it('verifies period filtering', () => {
    const period1 = getElementsByPeriod(1);
    assert.strictEqual(period1.length, 2);
    assert.strictEqual(period1[0].symbol, 'H');
    assert.strictEqual(period1[1].symbol, 'He');

    const period2 = getElementsByPeriod(2);
    assert.strictEqual(period2.length, 8);
  });

  it('searches elements by query matching name, symbol, or Thai name', () => {
    const queryAu = searchElements('Au');
    assert.ok(queryAu.some((el) => el.symbol === 'Au'));

    const queryThai = searchElements('เหล็ก');
    assert.ok(queryThai.some((el) => el.symbol === 'Fe'));

    const queryNum = searchElements('118');
    assert.strictEqual(queryNum.length, 1);
    assert.strictEqual(queryNum[0].symbol, 'Og');
  });

  it('verifies Pauling electronegativity trends', () => {
    const fluorine = getElementBySymbol('F');
    assert.ok(fluorine);
    assert.strictEqual(fluorine.electronegativity, 3.98, 'Fluorine should have highest electronegativity (3.98)');

    const caesium = getElementBySymbol('Cs');
    assert.ok(caesium);
    assert.strictEqual(caesium.electronegativity, 0.79, 'Caesium should have very low electronegativity (0.79)');
  });
});
