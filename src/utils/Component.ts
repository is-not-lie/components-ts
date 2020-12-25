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

  append(el: HTMLElement): void {
    this.$$el.appendChild(el)
  }

  insert(orign: HTMLElement, target: HTMLElement): void {
    this.$$el.insertBefore(target, orign)
  }

  replace(node: HTMLElement, oldNode: HTMLElement): void {
    this.$$el.replaceChild(node, oldNode)
  }

  addClassName(className: string): void {
    this.$$el.classList.add(className)
  }

  removeClassName(className: string): void {
    this.$$el.classList.remove(className)
  }

  setAttr(key: string, value: string): void {
    this.$$el.setAttribute(key, value)
  }
}
