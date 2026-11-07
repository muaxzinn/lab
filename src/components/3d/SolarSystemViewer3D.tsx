"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  RotateCcw,
  Play,
  Pause,
  Compass,
} from "lucide-react";
import { disposeThreeScene } from "@/lib/three-cleanup";
import { PLANETS, SUN_DATA } from "@/lib/astronomy-data";

export function SolarSystemViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Mesh refs for animation
  const planetMeshesRef = useRef<Map<string, { mesh: THREE.Mesh; orbitPivot: THREE.Group; moonPivot?: THREE.Group }>>(new Map());

  const currentPlanet = PLANETS.find((p) => p.id === selectedPlanetId) || PLANETS[2];

  // Focus camera on selected planet or center
  const focusOnPlanet = useCallback((planetId: string) => {
    setSelectedPlanetId(planetId);
    if (!controlsRef.current || !cameraRef.current) return;

    if (planetId === "sun") {
      controlsRef.current.target.set(0, 0, 0);
      cameraRef.current.position.set(0, 15, 25);
      controlsRef.current.update();
      return;
    }

    const targetPlanet = PLANETS.find((p) => p.id === planetId);
    if (targetPlanet) {
      // Zoom toward orbital distance
      cameraRef.current.position.set(targetPlanet.distance * 0.7, 3, targetPlanet.distance * 0.7);
      controlsRef.current.target.set(targetPlanet.distance, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04060d);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 16, 26);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 120;
    controls.minDistance = 3;
    controlsRef.current = controls;

    // Ambient Starfield Light
    const ambientLight = new THREE.AmbientLight(0x222233, 0.4);
    scene.add(ambientLight);

    // Central Sun Glowing PointLight
    const sunLight = new THREE.PointLight(0xfff8e7, 3.0, 150, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Sun Mesh
    const sunGeom = new THREE.SphereGeometry(SUN_DATA.radius, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(SUN_DATA.color),
    });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    scene.add(sunMesh);

    // Sun Corona Glow Atmosphere
    const coronaGeom = new THREE.SphereGeometry(SUN_DATA.radius * 1.15, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(SUN_DATA.emissiveColor),
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
    });
    const coronaMesh = new THREE.Mesh(coronaGeom, coronaMat);
    scene.add(coronaMesh);

    // Distant Starfield Background Particles
    const starGeom = new THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 160;
      starPositions[i + 1] = (Math.random() - 0.5) * 160;
      starPositions[i + 2] = (Math.random() - 0.5) * 160;
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x8899aa, size: 0.6 });
    const starfield = new THREE.Points(starGeom, starMat);
    scene.add(starfield);

    // Build Planets, Orbit Trails, and Moons
    planetMeshesRef.current.clear();

    PLANETS.forEach((planet) => {
      // Orbital Pivot Group for rotation
      const orbitPivot = new THREE.Group();
      scene.add(orbitPivot);

      // Orbital Trail (Ellipse in XZ plane)
      const trailPoints: THREE.Vector3[] = [];
      const segments = 96;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        trailPoints.push(new THREE.Vector3(Math.cos(theta) * planet.distance, 0, Math.sin(theta) * planet.distance));
      }
      const trailGeom = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMat = new THREE.LineBasicMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.6,
      });
      const trail = new THREE.LineLoop(trailGeom, trailMat);
      scene.add(trail);

      // Planet Mesh
      const planetGeom = new THREE.SphereGeometry(planet.radius, 24, 24);
      const planetMat = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.6,
        metalness: 0.1,
      });
      const planetMesh = new THREE.Mesh(planetGeom, planetMat);
      planetMesh.position.set(planet.distance, 0, 0);
      planetMesh.castShadow = true;
      orbitPivot.add(planetMesh);

      // Saturn Rings
      if (planet.hasRings) {
        const ringGeom = new THREE.RingGeometry(planet.radius * 1.4, planet.radius * 2.3, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xc8b27a,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI / 2.5;
        planetMesh.add(ringMesh);
      }

      // Earth's Moon
      let moonPivot: THREE.Group | undefined;
      if (planet.hasMoon) {
        moonPivot = new THREE.Group();
        planetMesh.add(moonPivot);

        const moonGeom = new THREE.SphereGeometry(planet.radius * 0.28, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.8 });
        const moonMesh = new THREE.Mesh(moonGeom, moonMat);
        moonMesh.position.set(planet.radius * 1.8, 0, 0);
        moonPivot.add(moonMesh);
      }

      planetMeshesRef.current.set(planet.id, { mesh: planetMesh, orbitPivot, moonPivot });
    });

    // Resize Observer
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (!isPaused) {
        // Base delta time scaled by speed
        const dt = 0.005 * speedMultiplier;

        // Orbit planets using Keplerian period ratios (T ~ r^(3/2))
        PLANETS.forEach((planet) => {
          const entry = planetMeshesRef.current.get(planet.id);
          if (!entry) return;

          // Orbital angular velocity proportional to 1 / sqrt(r^3)
          const orbitalSpeed = (2 * Math.PI) / (planet.orbitalPeriodDays / 365.25 * 20);
          entry.orbitPivot.rotation.y += orbitalSpeed * dt;

          // Axial rotation of the planet itself
          entry.mesh.rotation.y += 0.02 * speedMultiplier;

          // Moon orbit around Earth
          if (entry.moonPivot) {
            entry.moonPivot.rotation.y += 0.1 * speedMultiplier;
          }
        });

        // Sun axial rotation
        sunMesh.rotation.y += 0.003;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      controls.dispose();
      disposeThreeScene(scene, renderer);
    };
  }, [isPaused, speedMultiplier]);

  const resetView = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 16, 26);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
    setSelectedPlanetId("earth");
  };

  return (
    <div className="space-y-4">
      {/* Top Planet Navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => focusOnPlanet("sun")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-amber-950/40 border border-amber-800/80 text-amber-300 hover:bg-amber-900/60 transition"
          >
            Sun (ศูนย์กลาง)
          </button>
          {PLANETS.map((planet) => {
            const isSelected = planet.id === selectedPlanetId;
            return (
              <button
                key={planet.id}
                type="button"
                onClick={() => focusOnPlanet(planet.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-semibold"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: planet.color }} />
                <span>{planet.name}</span>
                <span className="text-[10px] text-neutral-500 font-sans hidden sm:inline">
                  ({planet.thaiName})
                </span>
              </button>
            );
          })}
        </div>

        {/* Playback Speed Controllers */}
        <div className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Play simulation" : "Pause simulation"}
            className="p-1 rounded text-neutral-300 hover:text-cyan-300"
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
          <span className="text-neutral-600">|</span>
          {[1, 5, 10, 50].map((mult) => (
            <button
              key={mult}
              type="button"
              onClick={() => setSpeedMultiplier(mult)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                speedMultiplier === mult
                  ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {mult}x
            </button>
          ))}
          <button
            type="button"
            onClick={resetView}
            aria-label="Reset camera"
            className="p-1 rounded text-neutral-400 hover:text-cyan-300 ml-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas & Planetary Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* WebGL Canvas */}
        <div className="lg:col-span-2 relative rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl">
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md text-xs font-mono text-neutral-300">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            <span>Keplerian Heliocentric Engine</span>
            <span className="text-neutral-600">|</span>
            <span className="text-emerald-400">{speedMultiplier}x Speed</span>
          </div>

          <div className="absolute bottom-3 left-3 z-10 text-[11px] font-mono text-neutral-500">
            Orbit paths rendered with semi-major axes • Drag to orbit • Scroll to zoom
          </div>

          <div ref={containerRef} className="w-full h-[480px] cursor-grab active:cursor-grabbing" />
        </div>

        {/* Planet Telemetry Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-start justify-between pb-3 border-b border-neutral-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Planetary Ephemeris
              </span>
              <h2 className="text-xl font-heading font-semibold text-neutral-100 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: currentPlanet.color }} />
                {currentPlanet.name}
                <span className="text-sm font-sans text-neutral-400 font-normal">
                  ({currentPlanet.thaiName})
                </span>
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-cyan-300">
              {currentPlanet.semiMajorAxisAU.toFixed(3)} AU
            </span>
          </div>

          {/* Physical Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">Orbital Period</span>
              <span className="text-neutral-200 font-semibold">
                {currentPlanet.orbitalPeriodDays.toLocaleString()}
              </span>
              <span className="text-neutral-500 ml-1">days</span>
            </div>

            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">Surface Gravity</span>
              <span className="text-neutral-200 font-semibold">{currentPlanet.gravityMps2}</span>
              <span className="text-neutral-500 ml-1">m/s²</span>
            </div>

            <div className="col-span-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">Earth Year Ratio</span>
              <span className="text-cyan-300 font-semibold">
                {(currentPlanet.orbitalPeriodDays / 365.25).toFixed(2)} × Earth Years
              </span>
            </div>
          </div>

          {/* Theoretical Description */}
          <div className="space-y-2 text-xs font-sans">
            <div>
              <span className="font-mono text-[10px] uppercase text-neutral-500 block">
                Astrophysical Summary
              </span>
              <p className="text-neutral-300 leading-relaxed mt-0.5">
                {currentPlanet.thaiDescription}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-800/80">
              <span className="font-mono text-[10px] uppercase text-emerald-400 block">
                Kepler&apos;s Third Law (T² ∝ a³)
              </span>
              <p className="text-neutral-400 leading-relaxed mt-0.5 font-mono text-[11px]">
                T = {currentPlanet.orbitalPeriodDays} d → a = {currentPlanet.semiMajorAxisAU} AU
                <br />
                T² / a³ ≈ 1.000 (Heliocentric invariant)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
