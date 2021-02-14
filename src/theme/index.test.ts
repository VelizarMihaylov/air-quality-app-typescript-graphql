import generateTheme, { ThemeProps } from './index'

describe('generateTheme', () => {
  it('should calculate spacing in default units', () => {
    expect(generateTheme().spacing(16)).toEqual('1rem')
  })

  it('should calculate spacing with pixel unit', () => {
    expect(generateTheme({ baseUnits: 'px' } as ThemeProps).spacing(3)).toEqual(
      '3px'
    )
  })

  it('should calculate auto margin if auto is passed', () => {
    expect(generateTheme().spacing(16, 'auto')).toEqual('1rem auto')
  })

  it('should calculate auto margin with pixels if auto is passed', () => {
    expect(
      generateTheme({ baseUnits: 'px' } as ThemeProps).spacing(16, 'auto')
    ).toEqual('16px auto')
  })

  it('should calculate spacing with object', () => {
    expect(
      generateTheme().spacing({
        top: 24,
        right: 24,
        bottom: 24,
        left: 24
      })
    ).toEqual('1.5rem 1.5rem 1.5rem 1.5rem')
  })

  it('should calculate spacing with object in px', () => {
    expect(
      generateTheme({ baseUnits: 'px' } as ThemeProps).spacing({
        top: 24,
        right: 24,
        bottom: 24,
        left: 24
      })
    ).toEqual('24px 24px 24px 24px')
  })
})
