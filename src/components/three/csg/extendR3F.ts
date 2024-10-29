import type { Object3DNode } from '@react-three/fiber'
import type { MeshBVH } from 'three-mesh-bvh'
import { extend } from '@react-three/fiber'
import { Brush } from 'three-bvh-csg'

extend({
  Brush,
})

declare module 'three' {
  interface BufferGeometry {
    boundsTree?: MeshBVH | null
  }
}

/* declare module "three-bvh-csg" {
  interface Brush {
    operation?: CSGOperation;
  }
} */

declare module '@react-three/fiber' {
  interface ThreeElements {
    brush: Object3DNode<Brush, typeof Brush>
  }
}
