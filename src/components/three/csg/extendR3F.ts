import type { Object3DNode } from '@react-three/fiber'
import { extend } from '@react-three/fiber'
import { Brush } from 'three-bvh-csg'

extend({ Brush })

declare module '@react-three/fiber' {
  interface ThreeElements {
    brush: Object3DNode<Brush, typeof Brush>
  }
}
