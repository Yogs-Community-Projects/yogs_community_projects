import Color from 'colorjs.io'

type RawColor = {
  Default: string
  '50': string
  '100': string
  '200': string
  '300': string
  '400': string
  '500': string
  '600': string
  '700': string
  '800': string
  '900': string
}

type ColorKey = 'Default' | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

class ColorPallet {
  private readonly raw: RawColor

  constructor(raw: RawColor) {
    this.raw = raw
  }

  get shade50(): string {
    return this.raw['50']
  }

  get shade100(): string {
    return this.raw['100']
  }

  get shade200(): string {
    return this.raw['200']
  }

  get shade300(): string {
    return this.raw['300']
  }

  get shade400(): string {
    return this.raw['400']
  }

  get shade500(): string {
    return this.raw['500']
  }

  get shade600(): string {
    return this.raw['600']
  }

  get shade700(): string {
    return this.raw['700']
  }

  get shade800(): string {
    return this.raw['800']
  }

  get shade900(): string {
    return this.raw['900']
  }

  static fromHexColor(color500: string) {
    return this.fromColor(new Color(color500))
  }

  static fromColor(color: Color) {
    const c = () =>
      new Color(
        color.toString({
          format: 'hex'
        })
      )
    const lighten = 0.08
    const darken = 0.11
    return new ColorPallet({
      Default: c().toString({
        format: 'hex'
      }),
      '50': c()
        .lighten(5 * lighten)
        .toString({
          format: 'hex'
        }),
      '100': c()
        .lighten(4 * lighten)
        .toString({
          format: 'hex'
        }),
      '200': c()
        .lighten(3 * lighten)
        .toString({
          format: 'hex'
        }),
      '300': c()
        .lighten(2 * lighten)
        .toString({
          format: 'hex'
        }),
      '400': c().lighten(lighten).toString({
        format: 'hex'
      }),
      '500': c().toString({
        format: 'hex'
      }),
      '600': c().darken(darken).toString({
        format: 'hex'
      }),
      '700': c()
        .darken(2 * darken)
        .toString({
          format: 'hex'
        }),
      '800': c()
        .darken(3 * darken)
        .toString({
          format: 'hex'
        }),
      '900': c()
        .darken(4 * darken)
        .toString({
          format: 'hex'
        })
    })
  }

  get(key: ColorKey) {
    return this.raw[key]
  }
}

export function generateHexColorPallet(color: Color): ColorPallet {
  return ColorPallet.fromColor(color)
}
