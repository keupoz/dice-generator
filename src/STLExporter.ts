import type { BufferAttribute, BufferGeometry, InterleavedBufferAttribute, Object3D, Vector3Like } from 'three'
import { Mesh, SkinnedMesh, Vector3 } from 'three'

export abstract class STLWriter<TOutput = unknown> {
  protected output: TOutput

  constructor(output: TOutput) {
    this.output = output
  }

  public getOutput() {
    return this.output
  }

  public abstract pushFaceStart(normal: Vector3Like): void
  public abstract pushVertex(vertex: Vector3Like): void
  public abstract pushFaceEnd(): void
  public abstract pushSolidEnd(): void
}

export class BinarySTLWriter extends STLWriter<DataView> {
  protected offset = 80 // Skip header

  constructor(triangles: number) {
    const bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4
    const arrayBuffer = new ArrayBuffer(bufferLength)

    super(new DataView(arrayBuffer))

    this.output.setUint32(this.offset, triangles, true)
    this.offset += 4
  }

  public override pushFaceStart(normal: Vector3Like): void {
    this.output.setFloat32(this.offset, normal.x, true)
    this.offset += 4
    this.output.setFloat32(this.offset, normal.y, true)
    this.offset += 4
    this.output.setFloat32(this.offset, normal.z, true)
    this.offset += 4
  }

  public override pushVertex(vertex: Vector3Like): void {
    this.output.setFloat32(this.offset, vertex.x, true)
    this.offset += 4
    this.output.setFloat32(this.offset, vertex.y, true)
    this.offset += 4
    this.output.setFloat32(this.offset, vertex.z, true)
    this.offset += 4
  }

  public override pushFaceEnd(): void {
    this.output.setUint16(this.offset, 0, true)
    this.offset += 2
  }

  public override pushSolidEnd(): void {
    // empty
  }
}

export class AsciiSTLWriter extends STLWriter<string> {
  constructor() {
    super('solid exported\n')
  }

  public override pushFaceStart(normal: Vector3Like): void {
    this.output += `\tfacet normal ${normal.x} ${normal.y} ${normal.z}\n`
    this.output += '\t\touter loop\n'
  }

  public override pushVertex(vertex: Vector3Like): void {
    this.output += `\t\t\tvertex ${vertex.x} ${vertex.y} ${vertex.z}\n`
  }

  public override pushFaceEnd(): void {
    this.output += '\t\tendloop\n'
    this.output += '\tendfacet\n'
  }

  public override pushSolidEnd(): void {
    this.output += 'endsolid exported\n'
  }
}

export type STLWriterConstructor<TOutput> = new (triangles: number) => STLWriter<TOutput>

export class STLExporter<TOutput> {
  private readonly vA = new Vector3()
  private readonly vB = new Vector3()
  private readonly vC = new Vector3()

  private readonly cb = new Vector3()
  private readonly ab = new Vector3()
  private readonly normal = new Vector3()

  private readonly WriterConstructor: STLWriterConstructor<TOutput>

  constructor(writerConstructor: STLWriterConstructor<TOutput>) {
    this.WriterConstructor = writerConstructor
  }

  private constructWriter(triangles: number) {
    return new this.WriterConstructor(triangles)
  }

  private writeFace(writer: STLWriter, a: number, b: number, c: number, positionAttribute: BufferAttribute | InterleavedBufferAttribute, object: Object3D) {
    this.vA.fromBufferAttribute(positionAttribute, a)
    this.vB.fromBufferAttribute(positionAttribute, b)
    this.vC.fromBufferAttribute(positionAttribute, c)

    if (object instanceof SkinnedMesh) {
      object.applyBoneTransform(a, this.vA)
      object.applyBoneTransform(b, this.vB)
      object.applyBoneTransform(c, this.vC)
    }

    this.vA.applyMatrix4(object.matrixWorld)
    this.vB.applyMatrix4(object.matrixWorld)
    this.vC.applyMatrix4(object.matrixWorld)

    this.calculateNormal()

    writer.pushFaceStart(this.normal)

    writer.pushVertex(this.vA)
    writer.pushVertex(this.vB)
    writer.pushVertex(this.vC)

    writer.pushFaceEnd()
  }

  private calculateNormal() {
    this.cb.subVectors(this.vC, this.vB)
    this.ab.subVectors(this.vA, this.vB)
    this.cb.cross(this.ab).normalize()

    this.normal.copy(this.cb).normalize()
  }

  public parse(scene: Object3D) {
    const meshes: Mesh[] = []
    let triangles = 0

    scene.traverseVisible((object) => {
      if (object instanceof Mesh) {
        const geometry = object.geometry as BufferGeometry
        const attribute = geometry.index ?? geometry.getAttribute('position')

        triangles += attribute.count / 3

        meshes.push(object)
      }
    })

    const writer = this.constructWriter(triangles)

    for (const mesh of meshes) {
      const index = mesh.geometry.index
      const positionAttribute = mesh.geometry.getAttribute('position')

      if (index !== null) {
        // indexed geometry

        for (let j = 0; j < index.count; j += 3) {
          const a = index.getX(j + 0)
          const b = index.getX(j + 1)
          const c = index.getX(j + 2)

          this.writeFace(writer, a, b, c, positionAttribute, mesh)
        }
      } else {
        // non-indexed geometry

        for (let j = 0; j < positionAttribute.count; j += 3) {
          const a = j + 0
          const b = j + 1
          const c = j + 2

          this.writeFace(writer, a, b, c, positionAttribute, mesh)
        }
      }
    }

    writer.pushSolidEnd()

    return writer.getOutput()
  }
}
