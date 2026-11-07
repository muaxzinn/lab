"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  RotateCcw,
  Play,
  Pause,
  Dna,
} from "lucide-react";
import { disposeThreeScene } from "@/lib/three-cleanup";

interface Organelle3D {
  id: string;
  name: string;
  thaiName: string;
  color: string;
  category: "animal_and_plant" | "plant_only" | "animal_only";
  function: string;
  thaiFunction: string;
  membraneCount: 0 | 1 | 2;
  keyExamFact: string;
}

const ORGANELLES_3D: Organelle3D[] = [
  {
    id: "nucleus",
    name: "Nucleus & Nucleolus",
    thaiName: "นิวเคลียสและนิวคลีโอลัส",
    color: "#8B5CF6", // Purple
    category: "animal_and_plant",
    function: "Stores genomic DNA, regulates gene transcription, and synthesizes rRNA subunits inside the nucleolus.",
    thaiFunction: "ศูนย์กลางควบคุมการทำงานของเซลล์ บรรจุสารพันธุกรรม DNA ควบคุมการแสดงออกของยีน และสร้างไรโบโซมที่นิวคลีโอลัส",
    membraneCount: 2,
    keyExamFact: "มีเยื่อหุ้ม 2 ชั้น (Nuclear envelope) ที่มีรูนิวเคลียร์พอร์ (Nuclear pore) สำหรับส่งออก mRNA",
  },
  {
    id: "mitochondria",
    name: "Mitochondria",
    thaiName: "ไมโทคอนเดรีย",
    color: "#F97316", // Orange
    category: "animal_and_plant",
    function: "Powerhouse of the cell. Generates ~30-32 ATP per glucose via citric acid cycle and oxidative phosphorylation.",
    thaiFunction: "โรงงานผลิตพลังงานของเซลล์ ผลิต ATP ผ่านวัฏจักรเครบส์และลูกโซ่ถ่ายทอดอิเล็กตรอน (Oxidative phosphorylation)",
    membraneCount: 2,
    keyExamFact: "เยื่อชั้นในพับทบเป็น คริสตี (Cristae) เพื่อเพิ่มพื้นที่ผิว มี DNA และไรโบโซม 70S ของตนเอง (Endosymbiosis)",
  },
  {
    id: "chloroplast",
    name: "Chloroplast",
    thaiName: "คลอโรพลาสต์",
    color: "#10B981", // Green
    category: "plant_only",
    function: "Site of photosynthesis. Converts solar photons, water, and CO2 into glucose and oxygen gas.",
    thaiFunction: "แหล่งสังเคราะห์ด้วยแสง เปลี่ยนพลังงานแสง น้ำ และ CO₂ เป็นกลูโคสและก๊าซออกซิเจน",
    membraneCount: 2,
    keyExamFact: "มีเยื่อหุ้ม 2 ชั้น ภายในมีถุงไทลาคอยด์เรียงซ้อนกันเป็น กรานุม (Granum) และของเหลวสโตรมา (Stroma)",
  },
  {
    id: "rough-er",
    name: "Rough Endoplasmic Reticulum (RER)",
    thaiName: "ร่างแหเอนโดพลาซึมแบบขรุขระ",
    color: "#EC4899", // Pink
    category: "animal_and_plant",
    function: "Network of membranes studded with 80S ribosomes for synthesising export proteins and membrane receptors.",
    thaiFunction: "ร่างแหเยื่อที่มีไรโบโซม 80S เกาะติด ทำหน้าที่สังเคราะห์โปรตีนสำหรับส่งออกนอกเซลล์และโปรตีนเยื่อหุ้ม",
    membraneCount: 1,
    keyExamFact: "มีไรโบโซมเกาะอยู่ภายนอก เชื่อมต่อกับเยื่อหุ้มนิวเคลียสชั้นนอก ส่งโปรตีนไปยังกอลจิบอดีผ่าน Transport vesicle",
  },
  {
    id: "smooth-er",
    name: "Smooth Endoplasmic Reticulum (SER)",
    thaiName: "ร่างแหเอนโดพลาซึมแบบเรียบ",
    color: "#06B6D4", // Cyan
    category: "animal_and_plant",
    function: "Synthesizes lipids, phospholipids, steroid hormones, and detoxifies xenobiotics and drugs in hepatocytes.",
    thaiFunction: "สังเคราะห์ไขมัน สเตียรอยด์ฮอร์โมน ฟอสโฟลิพิด และกำจัดสารพิษ/ยาในเซลล์ตับ รวมถึงกักเก็บแคลเซียม (Ca²⁺)",
    membraneCount: 1,
    keyExamFact: "ไม่มีไรโบโซมเกาะ พบมากในเซลล์ตับ ต่อมหมวกไตชั้นนอก และเซลล์กล้ามเนื้อ (Sarcoplasmic reticulum)",
  },
  {
    id: "golgi",
    name: "Golgi Apparatus",
    thaiName: "กอลจิบอดี (กอลจิคอมเพล็กซ์)",
    color: "#FBBF24", // Amber
    category: "animal_and_plant",
    function: "Modifies, sorts, packages, and tags proteins with carbohydrates (glycosylation) for secretory exocytosis.",
    thaiFunction: "ปรับแต่ง เติมน้ำตาล (Glycosylation) จัดเรียง และบรรจุโปรตีนลงถุงเวสิเคิลเพื่อส่งออกนอกเซลล์ หรือสร้างไลโซโซม",
    membraneCount: 1,
    keyExamFact: "มีลักษณะเป็นถุงแบนซ้อนกันเรียกว่า ซิสเทอร์นา (Cisterna) ด้านรับเรียก cis-face ด้านส่งออกเรียก trans-face",
  },
  {
    id: "lysosome",
    name: "Lysosome",
    thaiName: "ไลโซโซม",
    color: "#EF4444", // Red
    category: "animal_only",
    function: "Digestive organelle packed with ~50 acid hydrolases (pH ~4.5-5.0) for autophagy and phagocytosis.",
    thaiFunction: "ย่อยสลายโมเลกุลชีวภาพและออร์แกเนลล์ที่เสื่อมสภาพ (Autophagy) บรรจุเอนไซม์ไฮโดรเลสที่ทำงานได้ดีในภาวะกรด",
    membraneCount: 1,
    keyExamFact: "พบเด่นชัดในเซลล์สัตว์โดยเฉพาะเม็ดเลือดขาว ทำลายสิ่งแปลกปลอม หากเซลล์แตกจะเกิด Autolysis",
  },
  {
    id: "ribosome",
    name: "Ribosomes (80S)",
    thaiName: "ไรโบโซม (80S)",
    color: "#E2E8F0", // Slate
    category: "animal_and_plant",
    function: "Molecular machines catalyzing mRNA translation and peptide bond synthesis. Composed of rRNA + proteins.",
    thaiFunction: "เครื่องจักรโมเลกุลสังเคราะห์โปรตีน ทำหน้าที่แปลรหัสพันธุกรรม mRNA ประกอบด้วยหน่วยย่อย 60S และ 40S",
    membraneCount: 0,
    keyExamFact: "เป็นออร์แกเนลล์ที่ไม่มีเยื่อหุ้ม (Non-membrane bound) ไรโบโซมอิสระสร้างโปรตีนใช้ภายในไซโทพลาซึม",
  },
];

