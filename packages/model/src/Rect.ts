export class Rect {
  left: number
  right: number
  bottom: number
  top: number

  constructor(left: number, top: number, right: number, bottom: number) {
    this.left = left
    this.top = top
    this.right = right
    this.bottom = bottom
  }

  get width() {
    return this.right - this.left
  }

  get height() {
    return this.bottom - this.top
  }

  static fromLTWH(left: number, top: number, width: number, height: number) {
    return new Rect(left, top, left + width, top + height)
  }

  overlaps(other: Rect) {
    const b1 = this.right <= other.left || other.right <= this.left
    const b2 = this.bottom <= other.top || other.bottom <= this.top
    return !(b1 || b2)
  }
}
