import { useEffect, useState } from 'react'

export const useDebouncedValue = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return [debouncedValue]
}
