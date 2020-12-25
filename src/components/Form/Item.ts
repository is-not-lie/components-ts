import Schema, { RuleItem } from 'async-validator'
import { Component } from '@/utils'
import { Input } from '@/index'

export interface FormItemProps {
  prop: string
  rules?: RuleItem | RuleItem[]
  label?: string
  el?: string | HTMLElement
  input?: Input
}

export class FormItem extends Component<HTMLDivElement> {
  private $label?: HTMLLabelElement
  private $msg?: HTMLElement
  private $input?: Input
  private $validator?: Schema
  constructor(private props: FormItemProps) {
    super('div')
    this.init()
  }

  get prop(): string {
    return this.props.prop
  }

  get value(): string | undefined {
    return this.$input?.value
  }

  set value(newValue: string) {
    this.$input && (this.$input.value = newValue)
  }

  private createLabelElement() {
    const { label } = this.props
    const labelComponent = new Component<HTMLLabelElement>('label')
    const span = new Component<HTMLSpanElement>('span')
    span.$el.textContent = label
    labelComponent.append(span.$el)
    this.$label = labelComponent.$el
    this.append(this.$label)
  }

  private createErrorMessageElement() {
    const msgComponent = new Component('p')
    this.$msg = msgComponent.$el
    this.append(this.$msg)
  }

  private init(): void {
    const { rules, label, el, input } = this.props
    label && this.createLabelElement()
    if (input) {
      this.$input = input
      ;(this.$label || this.$el).appendChild(input.$el)
    }

    if (rules) {
      this.createErrorMessageElement()
      this.$validator = new Schema({ [this.prop]: rules })
    }

    if (el) this.$mount(el)
  }

  validate(): Promise<{ [key: string]: string }> {
    return new Promise((resolve, reject) => {
      const { validate } = this.$validator || {}
      const { value } = this.$input || {}
      validate &&
        value &&
        validate({ [this.prop]: value }, {}, (errors, fields) => {
          if (errors && errors.length) {
            const errorMessage = errors[errors.length - 1].message
            this.$msg && (this.$msg.textContent = errorMessage)
            reject({
              [this.prop]: fields
            })
          } else
            resolve({
              [this.prop]: this.value
            })
        })
    })
  }
}
