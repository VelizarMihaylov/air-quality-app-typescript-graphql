import { colours, typography, breakPoints } from './@config'

export type Theme = {
  colours: typeof colours
  typography: typeof typography
  breakPoints: typeof breakPoints
  themeType: 'light' | 'dark'
  spacing: (
    size: number | { top: number; left: number; right: number; bottom: number },
    auto?: 'auto'
  ) => string
}

export type ThemeProps = {
  baseUnits?: 'px' | 'rem'
  baseSize?: number
  themeType?: 'light' | 'dark'
}
const generateTheme = (props?: ThemeProps): Theme => {
  const baseUnits = props?.baseUnits || 'rem'
  const baseSize = props?.baseSize || 16
  const themeType = props?.themeType || 'light'

  const spacing = (baseUnits: 'px' | 'rem', baseSize: number) => (
    size: number | { top: number; left: number; right: number; bottom: number },
    auto?: 'auto'
  ) => {
    if (typeof size !== 'object' && auto === 'auto') {
      if (baseUnits === 'px') {
        return `${size}${baseUnits} auto`
      }
      return `${size / baseSize}${baseUnits} auto`
    }

    if (typeof size === 'object') {
      const { top, right, bottom, left } = size
      if (baseUnits === 'px') {
        return `${top}${baseUnits} ${right}${baseUnits} ${bottom}${baseUnits} ${left}${baseUnits}`
      }

      return `${top / baseSize}${baseUnits} ${right / baseSize}${baseUnits} ${
        bottom / baseSize
      }${baseUnits} ${left / baseSize}${baseUnits}`
    }

    if (baseUnits === 'px') {
      return `${size}${baseUnits}`
    }

    return `${size / baseSize}${baseUnits}`
  }

  const theme = {
    typography
  }

  return {
    ...theme,
    spacing: spacing(baseUnits, baseSize),
    colours,
    breakPoints,
    themeType
  }
}

export default generateTheme
