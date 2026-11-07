import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SIMULATION_ITEMS,
  CATEGORIES,
  filterSimulations,
} from "./simulation-catalog.ts";

describe("Simulation Catalog & OpenLyceum Integration", () => {
  it("contains all 10 defined category definitions including 'all'", () => {
    assert.equal(CATEGORIES.length, 10);
    const categoryIds = CATEGORIES.map((c) => c.id);
    assert.ok(categoryIds.includes("all"));
    assert.ok(categoryIds.includes("astronomy"));
    assert.ok(categoryIds.includes("physics"));
    assert.ok(categoryIds.includes("waves-optics"));
    assert.ok(categoryIds.includes("electricity"));
    assert.ok(categoryIds.includes("chemistry"));
    assert.ok(categoryIds.includes("quantum"));
    assert.ok(categoryIds.includes("biology"));
    assert.ok(categoryIds.includes("computation"));
    assert.ok(categoryIds.includes("linguistics"));
  });

  it("contains a comprehensive catalog of 70+ simulations and workbenches", () => {
    assert.ok(SIMULATION_ITEMS.length >= 70);
  });

  it("verifies structural integrity of each simulation item", () => {
    const validCategoryIds = new Set(CATEGORIES.map((c) => c.id));

    for (const item of SIMULATION_ITEMS) {
      assert.ok(item.id.length > 0, `Item ${item.id} must have non-empty id`);
      assert.ok(item.title.length > 0, `Item ${item.id} must have non-empty title`);
      assert.ok(item.thaiTitle.length > 0, `Item ${item.id} must have non-empty thaiTitle`);
      assert.ok(item.description.length > 0, `Item ${item.id} must have description`);
      assert.ok(item.thaiDescription.length > 0, `Item ${item.id} must have thaiDescription`);
      assert.ok(validCategoryIds.has(item.category), `Item ${item.id} category must be valid`);
      assert.ok(item.path.startsWith("/"), `Item ${item.id} path must start with /`);
      assert.ok(
        ["3D WebGL", "Simulation", "Interactive Lab", "Guided Inquiry"].includes(item.badge),
        `Item ${item.id} badge must be valid`
      );
      assert.ok(
        ["OpenLyceum", "Internal", "NASA / PDB"].includes(item.source),
        `Item ${item.id} source must be valid`
      );
    }
  });

  it("verifies items exist across all 9 subject categories", () => {
    const subjectCategories = CATEGORIES.filter((c) => c.id !== "all");

    for (const cat of subjectCategories) {
      const itemsInCat = SIMULATION_ITEMS.filter((i) => i.category === cat.id);
      assert.ok(
        itemsInCat.length >= 3,
        `Category ${cat.id} must have at least 3 simulation items (found ${itemsInCat.length})`
      );
    }
  });

  it("filters accurately by category", () => {
    const astronomyItems = filterSimulations(SIMULATION_ITEMS, "astronomy");
    assert.ok(astronomyItems.length >= 10);
    assert.ok(astronomyItems.every((item) => item.category === "astronomy"));

    const allItems = filterSimulations(SIMULATION_ITEMS, "all");
    assert.equal(allItems.length, SIMULATION_ITEMS.length);
  });

  it("filters accurately by search query across English and Thai", () => {
    const keplerSearch = filterSimulations(SIMULATION_ITEMS, "all", "kepler");
    assert.ok(keplerSearch.length >= 1);
    assert.ok(
      keplerSearch.some((item) => item.title.includes("Kepler") || item.description.includes("Kepler"))
    );

    const thaiSearch = filterSimulations(SIMULATION_ITEMS, "all", "สุริยะ");
    assert.ok(thaiSearch.length >= 1);
    assert.ok(
      thaiSearch.some((item) => item.thaiTitle.includes("สุริยะ") || item.thaiDescription.includes("สุริยะ"))
    );
  });
});
