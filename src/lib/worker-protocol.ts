/**
 * Web Worker Concurrency & Zero-Copy Transferable Protocols
 * Defines typed communication contracts and Transferable ArrayBuffer packaging
 * for heavy physics and numerical ODE simulations.
 * Reference: docs/TECHNICAL_AUDIT.md Section 5
 */

export interface SimulationFrameBuffer {
  stepCount: number;
  timeElapsed: number;
  positionsBuffer: ArrayBufferLike; // Float64Array containing (x, y) coordinates
  energiesBuffer: ArrayBufferLike;  // Float64Array containing (kinetic, potential, total)
}

export type SimulationCommand =
  | { type: 'INIT_ORBIT'; payload: { m1: number; m2: number; G: number; dt: number } }
  | { type: 'STEP_SIMULATION'; payload: { steps: number } }
  | { type: 'PAUSE_SIMULATION' }
  | { type: 'RESET_SIMULATION' };

export type SimulationEvent =
  | { type: 'FRAME_READY'; payload: SimulationFrameBuffer }
  | { type: 'ENERGY_VIOLATION'; payload: { relativeError: number } }
  | { type: 'ERROR'; payload: { message: string } };

/**
 * Encapsulate simulation calculation state into a Transferable SimulationFrameBuffer.
 */
export function createSimulationFrame(
  stepCount: number,
  timeElapsed: number,
  positions: Float64Array,
  energies: Float64Array
): SimulationFrameBuffer {
  return {
    stepCount,
    timeElapsed,
    positionsBuffer: positions.buffer,
    energiesBuffer: energies.buffer,
  };
}

/**
 * Extract transferable ArrayBuffers from a SimulationFrameBuffer for zero-copy postMessage transfer.
 */
export function getTransferables(frame: SimulationFrameBuffer): Transferable[] {
  const transferables: Transferable[] = [];
  if (frame.positionsBuffer instanceof ArrayBuffer) {
    transferables.push(frame.positionsBuffer);
  }
  if (frame.energiesBuffer instanceof ArrayBuffer) {
    transferables.push(frame.energiesBuffer);
  }
  return transferables;
}
