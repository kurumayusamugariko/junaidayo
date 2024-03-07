import { useEffect, useState } from 'react'

export const useMediaQuery = (query) => {
  const formattedQuery = `(${query})`
  const [match, setMatch] = useState(matchMedia(formattedQuery).matches)

  useEffect(() => {
    const mql = matchMedia(formattedQuery)

    const handleChange = (e) => {
      setMatch(e.matches)
    }

    if (mql.media === 'not all' || mql.media === 'invalid') {
      console.error(`useMediaQuery Error: Invalid media query`)
    }

    mql.addEventListener('change', handleChange)

    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [formattedQuery])

  return match
}
