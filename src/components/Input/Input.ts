import { Component } from '@/utils'
import { FormItem } from '@/components/Form/Item'

export interface InputProps {
  el?: string | HTMLElement
  plce?: string
  value?: string
  htmlType?: string
  type?: string
  onInput?: (event: Event) => void
}

export class Input extends Component<HTMLInputElement> {
  private $formItem?: FormItem
  private _value: string
  constructor(private props: InputProps) {
    super('input')
    this.init()
    this.bindEvent()
  }

  depend(formItem: FormItem): void {
    if (this.$formItem) return
    this.$formItem = formItem
  }

  get value(): string {
    return this._value
  }

  set value(newValue: string) {
    if (this._value === newValue) return
    this._value = newValue
    this.$formItem && this.$formItem.validate()
  }

  private init() {
    const { value, plce, type, htmlType, el } = this.props
    this._value = value || ''
    plce && this.setAttr('placeholder', plce)
    this.setAttr('type', htmlType || 'text')
    this.setAttr('value', this.value)
    this.addClassName(`input-style-${type || 'default'}`)
    if (el) this.$mount(el)
  }

  private bindEvent() {
    const input = this.$el
    input.addEventListener('input', this.handleInput.bind(this))
  }

  private handleInput(e: Event) {
    const { onInput } = this.props
    const tar = e.target as HTMLInputElement
    this.value = tar.value
    onInput && onInput(e)
  }
}
