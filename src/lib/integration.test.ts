/**
 * End-to-End Educational Platform Integration & Cross-Module Verification Suite
 * Phase 9: Quality Assurance, Multi-Route Consistency, and Cross-Disciplinary Integrity
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Navigation & Layout
import {
  NAV_ROUTES,
  getNavRouteByPath,
  getBreadcrumbs,
  searchNavRoutes,
} from '../components/layout/nav-data.ts';

// Exercise Engine & Question Bank
import {
  EXERCISE_BANK,
  SUBJECT_METADATA,
  evaluateAnswer,
  getQuestionsBySubject,
  getQuestionsByDifficulty,
  type ExerciseSubject,
} from './exercise-bank.ts';

// Periodic Table & Chemistry Solver
import {
  PERIODIC_TABLE_ELEMENTS,
  getElementByAtomicNumber,
  getElementBySymbol,
  getElementsByCategory,
  getElementsByPeriod,
  getElementsByBlock,
  searchElements,
} from './periodic-table-data.ts';
import {
  parseChemicalFormula,
  calculateMolarMass,
  balanceChemicalEquation,
  calculateStoichiometry,
  REACTION_PRESETS,
  AVOGADRO_CONSTANT,
} from './chemical-solver.ts';

// Circuit MNA Solver & Physics
import {
  solveCircuit,
  solveLinearSystem,
  CIRCUIT_PRESETS,
} from './circuit-solver.ts';

// Logic Gate Engine & Computer Science
import {
  evaluateGatePrimitive,
  generateTruthTable,
  CS_LOGIC_PRESETS,
  type GateType,
} from './logic-gate-engine.ts';

// Cytology & Biology
import {
  ORGANELLES,
  getOrganellesByCellType,
  getOrganelleById,
} from './cell-structure-data.ts';

// Thai Phonology Engine
import {
  deconstructThaiSyllable,
  getConsonantClass,
  identifyFinalConsonant,
  calculateThaiTone,
  MID_CONSONANTS,
  HIGH_CONSONANTS,
  LOW_SINGLE_CONSONANTS,
  LOW_PAIRED_CONSONANTS,
} from './thai-phonology.ts';

// Security & Math Sanitization
import {
  renderSanitizedLatex,
  safeEvaluateMath,
  safeCompileMath,
  createSandboxedScope,
} from './math-sanitizer.ts';

// Multibyte Thai Utilities
import {
  safeTruncateThaiBytes,
  safeTruncateThaiGraphemes,
  safeTruncateThai,
  escapeHtml,
  unescapeHtml,
} from './utils.ts';

describe('Cross-Platform Integration Suite (Phase 9 QA)', () => {
  describe('1. Multi-Route Registry & App Router Alignment', () => {
    it('verifies all 8 routes in nav-data map directly to existing app router pages', () => {
      assert.strictEqual(NAV_ROUTES.length, 8, 'Platform must host exactly 8 canonical routes');

      const appDir = path.resolve(process.cwd(), 'src/app');

      for (const route of NAV_ROUTES) {
        const expectedPagePath =
          route.path === '/'
            ? path.join(appDir, 'page.tsx')
            : path.join(appDir, route.path.slice(1), 'page.tsx');

        assert.ok(
          fs.existsSync(expectedPagePath),
          `Route ${route.path} must have a corresponding App Router page at ${expectedPagePath}`
        );
      }
    });

    it('verifies complete metadata, bilingual labels, and non-empty keywords on all routes', () => {
      const paths = new Set<string>();
      const labels = new Set<string>();
      const thaiLabels = new Set<string>();

      for (const route of NAV_ROUTES) {
        // Path format
        assert.ok(route.path.startsWith('/'), `Path ${route.path} must start with /`);
        assert.ok(!paths.has(route.path), `Path ${route.path} must be unique`);
        paths.add(route.path);

        // Labels
        assert.ok(route.label.trim().length > 0, `English label must not be empty`);
        assert.ok(!labels.has(route.label), `English label ${route.label} must be unique`);
        labels.add(route.label);

        assert.ok(route.thaiLabel.trim().length > 0, `Thai label must not be empty`);
        assert.ok(!thaiLabels.has(route.thaiLabel), `Thai label ${route.thaiLabel} must be unique`);
        thaiLabels.add(route.thaiLabel);

        // Descriptions
        assert.ok(route.description.length >= 10, `Description for ${route.path} must be descriptive`);
        assert.ok(route.thaiDescription.length >= 10, `Thai description for ${route.path} must be descriptive`);

        // Categories
        assert.ok(
          ['Core Sciences', 'Linguistics & Humanities', 'Assessment'].includes(route.category),
          `Category ${route.category} must be a recognized category`
        );

        // Keywords
        assert.ok(route.keywords.length >= 3, `Route ${route.path} must have at least 3 search keywords`);
      }
    });

    it('resolves routes by exact path and subroute prefix matching with getNavRouteByPath', () => {
      const mathRoute = getNavRouteByPath('/math');
      assert.ok(mathRoute);
      assert.strictEqual(mathRoute.label, 'Mathematics');

      const trailingSlash = getNavRouteByPath('/physics/');
      assert.ok(trailingSlash);
      assert.strictEqual(trailingSlash.label, 'Physics Laboratory');

      const nestedSubroute = getNavRouteByPath('/chemistry/experiments');
      assert.ok(nestedSubroute);
      assert.strictEqual(nestedSubroute.label, 'Chemistry Workstation');

      const unknownRoute = getNavRouteByPath('/non-existent-module');
      assert.strictEqual(unknownRoute, undefined);
    });

    it('tests breadcrumb computation across root, subroutes, and deep nested hierarchies', () => {
      // Root
      const rootCrumbs = getBreadcrumbs('/');
      assert.strictEqual(rootCrumbs.length, 1);
      assert.strictEqual(rootCrumbs[0].path, '/');
      assert.strictEqual(rootCrumbs[0].isCurrent, true);

      // Single-tier route
      const mathCrumbs = getBreadcrumbs('/math');
      assert.strictEqual(mathCrumbs.length, 2);
      assert.strictEqual(mathCrumbs[0].path, '/');
      assert.strictEqual(mathCrumbs[0].isCurrent, false);
      assert.strictEqual(mathCrumbs[1].path, '/math');
      assert.strictEqual(mathCrumbs[1].label, 'Mathematics');
      assert.strictEqual(mathCrumbs[1].isCurrent, true);

      // Multi-tier subroute with trailing slash normalization
      const nestedCrumbs = getBreadcrumbs('/chemistry/periodic-table/');
      assert.strictEqual(nestedCrumbs.length, 3);
      assert.strictEqual(nestedCrumbs[0].path, '/');
      assert.strictEqual(nestedCrumbs[1].path, '/chemistry');
      assert.strictEqual(nestedCrumbs[1].label, 'Chemistry Workstation');
      assert.strictEqual(nestedCrumbs[2].path, '/chemistry/periodic-table');
      assert.strictEqual(nestedCrumbs[2].isCurrent, true);
    });

    it('tests search engine across multilingual English/Thai queries and keywords', () => {
      // English query
      const physicsResults = searchNavRoutes('physics');
      assert.ok(physicsResults.some((r) => r.path === '/physics'));

      // Thai query
      const thaiResults = searchNavRoutes('ตารางธาตุ');
      assert.ok(thaiResults.some((r) => r.path === '/chemistry'));

      // Keyword query
      const logicResults = searchNavRoutes('boolean');
      assert.ok(logicResults.some((r) => r.path === '/cs'));

      // Empty query returns all 8
      assert.strictEqual(searchNavRoutes('').length, 8);
      assert.strictEqual(searchNavRoutes('   ').length, 8);
    });
  });

  describe('2. Cross-Module Scientific & Curriculum Consistency', () => {
    it('verifies 118 chemical elements align with chemical formulas and molar mass calculations', () => {
      assert.strictEqual(PERIODIC_TABLE_ELEMENTS.length, 118, 'Must have exactly 118 elements');

      // Check atomic numbers 1 to 118 sequential without gaps
      for (let i = 1; i <= 118; i++) {
        const el = getElementByAtomicNumber(i);
        assert.ok(el, `Element with atomic number ${i} must exist`);
        assert.strictEqual(el.atomicNumber, i);
        assert.ok(el.atomicMass > 0, `Atomic mass for ${el.symbol} must be > 0`);
      }

      // Check molar mass calculation against periodic table elements
      // H2O: 2 * 1.008 + 15.999 = 18.015
      const h = getElementBySymbol('H')!;
      const o = getElementBySymbol('O')!;
      const expectedWaterMolarMass = 2 * h.atomicMass + o.atomicMass;

      const parsedH2O = parseChemicalFormula('H2O');
      const calculatedWaterMass = calculateMolarMass(parsedH2O);
      assert.ok(
        Math.abs(calculatedWaterMass - expectedWaterMolarMass) < 0.05,
        `Calculated water mass ${calculatedWaterMass} should match expected ${expectedWaterMolarMass}`
      );

      // Verify category, period, block filtering and search
      const nobleGases = getElementsByCategory('noble-gas');
      assert.strictEqual(nobleGases.length, 7); // He, Ne, Ar, Kr, Xe, Rn, Og

      const period1 = getElementsByPeriod(1);
      assert.strictEqual(period1.length, 2); // H, He

      const sBlock = getElementsByBlock('s');
      assert.ok(sBlock.length >= 14);

      const goldSearch = searchElements('Au');
      assert.ok(goldSearch.some((e) => e.symbol === 'Au'));

      // Verify Avogadro constant definition
      assert.strictEqual(AVOGADRO_CONSTANT, 6.02214076e23);
    });

    it('verifies every reaction preset balances with zero mass loss and matches stoichiometry', () => {
      for (const preset of REACTION_PRESETS) {
        const balanced = balanceChemicalEquation(preset.equation);
        assert.strictEqual(balanced.success, true, `Preset ${preset.name} must balance`);

        // Verify atom conservation across reactants and products
        const reactantAtoms: Record<string, number> = {};
        for (const item of balanced.reactants) {
          for (const [el, count] of Object.entries(item.info.elements)) {
            reactantAtoms[el] = (reactantAtoms[el] || 0) + count * item.coefficient;
          }
        }

        const productAtoms: Record<string, number> = {};
        for (const item of balanced.products) {
          for (const [el, count] of Object.entries(item.info.elements)) {
            productAtoms[el] = (productAtoms[el] || 0) + count * item.coefficient;
          }
        }

        assert.deepStrictEqual(
          reactantAtoms,
          productAtoms,
          `Atoms must be conserved for ${preset.name}`
        );

        // Verify mass conservation (g / mol of balanced equation)
        assert.ok(
          Math.abs(balanced.totalReactantMassPerMole - balanced.totalProductMassPerMole) < 1e-3,
          `Total reactant mass (${balanced.totalReactantMassPerMole}) must equal product mass (${balanced.totalProductMassPerMole})`
        );

        // Verify stoichiometry calculation
        const firstReactantFormula = balanced.reactants[0].formula;
        const stoich = calculateStoichiometry(balanced, firstReactantFormula, 2.5, 'moles');
        assert.ok(stoich.species.length > 0, 'Stoichiometry species results must not be empty');
        assert.strictEqual(stoich.referenceFormula, firstReactantFormula);
        assert.ok(
          Math.abs(stoich.massConservationDelta) < 1e-4,
          'Stoichiometry mass conservation delta must be ~ 0'
        );
      }
    });

    it('verifies DC circuit solver MNA simulation across all circuit presets and linear solver', () => {
      assert.ok(CIRCUIT_PRESETS.length >= 4, 'Must have at least 4 circuit presets');

      // Test Gaussian elimination solver directly
      const sol = solveLinearSystem(
        [
          [3, 2, -1],
          [2, -2, 4],
          [-1, 0.5, -1],
        ],
        [1, -2, 0]
      );
      assert.ok(sol);
      assert.strictEqual(sol.length, 3);

      for (const preset of CIRCUIT_PRESETS) {
        const sim = solveCircuit(preset.netlist);
        assert.strictEqual(sim.success, true, `Circuit preset ${preset.title} must succeed`);
        assert.strictEqual(sim.nodeVoltages['0'], 0, 'Ground node 0 must always be 0V');

        // Check power conservation (totalPowerSupplied ~ totalPowerDissipated)
        if (sim.totalPowerSupplied > 0) {
          assert.ok(
            Math.abs(sim.totalPowerSupplied - sim.totalPowerDissipated) < 0.05,
            `Energy conservation in ${preset.title}: supplied (${sim.totalPowerSupplied}) vs dissipated (${sim.totalPowerDissipated})`
          );
        }
      }
    });

    it('verifies all CS digital logic presets generate complete and valid truth tables', () => {
      assert.ok(CS_LOGIC_PRESETS.length >= 4, 'Must have at least 4 logic circuit presets');

      // Verify gate primitives evaluation across all truth conditions
      const gateTypes: GateType[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];
      for (const gate of gateTypes) {
        const out00 = evaluateGatePrimitive(gate, [false, false]);
        const out01 = evaluateGatePrimitive(gate, [false, true]);
        const out10 = evaluateGatePrimitive(gate, [true, false]);
        const out11 = evaluateGatePrimitive(gate, [true, true]);

        assert.ok(typeof out00 === 'boolean');
        assert.ok(typeof out01 === 'boolean');
        assert.ok(typeof out10 === 'boolean');
        assert.ok(typeof out11 === 'boolean');
      }

      for (const preset of CS_LOGIC_PRESETS) {
        const truthTable = generateTruthTable(preset);
        assert.ok(truthTable.length > 0, `Truth table for ${preset.name} must not be empty`);

        // Check that input combinations equal 2^N (where N is input nodes count)
        const inputNodes = preset.nodes.filter((n) => n.type === 'INPUT');
        const expectedRows = Math.pow(2, inputNodes.length);
        assert.strictEqual(
          truthTable.length,
          expectedRows,
          `Circuit ${preset.name} with ${inputNodes.length} inputs must have ${expectedRows} rows`
        );

        // Every row must have valid boolean outputs
        for (const row of truthTable) {
          for (const [key, val] of Object.entries(row.outputs)) {
            assert.ok(typeof val === 'boolean', `Output ${key} must be boolean, got ${typeof val}`);
          }
        }
      }
    });

    it('verifies cytology organelle datasets partition plant vs animal organelles cleanly', () => {
      assert.strictEqual(ORGANELLES.length, 12, 'Must have 12 canonical organelles');

      const plantOrganelles = getOrganellesByCellType('plant');
      const animalOrganelles = getOrganellesByCellType('animal');

      assert.ok(plantOrganelles.length > 0);
      assert.ok(animalOrganelles.length > 0);

      // Chloroplast and Cell Wall must be plant only
      const chloroplast = getOrganelleById('chloroplast');
      assert.ok(chloroplast);
      assert.strictEqual(chloroplast.presence, 'plant-only');

      const cellWall = getOrganelleById('cell-wall');
      assert.ok(cellWall);
      assert.strictEqual(cellWall.presence, 'plant-only');

      // Centrosome must be animal only
      const centrosome = getOrganelleById('centrosome');
      assert.ok(centrosome);
      assert.strictEqual(centrosome.presence, 'animal-only');

      // Ribosomes & Mitochondria must be present in both
      const mito = getOrganelleById('mitochondria');
      assert.ok(mito);
      assert.strictEqual(mito.presence, 'both');
    });

    it('verifies Thai phonology triyang rules align with syllable classification logic', () => {
      // 9 Mid consonants
      assert.strictEqual(MID_CONSONANTS.size, 9);
      for (const char of ['ก', 'จ', 'ด', 'ต', 'ฎ', 'ฏ', 'บ', 'ป', 'อ']) {
        const cls = getConsonantClass(char);
        assert.strictEqual(cls.class, 'mid');
      }

      // 11 High consonants
      assert.strictEqual(HIGH_CONSONANTS.size, 11);
      for (const char of ['ข', 'ฉ', 'ถ', 'ผ', 'ฝ', 'ส', 'ห']) {
        const cls = getConsonantClass(char);
        assert.strictEqual(cls.class, 'high');
      }

      // Low single (sonorants) & Low paired
      assert.strictEqual(LOW_SINGLE_CONSONANTS.size, 10);
      assert.strictEqual(LOW_PAIRED_CONSONANTS.size, 14);

      // Final consonant section identification
      assert.strictEqual(identifyFinalConsonant('ง').section, 'แม่ กง');
      assert.strictEqual(identifyFinalConsonant('ก').section, 'แม่ กก');
      assert.strictEqual(identifyFinalConsonant('').section, 'แม่ ก กา');

      // Tone calculation for common words
      const testCases = [
        { word: 'กา', expectedTone: 'common' }, // Mid + live = common
        { word: 'ก่า', expectedTone: 'low' }, // Mid + mai ek = low
        { word: 'ก้า', expectedTone: 'falling' }, // Mid + mai tho = falling
        { word: 'ก๊า', expectedTone: 'high' }, // Mid + mai tri = high
        { word: 'ก๋า', expectedTone: 'rising' }, // Mid + mai chattawa = rising
        { word: 'ขวา', expectedTone: 'rising' }, // High + live = rising
        { word: 'ข่า', expectedTone: 'low' }, // High + mai ek = low
        { word: 'ข้าว', expectedTone: 'falling' }, // High + live + mai tho = falling
        { word: 'รัก', expectedTone: 'high' }, // Low + dead short = high
        { word: 'มาก', expectedTone: 'falling' }, // Low + dead long = falling
      ];

      for (const tc of testCases) {
        const decomp = deconstructThaiSyllable(tc.word);
        assert.strictEqual(
          decomp.calculatedTone,
          tc.expectedTone,
          `Tone of "${tc.word}" should be ${tc.expectedTone}, got ${decomp.calculatedTone}`
        );

        // Also test calculateThaiTone directly
        const toneResult = calculateThaiTone(
          decomp.initialClass,
          decomp.syllableType,
          decomp.vowelLength,
          decomp.toneMark
        );
        assert.strictEqual(toneResult.tone, tc.expectedTone);
      }
    });

    it('verifies exercise bank questions across all 5 subjects evaluate correctly against their answer keys', () => {
      assert.ok(EXERCISE_BANK.length >= 20, 'Exercise bank must contain at least 20 questions');

      const subjects: ExerciseSubject[] = ['math', 'physics', 'chemistry', 'biology', 'thai'];

      for (const subj of subjects) {
        const questions = getQuestionsBySubject(subj);
        assert.ok(questions.length >= 3, `Subject ${subj} must have at least 3 questions`);
        assert.ok(SUBJECT_METADATA[subj].name.length > 0);

        for (const q of questions) {
          // If latexPrompt exists, it must render through KaTeX securely without error
          if (q.latexPrompt) {
            const html = renderSanitizedLatex(q.latexPrompt);
            assert.ok(html.includes('katex'));
          }

          // Evaluating correct answer must yield isCorrect === true
          const result = evaluateAnswer(q, q.correctAnswer);
          assert.strictEqual(
            result.isCorrect,
            true,
            `Question ${q.id} (${q.title}) must evaluate as correct with its own answer key`
          );

          // Evaluating obviously wrong answer must yield isCorrect === false
          const wrongAnswer =
            q.type === 'numeric'
              ? (Number(q.correctAnswer) || 0) + 99999
              : q.type === 'multiple-select'
                ? ['invalid-wrong-id']
                : 'completely_wrong_answer_xyz';

          const wrongResult = evaluateAnswer(q, wrongAnswer);
          assert.strictEqual(
            wrongResult.isCorrect,
            false,
            `Question ${q.id} must reject incorrect answer`
          );
        }
      }

      // Check difficulty filtering
      assert.ok(getQuestionsByDifficulty('easy').length > 0);
      assert.ok(getQuestionsByDifficulty('medium').length > 0);
      assert.ok(getQuestionsByDifficulty('hard').length > 0);
    });

    it('validates sandboxed math expressions match scientific formulas', () => {
      // Kinetic energy: E = 0.5 * m * v^2
      const scope = createSandboxedScope({ m: 2, v: 3 });
      const kineticEnergy = safeEvaluateMath('0.5 * m * v^2', scope);
      assert.strictEqual(kineticEnergy, 9);

      // Quadratic roots formula
      const quadScope = createSandboxedScope({ a: 1, b: -5, c: 6 });
      const compiled = safeCompileMath('(-b + sqrt(b^2 - 4 * a * c)) / (2 * a)');
      const root1 = compiled.evaluate(quadScope);
      assert.strictEqual(root1, 3);
    });
  });

  describe('3. Multibyte Thai UTF-8 Safety & Kiosk Boundaries', () => {
    it('verifies safeTruncateThai never leaves broken 3-byte unicode lead bytes', () => {
      const complexThai = 'วิทยาศาสตร์และเทคโนโลยีสารสนเทศเพื่อการศึกษา';
      const encoded = new TextEncoder().encode(complexThai);

      // Truncate at every single byte index from 1 to encoded.length (with empty suffix)
      for (let maxBytes = 1; maxBytes <= encoded.length; maxBytes++) {
        const truncated = safeTruncateThaiBytes(complexThai, maxBytes, '');
        const truncBytes = new TextEncoder().encode(truncated);

        assert.ok(
          truncBytes.length <= maxBytes,
          `Truncated byte length (${truncBytes.length}) must not exceed maxBytes (${maxBytes})`
        );

        // Ensure string decodes back cleanly without replacement characters (0xFFFD)
        assert.ok(
          !truncated.includes('\uFFFD'),
          `Truncated string at maxBytes=${maxBytes} contains replacement character`
        );
      }
    });

    it('verifies safeTruncateThaiGraphemes preserves tone marks and floating vowels attached to consonants', () => {
      const words = ['น้ำ', 'ผู้', 'ใหญ่', 'ให้', 'ใบ', 'จำ', 'ปี'];

      for (const word of words) {
        const truncated1 = safeTruncateThaiGraphemes(word, 1);
        // The first grapheme must be valid and not detach combining marks
        assert.ok(truncated1.length > 0);
        assert.ok(!truncated1.includes('\uFFFD'));
      }

      // Universal dispatch: 'ส' (1) + 'วั' (2) + 'ส' (3) + 'ดี' (4) = 4 graphemes
      const universalGrapheme = safeTruncateThai('สวัสดีประเทศไทย', 4, 'graphemes', '');
      assert.strictEqual(universalGrapheme, 'สวัสดี');

      const universalByte = safeTruncateThai('ABCDEF', 3, 'bytes', '');
      assert.strictEqual(universalByte, 'ABC');
    });
  });

  describe('4. Accessibility Landmarks, WCAG 2.1 AA & Security Integration', () => {
    it('verifies KioskShell layout exposes bypass blocks skip-link and main content landmark', () => {
      const kioskShellPath = path.resolve(process.cwd(), 'src/components/layout/KioskShell.tsx');
      assert.ok(fs.existsSync(kioskShellPath), 'KioskShell.tsx must exist');

      const content = fs.readFileSync(kioskShellPath, 'utf-8');
      assert.ok(
        content.includes('href="#main-content"'),
        'KioskShell must provide a bypass block skip link targeting #main-content'
      );
      assert.ok(
        content.includes('id="main-content"'),
        'KioskShell must declare the main landmark with id="main-content"'
      );
      assert.ok(
        content.includes('tabIndex={-1}'),
        'Main content element must have tabIndex={-1} for keyboard focus management'
      );
    });

    it('verifies all interactive workbenches contain WCAG accessibility markup', () => {
      // 1. CellStructureViewer contains role="tablist", role="tab", aria-pressed, and organelle selectors
      const cellViewerPath = path.resolve(process.cwd(), 'src/components/biology/CellStructureViewer.tsx');
      const cellContent = fs.readFileSync(cellViewerPath, 'utf-8');
      assert.ok(cellContent.includes('role="tablist"'), 'Cell viewer must have tablist');
      assert.ok(cellContent.includes('role="tab"'), 'Cell viewer must have tab buttons');
      assert.ok(cellContent.includes('aria-selected='), 'Cell viewer must have aria-selected');
      assert.ok(cellContent.includes('Organelle Quick Selectors'), 'Cell viewer must have accessible quick selectors');

      // 2. ThaiPhonologyVisualizer contains aria-label on input and role="img" on pitch contour
      const thaiViewerPath = path.resolve(process.cwd(), 'src/components/ThaiPhonologyVisualizer.tsx');
      const thaiContent = fs.readFileSync(thaiViewerPath, 'utf-8');
      assert.ok(thaiContent.includes('aria-label="พิมพ์คำหรือพยางค์ภาษาไทย'), 'Thai input must have descriptive aria-label');
      assert.ok(thaiContent.includes('role="img"'), 'Tone contour SVG must have role="img"');

      // 3. ExerciseEngine contains radiogroup, role="radio", role="checkbox", and aria-live status
      const exercisePath = path.resolve(process.cwd(), 'src/components/exercises/ExerciseEngine.tsx');
      const exerciseContent = fs.readFileSync(exercisePath, 'utf-8');
      assert.ok(exerciseContent.includes('role="radiogroup"'), 'Exercise engine must have role="radiogroup"');
      assert.ok(exerciseContent.includes('role="radio"'), 'Single-choice options must have role="radio"');
      assert.ok(exerciseContent.includes('role="checkbox"'), 'Multi-choice options must have role="checkbox"');
      assert.ok(exerciseContent.includes('aria-live="polite"'), 'Submission feedback must have aria-live="polite"');

      // 4. CircuitSimulator contains keyboard accessible switch
      const circuitPath = path.resolve(process.cwd(), 'src/components/physics/CircuitSimulator.tsx');
      const circuitContent = fs.readFileSync(circuitPath, 'utf-8');
      assert.ok(circuitContent.includes('aria-pressed={isClosed}'), 'Circuit switch must have aria-pressed');
      assert.ok(circuitContent.includes('onKeyDown='), 'Circuit switch must support keyboard enter/space');

      // 5. LogicGateSandbox contains keyboard accessible inputs
      const logicPath = path.resolve(process.cwd(), 'src/components/cs/LogicGateSandbox.tsx');
      const logicContent = fs.readFileSync(logicPath, 'utf-8');
      assert.ok(logicContent.includes('aria-pressed={nodeVal}'), 'Logic gate inputs must have aria-pressed');

      // 6. PeriodicTableViewer contains modal dialog role and aria-pressed
      const periodicPath = path.resolve(process.cwd(), 'src/components/chemistry/PeriodicTableViewer.tsx');
      const periodicContent = fs.readFileSync(periodicPath, 'utf-8');
      assert.ok(periodicContent.includes('role="dialog"'), 'Periodic table modal must declare role="dialog"');
      assert.ok(periodicContent.includes('aria-modal="true"'), 'Periodic table modal must be aria-modal="true"');
      assert.ok(periodicContent.includes('aria-pressed={isSelected}'), 'Element buttons must have aria-pressed');

      // 7. ChemicalReactionViewer contains alert role for error
      const chemPath = path.resolve(process.cwd(), 'src/components/chemistry/ChemicalReactionViewer.tsx');
      const chemContent = fs.readFileSync(chemPath, 'utf-8');
      assert.ok(chemContent.includes('role="alert"'), 'Reaction balancer error must declare role="alert"');

      // 8. VerletSimulationCanvas contains radiogroup and slider labels
      const verletPath = path.resolve(process.cwd(), 'src/components/VerletSimulationCanvas.tsx');
      const verletContent = fs.readFileSync(verletPath, 'utf-8');
      assert.ok(verletContent.includes('role="radiogroup"'), 'Verlet canvas must have role="radiogroup"');
      assert.ok(verletContent.includes('aria-label="Central Mass (M)"'), 'Sliders must have aria-label');
    });

    it('validates cross-module integration with HTML entity escaping and sanitization', () => {
      // User inputs from practice bank or chemical inputs sanitized
      const dangerousInputs = [
        '<script>alert("xss")</script>',
        'CH4 + O2 -> CO2 + <img src=x onerror=alert(1)>',
        '2 * x + "<script>pwn</script>"',
      ];

      for (const input of dangerousInputs) {
        const escaped = escapeHtml(input);
        assert.ok(!escaped.includes('<script>'));
        assert.ok(!escaped.includes('<img'));
        assert.strictEqual(unescapeHtml(escaped), input);
      }
    });
  });
});
