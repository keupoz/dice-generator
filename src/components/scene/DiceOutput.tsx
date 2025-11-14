import { useAtomValue } from '@atomous/react'
import { $diceOutput } from '~/dice/allDice'

export function DiceOutput() {
  const object = useAtomValue($diceOutput)

  return <primitive object={object} />
}
