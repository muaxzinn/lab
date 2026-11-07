import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import manifest from "../app/manifest.ts";

describe("PWA, Web App Manifest & Service Worker Offline Suite (Phase 10)", () => {
  const rootDir = process.cwd();

  describe("Web App Manifest Validation (src/app/manifest.ts)", () => {
    it("generates a valid Next.js App Router Web App Manifest", () => {
      const manifestData = manifest();
      assert.ok(manifestData, "Manifest object should be defined");
      assert.equal(manifestData.name, "Interactive Learning Platform");
      assert.equal(manifestData.short_name, "InteractiveLab");
      assert.equal(manifestData.display, "standalone");
      assert.equal(manifestData.theme_color, "#070b16");
      assert.equal(manifestData.background_color, "#070b16");
      assert.equal(manifestData.orientation, "any");
      assert.equal(manifestData.start_url, "/");
      assert.equal(manifestData.lang, "th-TH");
      assert.equal(manifestData.dir, "ltr");
    });

    it("specifies correct categories and descriptions", () => {
      const manifestData = manifest();
      assert.ok(Array.isArray(manifestData.categories));
      assert.ok(manifestData.categories.includes("education"));
      assert.ok(manifestData.categories.includes("science"));
      assert.ok(manifestData.categories.includes("math"));
      assert.ok(
        typeof manifestData.description === "string" &&
          manifestData.description.length > 20
      );
    });

    it("defines high-resolution responsive vector icons including maskable", () => {
      const manifestData = manifest();
      assert.ok(Array.isArray(manifestData.icons));
      assert.ok(manifestData.icons.length >= 3);

      const icon192 = manifestData.icons.find((i) => i.sizes === "192x192");
      assert.ok(icon192, "Must contain 192x192 icon");
      assert.equal(icon192.src, "/icons/icon-192.svg");
      assert.equal(icon192.type, "image/svg+xml");

      const icon512 = manifestData.icons.find(
        (i) => i.sizes === "512x512" && (i.purpose === "any" || !i.purpose)
      );
      assert.ok(icon512, "Must contain standard 512x512 icon");
      assert.equal(icon512.src, "/icons/icon-512.svg");

      const iconMaskable = manifestData.icons.find(
        (i) => i.purpose === "maskable"
      );
      assert.ok(iconMaskable, "Must contain maskable icon");
      assert.equal(iconMaskable.src, "/icons/icon-maskable.svg");
    });
  });

  describe("Public Static Manifest JSON (public/manifest.json)", () => {
    it("mirrors manifest.ts specification for external crawler and browser compatibility", () => {
      const jsonPath = path.join(rootDir, "public", "manifest.json");
      assert.ok(fs.existsSync(jsonPath), "public/manifest.json must exist");

      const rawContent = fs.readFileSync(jsonPath, "utf-8");
      const parsed = JSON.parse(rawContent);

      assert.equal(parsed.name, "Interactive Learning Platform");
      assert.equal(parsed.short_name, "InteractiveLab");
      assert.equal(parsed.display, "standalone");
      assert.equal(parsed.theme_color, "#070b16");
      assert.equal(parsed.background_color, "#070b16");
      assert.equal(parsed.orientation, "any");
      assert.ok(Array.isArray(parsed.icons));
      assert.equal(parsed.icons.length, 3);
    });
  });

  describe("Offline Fallback Page (public/offline.html)", () => {
    const offlinePath = path.join(rootDir, "public", "offline.html");

    it("exists and is self-contained without external CSS dependencies", () => {
      assert.ok(fs.existsSync(offlinePath), "public/offline.html must exist");
      const content = fs.readFileSync(offlinePath, "utf-8");
      assert.ok(content.startsWith("<!DOCTYPE html>"));
      assert.ok(content.includes('<html lang="th"'));
      assert.ok(content.includes("#070b16"));
      assert.ok(content.includes("<style>"));
    });

    it("provides reload trigger and lists cached educational workbenches", () => {
      const content = fs.readFileSync(offlinePath, "utf-8");
      assert.ok(content.includes("window.location.reload()"));
      assert.ok(content.includes("โหมดออฟไลน์ (Offline Mode)"));
      assert.ok(content.includes("คณิตศาสตร์ (Math)"));
      assert.ok(content.includes("ฟิสิกส์ & วงจร (Physics)"));
      assert.ok(content.includes("ตารางธาตุ & สมการ (Chemistry)"));
      assert.ok(content.includes("ชีววิทยาเซลล์ (Biology)"));
      assert.ok(content.includes("ตรรกศาสตร์ (CS Logic)"));
      assert.ok(content.includes("ภาษาไทย ไตรยางศ์ (Thai)"));
      assert.ok(content.includes("คลังแบบฝึกหัด (Practice)"));
    });

    it("adheres strictly to the Anti-Emoji Mandate", () => {
      const content = fs.readFileSync(offlinePath, "utf-8");
      // Verify no cartoon emoji Unicode ranges in the rendered HTML
      const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
      assert.equal(
        emojiRegex.test(content),
        false,
        "public/offline.html must not contain decorative cartoon emojis"
      );
    });
  });

  describe("Lightweight Service Worker (public/sw.js)", () => {
    const swPath = path.join(rootDir, "public", "sw.js");

    it("exists and defines standard cache lifecycle events", () => {
      assert.ok(fs.existsSync(swPath), "public/sw.js must exist");
      const swCode = fs.readFileSync(swPath, "utf-8");
      assert.ok(swCode.includes("addEventListener('install'"));
      assert.ok(swCode.includes("addEventListener('activate'"));
      assert.ok(swCode.includes("addEventListener('fetch'"));
    });

    it("precaches all 8 core educational routes and application shell assets", () => {
      const swCode = fs.readFileSync(swPath, "utf-8");
      const requiredPrecacheUrls = [
        "'/'",
        "'/math'",
        "'/physics'",
        "'/chemistry'",
        "'/biology'",
        "'/cs'",
        "'/thai'",
        "'/practice'",
        "'/manifest.webmanifest'",
        "'/manifest.json'",
        "'/offline.html'",
        "'/favicon.ico'",
        "'/icons/icon-192.svg'",
        "'/icons/icon-512.svg'",
        "'/icons/icon-maskable.svg'",
      ];

      for (const route of requiredPrecacheUrls) {
        assert.ok(
          swCode.includes(route),
          `Service Worker must precache shell asset: ${route}`
        );
      }
    });

    it("implements skipWaiting and clients.claim for seamless version rollout", () => {
      const swCode = fs.readFileSync(swPath, "utf-8");
      assert.ok(swCode.includes("self.skipWaiting()"));
      assert.ok(swCode.includes("self.clients.claim()"));
    });

    it("implements network-first navigation with offline fallback handling", () => {
      const swCode = fs.readFileSync(swPath, "utf-8");
      assert.ok(swCode.includes("request.mode === 'navigate'"));
      assert.ok(swCode.includes("caches.match('/offline.html')"));
      assert.ok(swCode.includes("caches.delete(key)"));
    });
  });

  describe("PWA Vector SVG Icons (public/icons/)", () => {
    const icons = ["icon-192.svg", "icon-512.svg", "icon-maskable.svg"];

    for (const iconFile of icons) {
      it(`verifies integrity and dark theme styling for ${iconFile}`, () => {
        const iconPath = path.join(rootDir, "public", "icons", iconFile);
        assert.ok(fs.existsSync(iconPath), `${iconFile} must exist`);

        const svgContent = fs.readFileSync(iconPath, "utf-8");
        assert.ok(svgContent.includes('xmlns="http://www.w3.org/2000/svg"'));
        assert.ok(svgContent.includes("#070b16"));
        assert.ok(
          svgContent.includes("#00f0ff") || svgContent.includes("#2ef2a0")
        );
      });
    }
  });
});
