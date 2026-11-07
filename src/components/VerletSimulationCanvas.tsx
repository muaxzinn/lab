"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Activity,
  Sliders,
  Zap,
  Gauge,
  Compass,
} from "lucide-react";
import { clampDevicePixelRatio } from "@/lib/webgl-lifecycle";

type IntegratorType = "verlet" | "euler";

interface OrbitState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
}

export function VerletSimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Simulation Parameters
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [integrator, setIntegrator] = useState<IntegratorType>("verlet");
  const [centralMass, setCentralMass] = useState<number>(1000);
  const [planetMass, setPlanetMass] = useState<number>(1);
  const [GConstant] = useState<number>(1);
  const [timeStep, setTimeStep] = useState<number>(0.02);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(2);
  const [showTrails, setShowTrails] = useState<boolean>(true);

  // Initial conditions
  const initialDist = 160;
  const initialSpeed = Math.sqrt((GConstant * centralMass) / initialDist) * 1.05; // Slightly elliptical

  // Simulation numerical state
  const stateRef = useRef<OrbitState>({
    x: initialDist,
    y: 0,
    vx: 0,
    vy: initialSpeed,
    ax: 0,
    ay: 0,
  });

  const trailsRef = useRef<Array<{ x: number; y: number }>>([]);
  const initialEnergyRef = useRef<number>(-1);

  // Real-time telemetry exposed to React UI
  const [telemetry, setTelemetry] = useState<{
    distance: number;
    velocity: number;
    kineticEnergy: number;
    potentialEnergy: number;
    totalEnergy: number;
    energyErrorPercent: number;
    stepCount: number;
  }>({
    distance: initialDist,
    velocity: initialSpeed,
    kineticEnergy: 0,
    potentialEnergy: 0,
    totalEnergy: 0,
    energyErrorPercent: 0,
    stepCount: 0,
  });

  // Calculate gravitational acceleration at position (x, y)
  const computeAcceleration = useCallback(
    (x: number, y: number): { ax: number; ay: number } => {
      const r2 = x * x + y * y;
      const r = Math.sqrt(r2);
      const minR = 20; // Softening radius to prevent singularity
      if (r < minR) {
        const factor = -(GConstant * centralMass) / (minR * minR * minR);
        return { ax: factor * x, ay: factor * y };
      }
      const factor = -(GConstant * centralMass) / (r2 * r);
      return { ax: factor * x, ay: factor * y };
    },
    [GConstant, centralMass]
  );

  // Compute Hamiltonian Energy (T + U)
  const computeEnergy = useCallback(
    (s: OrbitState): { T: number; U: number; H: number } => {
      const v2 = s.vx * s.vx + s.vy * s.vy;
      const r = Math.sqrt(s.x * s.x + s.y * s.y);
      const T = 0.5 * planetMass * v2;
      const U = -(GConstant * centralMass * planetMass) / Math.max(r, 1);
      return { T, U, H: T + U };
    },
    [planetMass, GConstant, centralMass]
  );

  // Reset simulation to initial orbital state
  const handleReset = useCallback(() => {
    const v0 = Math.sqrt((GConstant * centralMass) / initialDist) * 1.05;
    const initialA = computeAcceleration(initialDist, 0);
    stateRef.current = {
      x: initialDist,
      y: 0,
      vx: 0,
      vy: v0,
      ax: initialA.ax,
      ay: initialA.ay,
    };
    trailsRef.current = [];
    const energies = computeEnergy(stateRef.current);
    initialEnergyRef.current = energies.H;

    setTelemetry({
      distance: initialDist,
      velocity: v0,
      kineticEnergy: energies.T,
      potentialEnergy: energies.U,
      totalEnergy: energies.H,
      energyErrorPercent: 0,
      stepCount: 0,
    });
  }, [GConstant, centralMass, initialDist, computeAcceleration, computeEnergy]);

  // Handle integrator switch
  const handleToggleIntegrator = (type: IntegratorType) => {
    setIntegrator(type);
    handleReset();
  };

  // Perform single physics step
  const stepPhysics = useCallback(
    (s: OrbitState, dt: number, method: IntegratorType): OrbitState => {
      if (method === "verlet") {
        // Velocity Verlet (Symplectic, O(dt^2) local error, bounded global energy)
        const nextX = s.x + s.vx * dt + 0.5 * s.ax * dt * dt;
        const nextY = s.y + s.vy * dt + 0.5 * s.ay * dt * dt;

        const nextA = computeAcceleration(nextX, nextY);

        const nextVx = s.vx + 0.5 * (s.ax + nextA.ax) * dt;
        const nextVy = s.vy + 0.5 * (s.ay + nextA.ay) * dt;

        return {
          x: nextX,
          y: nextY,
          vx: nextVx,
          vy: nextVy,
          ax: nextA.ax,
          ay: nextA.ay,
        };
      } else {
        // Explicit Euler (First-order non-symplectic; diverges rapidly)
        const nextX = s.x + s.vx * dt;
        const nextY = s.y + s.vy * dt;

        const nextVx = s.vx + s.ax * dt;
        const nextVy = s.vy + s.ay * dt;

        const nextA = computeAcceleration(nextX, nextY);

        return {
          x: nextX,
          y: nextY,
          vx: nextVx,
          vy: nextVy,
          ax: nextA.ax,
          ay: nextA.ay,
        };
      }
    },
    [computeAcceleration]
  );

  // Initialize initial acceleration & energy on mount
  useEffect(() => {
    const initialA = computeAcceleration(stateRef.current.x, stateRef.current.y);
    stateRef.current.ax = initialA.ax;
    stateRef.current.ay = initialA.ay;
    const initialE = computeEnergy(stateRef.current);
    initialEnergyRef.current = initialE.H;
  }, [computeAcceleration, computeEnergy]);

  // Main Animation & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stepsCounter = 0;

    const render = () => {
      const dpr = clampDevicePixelRatio(window.devicePixelRatio || 1, 2.0);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear Canvas with deep space gradient
      ctx.fillStyle = "#070b16";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Coordinate Grid Lines
      ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      // Orbital Range Rings
      ctx.strokeStyle = "rgba(30, 41, 59, 0.3)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 160, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.stroke();

      // Central Body (Sun / Star)
      const starGrad = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, 24);
      starGrad.addColorStop(0, "#fbbf24");
      starGrad.addColorStop(0.4, "#f59e0b");
      starGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = starGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Physics Iteration
      if (isRunning) {
        for (let i = 0; i < speedMultiplier; i++) {
          stateRef.current = stepPhysics(stateRef.current, timeStep, integrator);
          stepsCounter++;
        }

        // Record Trail Point
        if (showTrails) {
          trailsRef.current.push({ x: stateRef.current.x, y: stateRef.current.y });
          if (trailsRef.current.length > 400) {
            trailsRef.current.shift();
          }
        }
      }

      const s = stateRef.current;
      const px = centerX + s.x;
      const py = centerY + s.y;

      // Draw Orbit Trail
      if (showTrails && trailsRef.current.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle =
          integrator === "verlet"
            ? "rgba(46, 242, 160, 0.4)"
            : "rgba(244, 63, 94, 0.4)";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < trailsRef.current.length; i++) {
          const pt = trailsRef.current[i];
          const tx = centerX + pt.x;
          const ty = centerY + pt.y;
          if (i === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        }
        ctx.stroke();
      }

      // Draw Velocity Vector Arrow
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + s.vx * 30, py + s.vy * 30);
      ctx.stroke();

      // Draw Orbiting Planet
      const planetColor = integrator === "verlet" ? "#2ef2a0" : "#fb7185";
      ctx.fillStyle = planetColor;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Planet Glow
      const planetGlow = ctx.createRadialGradient(px, py, 2, px, py, 14);
      planetGlow.addColorStop(0, planetColor);
      planetGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = planetGlow;
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Telemetry update throttled every few frames
      if (stepsCounter % 4 === 0) {
        const energies = computeEnergy(s);
        const dist = Math.sqrt(s.x * s.x + s.y * s.y);
        const vel = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const initE = initialEnergyRef.current;
        const errPercent = initE !== 0 ? (Math.abs(energies.H - initE) / Math.abs(initE)) * 100 : 0;

        setTelemetry({
          distance: dist,
          velocity: vel,
          kineticEnergy: energies.T,
          potentialEnergy: energies.U,
          totalEnergy: energies.H,
          energyErrorPercent: errPercent,
          stepCount: stepsCounter,
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [
    isRunning,
    integrator,
    timeStep,
    speedMultiplier,
    showTrails,
    stepPhysics,
    computeEnergy,
  ]);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400">
            <Activity className="h-5 w-5 stroke-[1.75]" />
          </div>
          <div>
            <h2 className="text-base font-heading font-semibold text-neutral-100 flex items-center gap-2">
              Symplectic Orbit & Velocity Verlet Canvas
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                Symplectic O(dt²)
              </span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              การจำลองวงโคจรตามหลักกลศาสตร์ดาราศาสตร์ พร้อมการพิสูจน์การอนุรักษ์พลังงาน (Hamiltonian Conservation)
            </p>
          </div>
        </div>

        {/* Primary Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              isRunning
                ? "bg-amber-950/40 border border-amber-700/60 text-amber-300 hover:bg-amber-900/50"
                : "bg-emerald-950/40 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/50"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Resume
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-400" />
            Reset Orbit
          </button>
        </div>
      </div>

      {/* Integrator Comparison Toggle Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-neutral-400">Integrator Mode:</span>
          <div className="inline-flex rounded-md p-0.5 bg-neutral-900 border border-neutral-800">
            <button
              type="button"
              onClick={() => handleToggleIntegrator("verlet")}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                integrator === "verlet"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-700 font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Velocity Verlet (Symplectic)
            </button>
            <button
              type="button"
              onClick={() => handleToggleIntegrator("euler")}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                integrator === "euler"
                  ? "bg-rose-950 text-rose-300 border border-rose-700 font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Explicit Euler (Divergent)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showTrails}
              onChange={(e) => setShowTrails(e.target.checked)}
              className="accent-emerald-400 rounded"
            />
            <span>Show Orbit Trails</span>
          </label>
        </div>
      </div>

      {/* Main Canvas + Telemetry HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas Viewport */}
        <div className="lg:col-span-3 rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden relative min-h-[380px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-[380px] sm:h-[420px] block cursor-crosshair touch-none"
          />

          {/* Canvas Floating Overlay HUD */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Zap className="h-3 w-3" />
              {integrator === "verlet" ? "Symplectic Hamiltonian" : "Standard Euler"}
            </span>
            <span className="text-neutral-600">|</span>
            <span>Speed: {speedMultiplier}x</span>
            <span className="text-neutral-600">|</span>
            <span>Δt: {timeStep}s</span>
          </div>

          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center gap-2">
            <Compass className="h-3.5 w-3.5 text-neutral-500" />
            <span>Center: (0, 0) Mass={centralMass}</span>
          </div>
        </div>

        {/* Telemetry Sidebar */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-1.5 text-neutral-200">
                <Gauge className="h-3.5 w-3.5 text-cyan-400" />
                Live Hamiltonian Telemetry
              </span>
            </div>

            {/* Energy Error Gauge */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Energy Drift (ΔE/E₀):</span>
                <span
                  className={`font-semibold ${
                    telemetry.energyErrorPercent < 0.5
                      ? "text-emerald-400"
                      : telemetry.energyErrorPercent < 5.0
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {telemetry.energyErrorPercent.toFixed(4)}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    telemetry.energyErrorPercent < 0.5
                      ? "bg-emerald-400"
                      : telemetry.energyErrorPercent < 5.0
                      ? "bg-amber-400"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.min(telemetry.energyErrorPercent * 10, 100)}%` }}
                />
              </div>
              <p className="text-[11px] font-sans text-neutral-500">
                {integrator === "verlet"
                  ? "Velocity Verlet รักษาพลังงานรวมให้แกว่งจำกัด (Bounded Oscillation)"
                  : "Explicit Euler เพิ่มพลังงานอย่างต่อเนื่องทำให้วงโคจรหลุดลอย (Spiral Drift)"}
              </p>
            </div>

            {/* Kinetic / Potential / Total Energy */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Kinetic Energy (T):</span>
                <span className="text-cyan-400 font-medium">
                  {telemetry.kineticEnergy.toFixed(3)} J
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Potential Energy (U):</span>
                <span className="text-amber-400 font-medium">
                  {telemetry.potentialEnergy.toFixed(3)} J
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-neutral-850">
                <span className="text-neutral-300 font-medium">Total Energy (H):</span>
                <span className="text-neutral-100 font-semibold">
                  {telemetry.totalEnergy.toFixed(3)} J
                </span>
              </div>
            </div>

            {/* Kinematic Metrics */}
            <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5 text-xs font-mono text-neutral-400">
              <div className="flex justify-between">
                <span>Orbital Radius (r):</span>
                <span className="text-neutral-200">{telemetry.distance.toFixed(1)} px</span>
              </div>
              <div className="flex justify-between">
                <span>Speed (|v|):</span>
                <span className="text-neutral-200">{telemetry.velocity.toFixed(2)} px/s</span>
              </div>
            </div>
          </div>

          {/* Interactive Variable Controls */}
          <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
              <Sliders className="h-3 w-3 text-neutral-500" />
              Orbital Parameters
            </span>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Central Mass (M)</span>
                <span className="text-neutral-200">{centralMass}</span>
              </div>
              <input
                type="range"
                min={200}
                max={3000}
                step={50}
                value={centralMass}
                onChange={(e) => setCentralMass(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 bg-neutral-800 h-1 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Planet Mass (m)</span>
                <span className="text-neutral-200">{planetMass}</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={5.0}
                step={0.1}
                value={planetMass}
                onChange={(e) => setPlanetMass(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 bg-neutral-800 h-1 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Time Step (Δt)</span>
                <span className="text-neutral-200">{timeStep}</span>
              </div>
              <input
                type="range"
                min={0.005}
                max={0.05}
                step={0.005}
                value={timeStep}
                onChange={(e) => setTimeStep(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 bg-neutral-800 h-1 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Simulation Speed</span>
                <span className="text-neutral-200">{speedMultiplier}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                step={1}
                value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400 bg-neutral-800 h-1 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