export function CellViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellType, setCellType] = useState<"animal" | "plant">("animal");
  const [selectedOrganelleId, setSelectedOrganelleId] = useState<string>("nucleus");
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  const isAutoRotatingRef = useRef<boolean>(isAutoRotating);
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cellGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const currentOrganelle =
    ORGANELLES_3D.find((o) => o.id === selectedOrganelleId) || ORGANELLES_3D[0];

  // Build 3D cell model with cutaway membrane
  const buildCellModel = useCallback((type: "animal" | "plant") => {
    if (!cellGroupRef.current) return;

    // Clear existing children and recursively dispose all geometries/materials
    const geometriesToDispose = new Set<THREE.BufferGeometry>();
    const materialsToDispose = new Set<THREE.Material>();
    cellGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.Line) {
        if (child.geometry) geometriesToDispose.add(child.geometry);
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach((m) => materialsToDispose.add(m));
          else materialsToDispose.add(child.material);
        }
      }
    });
    geometriesToDispose.forEach((g) => g.dispose());
    materialsToDispose.forEach((m) => m.dispose());
    cellGroupRef.current.clear();

    const group = cellGroupRef.current;

    // 1. Cutaway Outer Cell Membrane (Half sphere bowl)
    const membraneGeom = new THREE.SphereGeometry(
      3.2,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.65 // Cutaway revealing interior
    );
    const membraneMat = new THREE.MeshStandardMaterial({
      color: type === "plant" ? 0x15803d : 0x0284c7,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      roughness: 0.4,
    });
    const membrane = new THREE.Mesh(membraneGeom, membraneMat);
    membrane.rotation.x = Math.PI * 0.5;
    group.add(membrane);

    // Plant Cell Wall (outer rigid polygon ring)
    if (type === "plant") {
      const wallGeom = new THREE.TorusGeometry(3.35, 0.15, 16, 32);
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x14532d,
        roughness: 0.8,
      });
      const wall = new THREE.Mesh(wallGeom, wallMat);
      wall.rotation.x = Math.PI / 2;
      group.add(wall);
    }

    // 2. Nucleus (Large central sphere)
    const nucleusGeom = new THREE.SphereGeometry(1.0, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.3,
      metalness: 0.2,
    });
    const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
    nucleus.position.set(-0.2, 0, 0);
    nucleus.userData = { organelleId: "nucleus" };
    group.add(nucleus);

    // Nucleolus inside nucleus
    const nucleolusGeom = new THREE.SphereGeometry(0.35, 20, 20);
    const nucleolusMat = new THREE.MeshStandardMaterial({ color: 0x6d28d9 });
    const nucleolus = new THREE.Mesh(nucleolusGeom, nucleolusMat);
    nucleolus.position.set(0.1, 0.1, 0.4);
    nucleolus.userData = { organelleId: "nucleus" };
    nucleus.add(nucleolus);

    // 3. Mitochondria (2 or 3 capsules with cristae ridges)
    const mitoPositions: [number, number, number][] = [
      [1.6, 0.4, 0.8],
      [-1.8, 0.6, -0.6],
      [0.6, -1.2, 1.2],
    ];

    const mitoGeom = new THREE.CapsuleGeometry(0.3, 0.6, 12, 16);
    const mitoMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.5 });

    mitoPositions.forEach((pos, idx) => {
      const mito = new THREE.Mesh(mitoGeom, mitoMat);
      mito.position.set(...pos);
      mito.rotation.set(0.4 * idx, 0.8 * idx, 0.5 * idx);
      mito.userData = { organelleId: "mitochondria" };
      group.add(mito);
    });

    // 4. Chloroplast (Only in plant cells)
    if (type === "plant") {
      const chloroPositions: [number, number, number][] = [
        [1.8, -0.5, -0.8],
        [-1.4, -0.8, 1.2],
        [0.2, 1.6, 0.6],
      ];
      const chloroGeom = new THREE.SphereGeometry(0.45, 16, 16);
      chloroGeom.scale(1.4, 0.6, 0.9);
      const chloroMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });

      chloroPositions.forEach((pos) => {
        const chloro = new THREE.Mesh(chloroGeom, chloroMat);
        chloro.position.set(...pos);
        chloro.rotation.set(0.5, 0.3, 0.2);
        chloro.userData = { organelleId: "chloroplast" };
        group.add(chloro);
      });
    }

    // 5. Rough Endoplasmic Reticulum (Convoluted folded sheets around nucleus)
    const rerGeom = new THREE.TorusGeometry(1.35, 0.12, 8, 24, Math.PI * 1.2);
    const rerMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.5 });
    const rer = new THREE.Mesh(rerGeom, rerMat);
    rer.position.set(-0.2, 0.2, 0);
    rer.rotation.x = Math.PI / 3;
    rer.userData = { organelleId: "rough-er" };
    group.add(rer);

    // 6. Smooth Endoplasmic Reticulum (Tubular ring)
    const serGeom = new THREE.TorusGeometry(1.7, 0.09, 8, 24, Math.PI * 0.9);
    const serMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.4 });
    const ser = new THREE.Mesh(serGeom, serMat);
    ser.position.set(-0.4, -0.3, 0.2);
    ser.rotation.y = Math.PI / 4;
    ser.userData = { organelleId: "smooth-er" };
    group.add(ser);

    // 7. Golgi Apparatus (Stacked curved cisternae discs)
    const golgiMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 });
    [-0.15, 0, 0.15].forEach((offsetY, i) => {
      const discGeom = new THREE.CylinderGeometry(0.55 - i * 0.08, 0.6 - i * 0.08, 0.07, 16);
      const disc = new THREE.Mesh(discGeom, golgiMat);
      disc.position.set(1.5, -0.8 + offsetY, -0.5);
      disc.rotation.z = 0.3;
      disc.userData = { organelleId: "golgi" };
      group.add(disc);
    });

    // 8. Lysosomes (Small vesicles)
    if (type === "animal") {
      const lysoPositions: [number, number, number][] = [
        [-0.8, 1.4, 0.5],
        [1.2, 1.2, -0.8],
        [-1.6, -1.0, -0.4],
      ];
      const lysoGeom = new THREE.SphereGeometry(0.2, 16, 16);
      const lysoMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
      lysoPositions.forEach((pos) => {
        const lyso = new THREE.Mesh(lysoGeom, lysoMat);
        lyso.position.set(...pos);
        lyso.userData = { organelleId: "lysosome" };
        group.add(lyso);
      });
    }

    // 9. Ribosome granular dots scattered in cytosol
    const riboGeom = new THREE.BufferGeometry();
    const riboCount = 120;
    const riboPos = new Float32Array(riboCount * 3);
    for (let i = 0; i < riboCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.6;
      const r = 1.4 + Math.random() * 1.5;
      riboPos[i] = r * Math.sin(phi) * Math.cos(theta);
      riboPos[i + 1] = r * Math.cos(phi);
      riboPos[i + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    riboGeom.setAttribute("position", new THREE.BufferAttribute(riboPos, 3));
    const riboMat = new THREE.PointsMaterial({ color: 0xe2e8f0, size: 0.08 });
    const ribosomes = new THREE.Points(riboGeom, riboMat);
    ribosomes.userData = { organelleId: "ribosome" };
    group.add(ribosomes);
  }, []);

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
    camera.position.set(0, 3, 8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 20;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(6, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 0.5);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    // Cell Group
    const cellGroup = new THREE.Group();
    scene.add(cellGroup);
    cellGroupRef.current = cellGroup;

    // Raycaster for click interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (!cellGroupRef.current) return;

      const intersects = raycaster.intersectObjects(cellGroupRef.current.children, true);
      const hit = intersects.find((i) => i.object.userData?.organelleId);
      if (hit && hit.object.userData.organelleId) {
        setSelectedOrganelleId(hit.object.userData.organelleId);
      }
    };

    renderer.domElement.addEventListener("click", handleClick);

    // Resize Observer
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

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (cellGroupRef.current && isAutoRotatingRef.current) {
        cellGroupRef.current.rotation.y += 0.005;
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
  }, []);

  // Rebuild model when cellType changes
  useEffect(() => {
    buildCellModel(cellType);
  }, [cellType, buildCellModel]);

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 3, 8);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  return (
    <div className="space-y-4">
      {/* Top Cell Mode Switcher & Organelle Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Animal vs Plant Toggle */}
        <div className="flex items-center rounded-lg bg-neutral-900 border border-neutral-800 p-0.5">
          <button
            type="button"
            onClick={() => {
              setCellType("animal");
              if (selectedOrganelleId === "chloroplast") setSelectedOrganelleId("nucleus");
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition ${
              cellType === "animal"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-semibold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Animal Cell (เซลล์สัตว์)
          </button>
          <button
            type="button"
            onClick={() => setCellType("plant")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition ${
              cellType === "plant"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 font-semibold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Plant Cell (เซลล์พืช)
          </button>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoRotating((prev) => !prev)}
            aria-label={isAutoRotating ? "Pause rotation" : "Start rotation"}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-cyan-300 transition"
          >
            {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={resetCamera}
            aria-label="Reset camera view"
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-cyan-300 transition"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Organelle Select Pills */}
      <div className="flex flex-wrap gap-1.5">
        {ORGANELLES_3D.filter((o) => {
          if (cellType === "animal" && o.category === "plant_only") return false;
          if (cellType === "plant" && o.category === "animal_only") return false;
          return true;
        }).map((organelle) => {
          const isSelected = organelle.id === selectedOrganelleId;
          return (
            <button
              key={organelle.id}
              type="button"
              onClick={() => setSelectedOrganelleId(organelle.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/60 font-semibold"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: organelle.color }} />
              <span>{organelle.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Canvas & Organelle Telemetry Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Canvas */}
        <div className="lg:col-span-2 relative rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl">
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md text-xs font-mono text-neutral-300">
            <Dna className="h-3.5 w-3.5 text-purple-400" />
            <span>3D Cutaway Cytology Model</span>
            <span className="text-neutral-600">|</span>
            <span className="text-cyan-400">Click organelle to inspect</span>
          </div>

          <div className="absolute bottom-3 left-3 z-10 text-[11px] font-mono text-neutral-500">
            Cross-section cutaway reveals internal endomembrane system
          </div>

          <div ref={containerRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing" />
        </div>

        {/* Organelle Inspector Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-start justify-between pb-3 border-b border-neutral-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                Cytological Inspector
              </span>
              <h2 className="text-xl font-heading font-semibold text-neutral-100 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: currentOrganelle.color }} />
                {currentOrganelle.name}
              </h2>
              <span className="text-sm font-sans text-neutral-400 block mt-0.5">
                {currentOrganelle.thaiName}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 font-mono text-xs text-purple-300">
              {currentOrganelle.membraneCount === 0
                ? "0 Membranes"
                : currentOrganelle.membraneCount === 1
                ? "1 Membrane"
                : "2 Membranes"}
            </span>
          </div>

          {/* Biological Function Description */}
          <div className="space-y-2 text-xs font-sans">
            <div>
              <span className="font-mono text-[10px] uppercase text-neutral-500 block">
                Cellular Function (หน้าที่ทางชีววิทยา)
              </span>
              <p className="text-neutral-300 leading-relaxed mt-0.5">
                {currentOrganelle.thaiFunction}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-800/80">
              <span className="font-mono text-[10px] uppercase text-purple-400 block">
                Exam Cheat-Sheet Invariant (จุดเน้นข้อสอบ)
              </span>
              <p className="text-neutral-400 leading-relaxed mt-0.5 font-sans">
                {currentOrganelle.keyExamFact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
