import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PLANETS, SUN_DATA } from "./astronomy-data.ts";

describe("Astronomical & Orbital Dynamics (OpenLyceum Adaptation)", () => {
  it("verifies Sun central star properties", () => {
    assert.equal(SUN_DATA.id, "sun");
    assert.ok(SUN_DATA.radius > 0);
    assert.ok(SUN_DATA.color.startsWith("#"));
    assert.ok(SUN_DATA.emissiveColor.startsWith("#"));
    assert.ok(SUN_DATA.description.length > 0);
    assert.ok(SUN_DATA.thaiDescription.length > 0);
  });

  it("contains exactly 8 major planetary bodies", () => {
    assert.equal(PLANETS.length, 8);
    const expectedIds = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
    const actualIds = PLANETS.map((p) => p.id);
    assert.deepEqual(actualIds, expectedIds);
  });

  it("verifies monotonic semi-major axis distance ordering from the Sun", () => {
    for (let i = 0; i < PLANETS.length - 1; i++) {
      assert.ok(
        PLANETS[i].semiMajorAxisAU < PLANETS[i + 1].semiMajorAxisAU,
        `Expected ${PLANETS[i].id} semiMajorAxisAU to be less than ${PLANETS[i + 1].id}`
      );
      assert.ok(
        PLANETS[i].distance < PLANETS[i + 1].distance,
        `Expected ${PLANETS[i].id} distance to be less than ${PLANETS[i + 1].id}`
      );
    }
  });

  it("verifies Kepler's Third Law (Harmonic Law: T^2 proportional to a^3)", () => {
    for (const planet of PLANETS) {
      // T in years = orbitalPeriodDays / 365.25
      const periodYr = planet.orbitalPeriodDays / 365.25;
      const a = planet.semiMajorAxisAU;
      const tSquared = periodYr * periodYr;
      const aCubed = a * a * a;
      // Ratio T^2 / a^3 should be approximately 1.0 (within 5% observational accuracy)
      const ratio = tSquared / aCubed;
      assert.ok(
        Math.abs(ratio - 1.0) < 0.05,
        `Kepler Third Law violated for ${planet.id}: ratio=${ratio}`
      );
    }
  });

  it("validates planetary rings and moon features", () => {
    const earth = PLANETS.find((p) => p.id === "earth");
    assert.ok(earth);
    assert.equal(earth.hasMoon, true);

    const saturn = PLANETS.find((p) => p.id === "saturn");
    assert.ok(saturn);
    assert.equal(saturn.hasRings, true);
  });
});
