import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  NAV_ROUTES,
  getNavRouteByPath,
  getBreadcrumbs,
  searchNavRoutes,
} from "./nav-data.ts";

describe("Layout & Navigation Architecture (App Router Multi-Route)", () => {
  it("contains exactly 8 distinct educational routes", () => {
    assert.equal(NAV_ROUTES.length, 8);
    const expectedPaths = ["/", "/math", "/physics", "/chemistry", "/biology", "/cs", "/thai", "/practice"];
    const actualPaths = NAV_ROUTES.map((r) => r.path);
    assert.deepEqual(actualPaths, expectedPaths);
  });

  it("verifies uniqueness of paths, labels, and Thai labels", () => {
    const paths = new Set(NAV_ROUTES.map((r) => r.path));
    const labels = new Set(NAV_ROUTES.map((r) => r.label));
    const thaiLabels = new Set(NAV_ROUTES.map((r) => r.thaiLabel));

    assert.equal(paths.size, NAV_ROUTES.length);
    assert.equal(labels.size, NAV_ROUTES.length);
    assert.equal(thaiLabels.size, NAV_ROUTES.length);
  });

  it("verifies all routes possess non-empty descriptions, icons, and keywords", () => {
    for (const route of NAV_ROUTES) {
      assert.ok(route.path.startsWith("/"), `Route path must start with /: ${route.path}`);
      assert.ok(route.label.trim().length > 0, `Route label must not be empty: ${route.path}`);
      assert.ok(route.thaiLabel.trim().length > 0, `Route thaiLabel must not be empty: ${route.path}`);
      assert.ok(route.description.trim().length > 0, `Route description must not be empty: ${route.path}`);
      assert.ok(route.thaiDescription.trim().length > 0, `Route thaiDescription must not be empty: ${route.path}`);
      assert.ok(route.keywords.length > 0, `Route keywords must not be empty: ${route.path}`);
      assert.ok(typeof route.icon === "function" || typeof route.icon === "object", "Icon must be a valid component");
    }
  });

  it("resolves route metadata by path with trailing slash normalization and subroute fallback", () => {
    const mathRoute = getNavRouteByPath("/math");
    assert.ok(mathRoute);
    assert.equal(mathRoute.label, "Mathematics");
    assert.equal(mathRoute.badge, "Mafs 2D");

    const physicsTrailing = getNavRouteByPath("/physics/");
    assert.ok(physicsTrailing);
    assert.equal(physicsTrailing.label, "Physics Laboratory");
    assert.equal(physicsTrailing.badge, "Verlet");

    // Subroute prefix match
    const mathSubroute = getNavRouteByPath("/math/calculus");
    assert.ok(mathSubroute);
    assert.equal(mathSubroute.label, "Mathematics");

    const nonExistent = getNavRouteByPath("/non-existent");
    assert.equal(nonExistent, undefined);
  });

  it("computes breadcrumb hierarchy accurately for root, single-tier, and multi-tier nested modules", () => {
    const homeCrumbs = getBreadcrumbs("/");
    assert.equal(homeCrumbs.length, 1);
    assert.equal(homeCrumbs[0].label, "Platform Portal");
    assert.equal(homeCrumbs[0].isCurrent, true);

    const chemCrumbs = getBreadcrumbs("/chemistry");
    assert.equal(chemCrumbs.length, 2);
    assert.equal(chemCrumbs[0].label, "Platform Portal");
    assert.equal(chemCrumbs[0].isCurrent, false);
    assert.equal(chemCrumbs[1].label, "Chemistry Workstation");
    assert.equal(chemCrumbs[1].isCurrent, true);

    const thaiCrumbs = getBreadcrumbs("/thai/");
    assert.equal(thaiCrumbs.length, 2);
    assert.equal(thaiCrumbs[1].label, "Thai Phonology Studio");

    // Multi-tier subroute breadcrumb hierarchy
    const nestedCrumbs = getBreadcrumbs("/math/calculus");
    assert.equal(nestedCrumbs.length, 3);
    assert.equal(nestedCrumbs[0].label, "Platform Portal");
    assert.equal(nestedCrumbs[0].isCurrent, false);
    assert.equal(nestedCrumbs[1].label, "Mathematics");
    assert.equal(nestedCrumbs[1].path, "/math");
    assert.equal(nestedCrumbs[1].isCurrent, false);
    assert.equal(nestedCrumbs[2].label, "calculus");
    assert.equal(nestedCrumbs[2].path, "/math/calculus");
    assert.equal(nestedCrumbs[2].isCurrent, true);
  });

  it("filters routes via multi-criteria search (English, Thai, and keywords)", () => {
    const allRoutes = searchNavRoutes("");
    assert.equal(allRoutes.length, 8);

    const mathSearch = searchNavRoutes("math");
    assert.ok(mathSearch.some((r) => r.path === "/math"));

    const csSearch = searchNavRoutes("boolean");
    assert.ok(csSearch.some((r) => r.path === "/cs"));

    const thaiSearch = searchNavRoutes("ไตรยางศ์");
    assert.equal(thaiSearch.length, 1);
    assert.equal(thaiSearch[0].path, "/thai");

    const periodicSearch = searchNavRoutes("periodic table");
    assert.equal(periodicSearch.length, 1);
    assert.equal(periodicSearch[0].path, "/chemistry");

    const cellSearch = searchNavRoutes("organelle");
    assert.equal(cellSearch.length, 1);
    assert.equal(cellSearch[0].path, "/biology");

    const emptyResult = searchNavRoutes("xyz-nonexistent-123");
    assert.equal(emptyResult.length, 0);
  });
});
