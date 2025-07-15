import { array, boolean, enum_, number, object, optional, picklist, record, string } from 'valibot'
import { RenderEngine, RenderOperation } from '~/state/render'

export const CurrentFontSchema = object({
  name: string(),
  variationSettings: record(string(), number()),
  features: record(string(), boolean()),
})

export const FaceTextSchema = object({
  type: picklist(['text', 'svg']),
  value: string(),
})

export const SVGSchema = object({
  name: string(),
  lastModified: number(),
  content: string(),
})

export const DieFaceSchema = object({
  name: string(),
  text: FaceTextSchema,
  mark: FaceTextSchema,
  isUnderscore: boolean(),
  markGap: number(),
  rotation: number(),
  offsetX: number(),
  offsetY: number(),
})

export const DieSchema = object({
  name: string(),
  visible: boolean(),
  fontScale: number(),
  inputs: record(string(), number()),
  faces: array(DieFaceSchema),
})

export const PresetGeneralSchema = object({
  renderEngine: enum_(RenderEngine),
  renderOperation: enum_(RenderOperation),

  textFont: optional(CurrentFontSchema),
  markFont: optional(CurrentFontSchema),

  segments: number(),
  fontScale: number(),
  svgScale: number(),
  extrusionDepth: number(),

  svgs: array(SVGSchema),
})

export const PresetSchema = object({
  name: string(),
  general: PresetGeneralSchema,
  dice: array(DieSchema),
})
