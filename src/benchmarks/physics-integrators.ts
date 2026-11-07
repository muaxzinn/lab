/**
 * Physics Integrators Benchmark Harness
 * Compares Explicit Euler, Semi-Implicit Euler, Velocity Verlet, and Runge-Kutta 4 (RK4)
 * across an orbital 2-body Keplerian gravitational problem.
 * Also benchmarks Matter.js rigid body collision step performance.
 */

import Matter from 'matter-js';

export interface State2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface IntegratorMetrics {
  name: string;
  steps: number;
  dt: number;
  durationMs: number;
  opsPerSec: number;
  finalState: State2D;
  initialEnergy: number;
  finalEnergy: number;
  maxEnergyError: number;
  finalEnergyError: number;
  maxOrbitalDrift: number;
  finalOrbitalDrift: number;
  orbitalDrift: number; // Alias to finalOrbitalDrift for backwards compatibility
  isSymplectic: boolean;
}

export interface MatterJsBenchmarkResult {
  engineName: string;
  bodyCount: number;
  steps: number;
  durationMs: number;
  stepsPerSecond: number;
  memoryUsageMb: number;
  activePairsBeforeClear: number;
  bodiesRemainingAfterClear: number;
  cleanedUp: boolean;
}

/**
 * Gravitational acceleration for 2-body problem with central mass M = 1, G = 1.
 * a = -G * M / r^3 * r_vec
 */
function computeGravitationalAcceleration(x: number, y: number): { ax: number; ay: number } {
  const r2 = x * x + y * y;
  const r = Math.sqrt(r2);
  const r3 = r2 * r;
  if (r3 === 0) return { ax: 0, ay: 0 };
  const mu = 1.0; // G * M
  return {
    ax: (-mu * x) / r3,
    ay: (-mu * y) / r3,
  };
}

/**
 * Specific orbital mechanical energy: E = 0.5 * v^2 - mu / r
 */
function computeSpecificEnergy(state: State2D): number {
  const v2 = state.vx * state.vx + state.vy * state.vy;
  const r = Math.sqrt(state.x * state.x + state.y * state.y);
  return 0.5 * v2 - 1.0 / r;
}

/**
 * 1. Explicit Euler (1st order forward Euler)
 * Unstable for oscillatory systems; energy diverges quickly.
 */
export function runExplicitEuler(
  initialState: State2D,
  steps: number,
  dt: number
): IntegratorMetrics {
  let state = { ...initialState };
  const initialEnergy = computeSpecificEnergy(state);
  let maxEnergyError = 0;
  let maxOrbitalDrift = 0;

  const start = performance.now();
  for (let i = 0; i < steps; i++) {
    const { ax, ay } = computeGravitationalAcceleration(state.x, state.y);
    state = {
      x: state.x + state.vx * dt,
      y: state.y + state.vy * dt,
      vx: state.vx + ax * dt,
      vy: state.vy + ay * dt,
    };
    const currentEnergy = computeSpecificEnergy(state);
    const err = Math.abs((currentEnergy - initialEnergy) / initialEnergy);
    if (err > maxEnergyError) maxEnergyError = err;

    const r = Math.sqrt(state.x * state.x + state.y * state.y);
    const drift = Math.abs(r - 1.0);
    if (drift > maxOrbitalDrift) maxOrbitalDrift = drift;
  }
  const end = performance.now();
  const durationMs = end - start;
  const finalEnergy = computeSpecificEnergy(state);
  const finalRadius = Math.sqrt(state.x * state.x + state.y * state.y);
  const finalOrbitalDrift = Math.abs(finalRadius - 1.0);

  return {
    name: 'Explicit Euler (1st Order)',
    steps,
    dt,
    durationMs,
    opsPerSec: Math.round((steps / durationMs) * 1000),
    finalState: state,
    initialEnergy,
    finalEnergy,
    maxEnergyError,
    finalEnergyError: Math.abs((finalEnergy - initialEnergy) / initialEnergy),
    maxOrbitalDrift,
    finalOrbitalDrift,
    orbitalDrift: finalOrbitalDrift,
    isSymplectic: false,
  };
}

