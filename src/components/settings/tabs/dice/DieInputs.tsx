import type { DieResult } from '~/dice/utils/createDie'
import { useAtomValue } from '@atomous/react'
import { Slider } from '~/components/inputs/slider/Slider'

export interface DieInputsProps {
  die: DieResult
}

export function DieInputs({ die }: DieInputsProps) {
  const value = useAtomValue(die.$inputs)

  return Object.entries(die.inputs).map(([name, input]) => (
    <Slider
      key={name}
      {...input}
      value={value[name] ?? input.defaultValue}
      onChange={value => die.$inputs.set({ ...die.$inputs.get(), [name]: value })}
    />
  ))
}
