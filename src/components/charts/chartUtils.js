import { oklch } from "culori"
import { formatRgb } from "culori/require"
import { useEffect, useState } from "react"

/**
 * Custom React hook to get the width of a container element.
 *
 * @param {React.RefObject} ref - A React ref object pointing to the target element.
 * @param {number} [defaultWidth=600] - The default width to use before measurement.
 * @returns {number} The current width of the container element.
 *
 * @example
 * const ref = useRef();
 * const width = useContainerWidth(ref);
 */
export function useContainerWidth(ref, defaultWidth = 600) {
  const [containerWidth, setContainerWidth] = useState(defaultWidth)

  useEffect(() => {
    const handleResize = () => {
      if (ref.current && ref.current.parentElement) {
        setContainerWidth(ref.current.parentElement.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  return containerWidth
}

/**
 * Retrieves a CSS color value from the root element using the provided CSS variable key,
 * parses it using the `oklch` function, and returns the formatted RGB color string.
 * If the color variable is not found, returns undefined.
 *
 * @param {string} colorKey - The CSS variable key (e.g., '--primary-color') to retrieve the color value.
 * @returns {string|undefined} The formatted RGB color string, or undefined if the color is not found.
 */
export function getColor(colorKey) {
    // Ambil dari root, gunakan fallback jika tidak ada
    const color = getComputedStyle(document.documentElement).getPropertyValue(colorKey)
    if (color) {
        const parsedColor = oklch(color)
        return formatRgb(parsedColor)
    }
    return
}