/**
 * 2. Semi-Implicit Euler (Symplectic Euler / Euler-Cromer)
 * Updates velocity first, then position using updated velocity. Symplectic.
 */
export function runSemiImplicitEuler(
  initialState: State2D,
  steps: number,
  dt: number
): IntegratorMetrics {
  let state = { ...initialState };
  const initialEnergy = computeSpecificEnergy(state);
  let maxEnergyError = 0;
  let maxOrbitalDrift = 0;

  const start = performance.now();
  for (let i = 0; i < steps; i++) {
    const { ax, ay } = computeGravitationalAcceleration(state.x, state.y);
    const nextVx = state.vx + ax * dt;
    const nextVy = state.vy + ay * dt;
    state = {
      vx: nextVx,
      vy: nextVy,
      x: state.x + nextVx * dt,
      y: state.y + nextVy * dt,
    };
    const currentEnergy = computeSpecificEnergy(state);
    const err = Math.abs((currentEnergy - initialEnergy) / initialEnergy);
    if (err > maxEnergyError) maxEnergyError = err;

    const r = Math.sqrt(state.x * state.x + state.y * state.y);
    const drift = Math.abs(r - 1.0);
    if (drift > maxOrbitalDrift) maxOrbitalDrift = drift;
  }
  const end = performance.now();
  const durationMs = end - start;
  const finalEnergy = computeSpecificEnergy(state);
  const finalRadius = Math.sqrt(state.x * state.x + state.y * state.y);
  const finalOrbitalDrift = Math.abs(finalRadius - 1.0);

  return {
    name: 'Semi-Implicit Euler (1st Order Symplectic)',
    steps,
    dt,
    durationMs,
    opsPerSec: Math.round((steps / durationMs) * 1000),
    finalState: state,
    initialEnergy,
    finalEnergy,
    maxEnergyError,
    finalEnergyError: Math.abs((finalEnergy - initialEnergy) / initialEnergy),
    maxOrbitalDrift,
    finalOrbitalDrift,
    orbitalDrift: finalOrbitalDrift,
    isSymplectic: true,
  };
}

/**
 * 3. Velocity Verlet (2nd order Symplectic)
 * Standard molecular dynamics and astronomical orbital integrator.
 * Conserves phase space area (symplectic) and exhibits zero secular energy drift.
 */
