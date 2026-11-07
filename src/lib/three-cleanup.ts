import * as THREE from "three";

/**
 * Disposes all resources attached to a Three.js scene, renderer, and object hierarchy.
 * Protects against WebGL context memory leaks across Next.js route transitions and tab changes.
 */
export function disposeThreeScene(
  scene: THREE.Scene | null,
  renderer: THREE.WebGLRenderer | null
): void {
  if (scene) {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          for (const mat of object.material) {
            disposeMaterial(mat);
          }
        } else {
          disposeMaterial(object.material);
        }
      }
    });

    // Clear all children from scene
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
  }

  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer.forceContextLoss();
  }
}

function disposeMaterial(material: THREE.Material): void {
  material.dispose();

  // Check for texture maps
  const mat = material as unknown as Record<string, unknown>;
  for (const key of Object.keys(mat)) {
    const value = mat[key];
    if (value && typeof value === "object" && "isTexture" in value) {
      (value as THREE.Texture).dispose();
    }
  }
}
