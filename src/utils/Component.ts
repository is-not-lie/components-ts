export class Component<T extends HTMLElement> {
  private $$el: T
  constructor(tagName: string) {
    this.$$el = document.createElement(tagName) as T
  }

  get $el(): T {
    return this.$$el
  }

  $mount(el: string | Element): void {
    const element = typeof el === 'string' ? document.querySelector(el) : el
    if (!element) throw new Error(`NotFount: ${el} is defind`)
    else element.appendChild(this.$$el)
  }
}
