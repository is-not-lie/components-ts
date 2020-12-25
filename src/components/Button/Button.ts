import { Component } from '@/utils/Component'
import '@/styles/Button.scss'

export interface ButtonProps {
  el?: string | HTMLElement
  htmlType?: string
  type?: string
  slots?: HTMLElement | string
  onClick?: (event: Event) => void
}

export class Button extends Component<HTMLButtonElement> {
  constructor(private props?: ButtonProps) {
    super('button')
    this.init()
    this.bindEvent()
  }

  private init() {
    const button = this.$el
    const { el, htmlType, type, slots } = this.props || {}
    button.type = htmlType || 'button'
    this.addClassName(`button-style-${type || 'default'}`)

    if (slots)
      typeof slots === 'string'
        ? (button.textContent = slots)
        : this.append(slots)

    if (el) this.$mount(el)
  }

  private bindEvent() {
    const button = this.$el
    button.addEventListener('click', this.handleButtonClick.bind(this))
  }

  private handleButtonClick(e: Event) {
    const { onClick } = this.props || {}
    onClick && onClick(e)
  }
}
