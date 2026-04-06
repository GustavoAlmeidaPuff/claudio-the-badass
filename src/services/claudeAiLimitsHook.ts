import { useEffect, useState } from 'react'
import {
  type claudioILimits,
  currentLimits,
  statusListeners,
} from './claudioiLimits.js'

export function useclaudioiLimits(): claudioILimits {
  const [limits, setLimits] = useState<claudioILimits>({ ...currentLimits })

  useEffect(() => {
    const listener = (newLimits: claudioILimits) => {
      setLimits({ ...newLimits })
    }
    statusListeners.add(listener)

    return () => {
      statusListeners.delete(listener)
    }
  }, [])

  return limits
}