export function runVelocityVerlet(
  initialState: State2D,
  steps: number,
  dt: number
): IntegratorMetrics {
  let state = { ...initialState };
  const initialEnergy = computeSpecificEnergy(state);
  let maxEnergyError = 0;
  let maxOrbitalDrift = 0;

  const start = performance.now();
  let currentAccel = computeGravitationalAcceleration(state.x, state.y);

  for (let i = 0; i < steps; i++) {
    // 1. Half step velocity update
    const halfVx = state.vx + 0.5 * currentAccel.ax * dt;
    const halfVy = state.vy + 0.5 * currentAccel.ay * dt;

    // 2. Full step position update
    const nextX = state.x + halfVx * dt;
    const nextY = state.y + halfVy * dt;

    // 3. Acceleration at new position
    const nextAccel = computeGravitationalAcceleration(nextX, nextY);

    // 4. Second half step velocity update
    const nextVx = halfVx + 0.5 * nextAccel.ax * dt;
    const nextVy = halfVy + 0.5 * nextAccel.ay * dt;

    state = { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
    currentAccel = nextAccel;

    const currentEnergy = computeSpecificEnergy(state);
    const err = Math.abs((currentEnergy - initialEnergy) / initialEnergy);
    if (err > maxEnergyError) maxEnergyError = err;

    const r = Math.sqrt(state.x * state.x + state.y * state.y);
    const drift = Math.abs(r - 1.0);
    if (drift > maxOrbitalDrift) maxOrbitalDrift = drift;
  }
  const end = performance.now();
  const durationMs = end - start;
  const finalEnergy = computeSpecificEnergy(state);
  const finalRadius = Math.sqrt(state.x * state.x + state.y * state.y);
  const finalOrbitalDrift = Math.abs(finalRadius - 1.0);

  return {
    name: 'Velocity Verlet (2nd Order Symplectic)',
    steps,
    dt,
    durationMs,
    opsPerSec: Math.round((steps / durationMs) * 1000),
    finalState: state,
    initialEnergy,
    finalEnergy,
    maxEnergyError,
    finalEnergyError: Math.abs((finalEnergy - initialEnergy) / initialEnergy),
    maxOrbitalDrift,
    finalOrbitalDrift,
    orbitalDrift: finalOrbitalDrift,
    isSymplectic: true,
  };
}

/**
 * 4. Runge-Kutta 4th Order (RK4)
 * High local precision (O(dt^4)), but non-symplectic. Over millions of steps,
 * energy will slowly drift, and requires 4 acceleration evaluations per step.
 */
export function runRK4(
  initialState: State2D,
  steps: number,
  dt: number
): IntegratorMetrics {
  let state = { ...initialState };
  const initialEnergy = computeSpecificEnergy(state);
  let maxEnergyError = 0;
  let maxOrbitalDrift = 0;

  const start = performance.now();
  for (let i = 0; i < steps; i++) {
    // Stage 1
    const a1 = computeGravitationalAcceleration(state.x, state.y);
    const k1_vx = a1.ax;
    const k1_vy = a1.ay;
    const k1_x = state.vx;
    const k1_y = state.vy;

    // Stage 2
    const x2 = state.x + 0.5 * dt * k1_x;
    const y2 = state.y + 0.5 * dt * k1_y;
    const vx2 = state.vx + 0.5 * dt * k1_vx;
    const vy2 = state.vy + 0.5 * dt * k1_vy;
    const a2 = computeGravitationalAcceleration(x2, y2);
    const k2_vx = a2.ax;
    const k2_vy = a2.ay;
    const k2_x = vx2;
    const k2_y = vy2;

    // Stage 3
    const x3 = state.x + 0.5 * dt * k2_x;
    const y3 = state.y + 0.5 * dt * k2_y;
    const vx3 = state.vx + 0.5 * dt * k2_vx;
    const vy3 = state.vy + 0.5 * dt * k2_vy;
    const a3 = computeGravitationalAcceleration(x3, y3);
    const k3_vx = a3.ax;
    const k3_vy = a3.ay;
    const k3_x = vx3;
    const k3_y = vy3;

    // Stage 4
    const x4 = state.x + dt * k3_x;
    const y4 = state.y + dt * k3_y;
    const vx4 = state.vx + dt * k3_vx;
    const vy4 = state.vy + dt * k3_vy;
    const a4 = computeGravitationalAcceleration(x4, y4);
    const k4_vx = a4.ax;
    const k4_vy = a4.ay;
    const k4_x = vx4;
    const k4_y = vy4;

    // Combine
    state = {
      x: state.x + (dt / 6) * (k1_x + 2 * k2_x + 2 * k3_x + k4_x),
      y: state.y + (dt / 6) * (k1_y + 2 * k2_y + 2 * k3_y + k4_y),
      vx: state.vx + (dt / 6) * (k1_vx + 2 * k2_vx + 2 * k3_vx + k4_vx),
      vy: state.vy + (dt / 6) * (k1_vy + 2 * k2_vy + 2 * k3_vy + k4_vy),
    };

    const currentEnergy = computeSpecificEnergy(state);
    const err = Math.abs((currentEnergy - initialEnergy) / initialEnergy);
    if (err > maxEnergyError) maxEnergyError = err;

    const r = Math.sqrt(state.x * state.x + state.y * state.y);
    const drift = Math.abs(r - 1.0);
    if (drift > maxOrbitalDrift) maxOrbitalDrift = drift;
  }
  const end = performance.now();
  const durationMs = end - start;
  const finalEnergy = computeSpecificEnergy(state);
  const finalRadius = Math.sqrt(state.x * state.x + state.y * state.y);
  const finalOrbitalDrift = Math.abs(finalRadius - 1.0);

  return {
    name: 'Runge-Kutta 4 (RK4 4th Order)',
    steps,
    dt,
    durationMs,
    opsPerSec: Math.round((steps / durationMs) * 1000),
    finalState: state,
    initialEnergy,
    finalEnergy,
    maxEnergyError,
    finalEnergyError: Math.abs((finalEnergy - initialEnergy) / initialEnergy),
    maxOrbitalDrift,
    finalOrbitalDrift,
    orbitalDrift: finalOrbitalDrift,
    isSymplectic: false,
  };
}

/**
 * 5. Matter.js 2D Rigid Body Engine Benchmark
 * Measures rigid body collision physics pipeline performance with 50 interacting bodies.
 * Confirms deterministic cleanup via World.clear() and Engine.clear().
 */
export function runMatterJsBenchmark(bodyCount = 50, steps = 1000): MatterJsBenchmarkResult {
  const { Engine, World, Bodies } = Matter;
  const engine = Engine.create({
    gravity: { x: 0, y: 1, scale: 0.001 },
  });

  // Create enclosing static container
  const ground = Bodies.rectangle(400, 600, 810, 60, { isStatic: true });
  const leftWall = Bodies.rectangle(0, 300, 60, 600, { isStatic: true });
  const rightWall = Bodies.rectangle(800, 300, 60, 600, { isStatic: true });
  const ceiling = Bodies.rectangle(400, 0, 810, 60, { isStatic: true });
  World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

  // Add dynamic rigid circles and boxes
  const dynamicBodies = [];
  for (let i = 0; i < bodyCount; i++) {
    const x = 100 + (i % 10) * 60;
    const y = 50 + Math.floor(i / 10) * 50;
    const body = i % 2 === 0
      ? Bodies.circle(x, y, 15, { restitution: 0.7, friction: 0.1 })
      : Bodies.rectangle(x, y, 25, 25, { restitution: 0.5, friction: 0.2 });
    dynamicBodies.push(body);
  }
  World.add(engine.world, dynamicBodies);

  const startMem = process.memoryUsage().heapUsed;
  const start = performance.now();

  for (let i = 0; i < steps; i++) {
    Engine.update(engine, 1000 / 60);
  }

  const durationMs = performance.now() - start;
  const endMem = process.memoryUsage().heapUsed;
  const memoryDeltaMb = Math.max(0, (endMem - startMem) / (1024 * 1024));

  const activePairsBeforeClear = engine.pairs.list.length;

  // Clean up world
  World.clear(engine.world, false);
  Engine.clear(engine);

  const bodiesRemainingAfterClear = engine.world.bodies.length;
  const cleanedUp = bodiesRemainingAfterClear === 0;

  return {
    engineName: 'Matter.js (Verlet-based Iterative Constraint Solver)',
    bodyCount,
    steps,
    durationMs,
    stepsPerSecond: Math.round((steps / durationMs) * 1000),
    memoryUsageMb: memoryDeltaMb,
    activePairsBeforeClear,
    bodiesRemainingAfterClear,
    cleanedUp,
  };
}

/**
 * Execute full physics benchmark suite
 */
export function runAllPhysicsBenchmarks(steps = 10000, dt = 0.01) {
  // Circular orbit initial state: r = 1, v = 1, E_0 = -0.5
  const initialState: State2D = { x: 1.0, y: 0.0, vx: 0.0, vy: 1.0 };

  const euler = runExplicitEuler(initialState, steps, dt);
  const semiImplicit = runSemiImplicitEuler(initialState, steps, dt);
  const verlet = runVelocityVerlet(initialState, steps, dt);
  const rk4 = runRK4(initialState, steps, dt);
  const matterJs = runMatterJsBenchmark(50, 1000);

  return {
    orbitConditions: { steps, dt, totalTime: steps * dt, initialState },
    integrators: [euler, semiImplicit, verlet, rk4],
    rigidBodyEngine: matterJs,
  };
}
