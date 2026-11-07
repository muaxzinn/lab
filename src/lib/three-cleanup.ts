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
    const geometriesToDispose = new Set<THREE.BufferGeometry>();
    const materialsToDispose = new Set<THREE.Material>();

    scene.traverse((object) => {
      // Traverse all renderable Three.js objects (Mesh, Points, Line, LineLoop, LineSegments, Sprite)
      const renderable = object as unknown as {
        geometry?: THREE.BufferGeometry;
        material?: THREE.Material | THREE.Material[];
      };

      if (renderable.geometry && typeof renderable.geometry.dispose === "function") {
        geometriesToDispose.add(renderable.geometry);
      }

      if (renderable.material) {
        if (Array.isArray(renderable.material)) {
          for (const mat of renderable.material) {
            if (mat && typeof mat.dispose === "function") {
              materialsToDispose.add(mat);
            }
          }
        } else if (typeof renderable.material.dispose === "function") {
          materialsToDispose.add(renderable.material);
        }
      }
    });

    geometriesToDispose.forEach((geom) => geom.dispose());
    materialsToDispose.forEach((mat) => disposeMaterial(mat));

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
