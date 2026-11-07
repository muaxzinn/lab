"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  RotateCcw,
  Play,
  Pause,
  Info,
} from "lucide-react";
import { MOLECULES_3D, type Molecule3D, type Atom3D } from "@/lib/molecular-data-3d";
import { disposeThreeScene } from "@/lib/three-cleanup";

type RenderingMode = "ball-and-stick" | "space-filling";

export function MolecularViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>("water");
  const [renderMode, setRenderMode] = useState<RenderingMode>("ball-and-stick");
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [selectedAtom, setSelectedAtom] = useState<{ atom: Atom3D; index: number } | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const currentMolecule = MOLECULES_3D.find((m) => m.id === selectedMoleculeId) || MOLECULES_3D[0];

  // Re-build molecule mesh group when molecule or renderMode changes
  const buildMoleculeMesh = useCallback((molecule: Molecule3D, mode: RenderingMode) => {
    if (!moleculeGroupRef.current) return;

    // Clear existing children in group
    while (moleculeGroupRef.current.children.length > 0) {
      const child = moleculeGroupRef.current.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      moleculeGroupRef.current.remove(child);
    }

    const sphereGeomCache = new Map<number, THREE.SphereGeometry>();
    const getSphereGeom = (radius: number) => {
      const key = Math.round(radius * 100);
      if (!sphereGeomCache.has(key)) {
        sphereGeomCache.set(key, new THREE.SphereGeometry(radius, 32, 32));
      }
      return sphereGeomCache.get(key)!;
    };

    // Build Atoms
    molecule.atoms.forEach((atom, index) => {
      const radius = mode === "space-filling" ? atom.vdwRadius * 0.8 : atom.covalentRadius * 0.65;
      const geom = getSphereGeom(radius);
      const material = new THREE.MeshStandardMaterial({
        color: atom.color,
        roughness: 0.25,
        metalness: 0.1,
      });

      const sphere = new THREE.Mesh(geom, material);
      sphere.position.set(...atom.position);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.userData = { atomIndex: index, atom };

      moleculeGroupRef.current?.add(sphere);
    });

    // Build Bonds (only in Ball-and-Stick mode)
    if (mode === "ball-and-stick") {
      const bondRadius = 0.08;
      const cylinderGeom = new THREE.CylinderGeometry(bondRadius, bondRadius, 1, 16);
      const bondMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.4,
        metalness: 0.2,
      });

      molecule.bonds.forEach((bond) => {
        const atom1 = molecule.atoms[bond.atom1];
        const atom2 = molecule.atoms[bond.atom2];
        if (!atom1 || !atom2) return;

        const p1 = new THREE.Vector3(...atom1.position);
        const p2 = new THREE.Vector3(...atom2.position);

        const distance = p1.distanceTo(p2);
        const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

        const cylinder = new THREE.Mesh(cylinderGeom, bondMaterial);
        cylinder.scale.set(1, distance, 1);
        cylinder.position.copy(midpoint);

        // Orient cylinder along bond vector
        const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
        const orientation = new THREE.Quaternion();
        orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        cylinder.quaternion.copy(orientation);

        moleculeGroupRef.current?.add(cylinder);
      });
    }

    // Compute bounding sphere and center molecule
    const box = new THREE.Box3().setFromObject(moleculeGroupRef.current);
    const center = new THREE.Vector3();
    box.getCenter(center);
    moleculeGroupRef.current.position.sub(center);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060913);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    // Renderer with Anti-Aliasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 25;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 0.6);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Subtle laboratory grid floor
    const grid = new THREE.GridHelper(12, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -2.8;
    scene.add(grid);

    // Molecule group
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // Raycaster for click selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (!moleculeGroupRef.current) return;

      const intersects = raycaster.intersectObjects(moleculeGroupRef.current.children, true);
      const hit = intersects.find((i) => i.object.userData?.atom);
      if (hit && hit.object.userData.atom) {
        setSelectedAtom({
          atom: hit.object.userData.atom,
          index: hit.object.userData.atomIndex,
        });
      }
    };

    renderer.domElement.addEventListener("click", handleClick);

    // Handle container resize
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (moleculeGroupRef.current && isAutoRotating) {
        moleculeGroupRef.current.rotation.y += 0.006;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("click", handleClick);
      controls.dispose();
      disposeThreeScene(scene, renderer);
    };
  }, [isAutoRotating]);

  // Rebuild mesh when molecule or mode changes
  useEffect(() => {
    buildMoleculeMesh(currentMolecule, renderMode);
    setSelectedAtom(null);
  }, [currentMolecule, renderMode, buildMoleculeMesh]);

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 0, 7);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  return (
    <div className="space-y-4">
      {/* Molecule Selection Pills */}
      <div className="flex flex-wrap gap-2">
        {MOLECULES_3D.map((mol) => {
          const isSelected = mol.id === selectedMoleculeId;
          return (
            <button
              key={mol.id}
              type="button"
              onClick={() => setSelectedMoleculeId(mol.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                isSelected
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm font-semibold"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
              }`}
            >
              <span>{mol.name}</span>
              <span className="text-neutral-500 font-sans text-[11px]">({mol.thaiName})</span>
            </button>
          );
        })}
      </div>

      {/* Main 3D Canvas Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* WebGL Canvas Viewport */}
        <div className="lg:col-span-2 relative rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl">
          {/* Controls HUD */}
          <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
            {/* Ball & Stick vs Space Filling Toggle */}
            <div className="flex items-center rounded-lg bg-neutral-900/90 border border-neutral-800 p-0.5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setRenderMode("ball-and-stick")}
                className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                  renderMode === "ball-and-stick"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Ball & Stick
              </button>
              <button
                type="button"
                onClick={() => setRenderMode("space-filling")}
                className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                  renderMode === "space-filling"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Space-Filling (vdW)
              </button>
            </div>

            {/* Auto Rotate Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoRotating((prev) => !prev)}
              aria-label={isAutoRotating ? "Pause auto-rotation" : "Start auto-rotation"}
              className="p-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-cyan-300 backdrop-blur-md transition"
            >
              {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            {/* Reset Camera Button */}
            <button
              type="button"
              onClick={resetCamera}
              aria-label="Reset camera angle"
              className="p-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-cyan-300 backdrop-blur-md transition"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* CPK Color Legend Bar */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md text-[11px] font-mono text-neutral-400">
            <span className="text-neutral-500">CPK Standard:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white border border-neutral-700" /> H (Hydrogen)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-800 border border-neutral-600" /> C (Carbon)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> O (Oxygen)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> N (Nitrogen)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-600" /> P (Phosphorus)
              </span>
            </div>
            <span className="text-cyan-400 text-[10px]">Drag to rotate • Scroll to zoom</span>
          </div>

          {/* Three.js Container */}
          <div ref={containerRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing" />
        </div>

        {/* Molecular Data Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-start justify-between pb-3 border-b border-neutral-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Molecular Blueprint
              </span>
              <h2 className="text-xl font-heading font-semibold text-neutral-100 flex items-center gap-2">
                {currentMolecule.name}
                <span className="text-sm font-sans text-neutral-400 font-normal">
                  ({currentMolecule.thaiName})
                </span>
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 font-mono text-sm text-cyan-300 font-semibold">
              {currentMolecule.formula}
            </span>
          </div>

          {/* Numerical Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">Molar Mass</span>
              <span className="text-neutral-200 font-semibold text-sm">
                {currentMolecule.molarMass.toFixed(3)}
              </span>
              <span className="text-neutral-500 ml-1">g/mol</span>
            </div>

            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">Boiling / State</span>
              <span className="text-neutral-200 font-semibold">{currentMolecule.boilingPoint}</span>
            </div>

            <div className="col-span-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">VSEPR Geometry</span>
              <span className="text-cyan-300 font-medium">{currentMolecule.geometry}</span>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-2 text-xs font-sans">
            <div>
              <span className="font-mono text-[10px] uppercase text-neutral-500 block">
                Chemical Overview
              </span>
              <p className="text-neutral-300 leading-relaxed mt-0.5">
                {currentMolecule.thaiDescription}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-800/80">
              <span className="font-mono text-[10px] uppercase text-emerald-400 block">
                Biological & Industrial Significance
              </span>
              <p className="text-neutral-400 leading-relaxed mt-0.5">
                {currentMolecule.thaiSignificance}
              </p>
            </div>
          </div>

          {/* Atom Inspector on Click */}
          {selectedAtom && (
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-xs font-mono space-y-1">
              <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                Selected Atom: {selectedAtom.atom.element} (Index #{selectedAtom.index})
              </span>
              <div className="text-neutral-400 text-[11px] grid grid-cols-2 gap-1 pt-1">
                <span>Covalent Radius: {selectedAtom.atom.covalentRadius} Å</span>
                <span>vdW Radius: {selectedAtom.atom.vdwRadius} Å</span>
                <span className="col-span-2">
                  Position: [{selectedAtom.atom.position.map((v) => v.toFixed(2)).join(", ")}] Å
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
