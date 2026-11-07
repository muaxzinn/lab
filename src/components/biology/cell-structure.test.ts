import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  ORGANELLES,
  type Organelle,
  getOrganellesByCellType,
  getOrganelleById,
} from '../../lib/cell-structure-data.ts';

describe('Interactive Cell & Organelle Visualizer (FEAT-07)', () => {
  it('contains all required eukaryotic organelles including ribosomes', () => {
    const requiredOrganelles = [
      'nucleus',
      'mitochondria',
      'ribosomes',
      'rough-er',
      'smooth-er',
      'golgi',
      'chloroplast',
      'vacuole',
      'lysosome',
      'centrosome',
      'cell-wall',
      'plasma-membrane',
    ];

    const ids = new Set(ORGANELLES.map((o: Organelle) => o.id));
    for (const req of requiredOrganelles) {
      assert.ok(ids.has(req), `Missing required organelle: ${req}`);
    }
  });

  it('validates structural integrity and bilingual descriptions for each organelle', () => {
    for (const org of ORGANELLES) {
      assert.ok(org.id.length > 0, `Organelle has empty id`);
      assert.ok(org.name.length > 0, `Organelle ${org.id} missing name`);
      assert.ok(org.thaiName.length > 0, `Organelle ${org.id} missing thaiName`);
      assert.ok(['both', 'plant-only', 'animal-only'].includes(org.presence));
      assert.ok(['genetic', 'energy', 'endomembrane', 'structural'].includes(org.category));
      assert.ok(org.function.length > 20, `Organelle ${org.id} function too short`);
      assert.ok(org.functionThai.length > 20, `Organelle ${org.id} functionThai too short`);
      assert.ok(org.structuralDetails.length > 10, `Organelle ${org.id} structuralDetails too short`);
      assert.ok(org.examKeyPointThai.length > 10, `Organelle ${org.id} examKeyPointThai too short`);

      // Coordinates validation
      assert.ok(org.coordinates, `Organelle ${org.id} missing coordinates object`);
      assert.ok(typeof org.coordinates.plant.cx === 'number');
      assert.ok(typeof org.coordinates.plant.cy === 'number');
      assert.ok(typeof org.coordinates.animal.cx === 'number');
      assert.ok(typeof org.coordinates.animal.cy === 'number');
    }
  });

  it('verifies plant vs animal cytology presence partitioning', () => {
    const plantOnly = ORGANELLES.filter((o: Organelle) => o.presence === 'plant-only');
    const plantIds = plantOnly.map((o: Organelle) => o.id);
    assert.ok(plantIds.includes('chloroplast'), 'Chloroplast must be plant-only');
    assert.ok(plantIds.includes('cell-wall'), 'Cell Wall must be plant-only');

    const animalOnly = ORGANELLES.filter((o: Organelle) => o.presence === 'animal-only');
    const animalIds = animalOnly.map((o: Organelle) => o.id);
    assert.ok(animalIds.includes('lysosome'), 'Lysosome must be animal-only');
    assert.ok(animalIds.includes('centrosome'), 'Centrosome must be animal-only');

    const shared = ORGANELLES.filter((o: Organelle) => o.presence === 'both');
    const sharedIds = shared.map((o: Organelle) => o.id);
    assert.ok(sharedIds.includes('nucleus'), 'Nucleus must be present in both');
    assert.ok(sharedIds.includes('mitochondria'), 'Mitochondria must be present in both');
    assert.ok(sharedIds.includes('ribosomes'), 'Ribosomes must be present in both');
    assert.ok(sharedIds.includes('plasma-membrane'), 'Plasma Membrane must be present in both');
  });

  it('verifies non-membrane ribosomes specification', () => {
    const ribosome = ORGANELLES.find((o: Organelle) => o.id === 'ribosomes');
    assert.ok(ribosome);
    assert.ok(ribosome.examKeyPointThai.includes('ไม่มีเยื่อหุ้ม'));
    assert.ok(ribosome.structuralDetails.includes('80S') && ribosome.structuralDetails.includes('70S'));
  });

  it('validates retrieval helper functions', () => {
    const plantOrgs = getOrganellesByCellType('plant');
    assert.ok(plantOrgs.length >= 10);
    assert.ok(plantOrgs.some((o) => o.id === 'chloroplast'));
    assert.ok(!plantOrgs.some((o) => o.id === 'lysosome'));

    const animalOrgs = getOrganellesByCellType('animal');
    assert.ok(animalOrgs.length >= 10);
    assert.ok(animalOrgs.some((o) => o.id === 'lysosome'));
    assert.ok(!animalOrgs.some((o) => o.id === 'chloroplast'));

    const nucleus = getOrganelleById('nucleus');
    assert.ok(nucleus);
    assert.strictEqual(nucleus.name, 'Nucleus & Nucleolus');

    const unknown = getOrganelleById('non-existent');
    assert.strictEqual(unknown, undefined);
  });
});
