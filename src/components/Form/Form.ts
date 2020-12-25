import { Component } from '@/utils'
import { FormItem } from './Item'
export { FormItemProps } from './Item'

export interface FormProps {
  el?: string | HTMLElement
  onSubmit?: (values: { [key: string]: string }) => void
  onReset?: () => void
  slots?: {
    header?: HTMLElement
    content?: HTMLElement | HTMLElement[] | FormItem | FormItem[]
    footer?: HTMLElement
  }
}

export class Form extends Component<HTMLFormElement> {
  static Item = FormItem
  private $formItems: FormItem[]
  constructor(private props: FormProps = {}) {
    super('form')
    this.$formItems = []
    this.init()
    this.bindEvent()
  }

  private init() {
    const { header, footer, content } = this.props.slots || {}
    header && this.append(header)
    if (content) {
      if (Array.isArray(content)) {
        content.forEach((item: HTMLElement | FormItem) => {
          if (item instanceof FormItem) {
            this.$formItems.push(item)
            this.append(item.$el)
          } else this.append(item)
        })
      } else {
        this.append(content instanceof FormItem ? content.$el : content)
      }
    }
    footer && this.append(footer)

    this.props.el && this.$mount(this.props.el)
  }

  private bindEvent() {
    const $form = this.$el
    $form.addEventListener('submit', this.handleSubmit.bind(this))
    $form.addEventListener('reset', this.handleReset.bind(this))
  }

  private handleSubmit(e: Event) {
    e.preventDefault()
    const { onSubmit } = this.props
    const promises: Promise<{ [key: string]: string }>[] = []
    this.$formItems.forEach((item) => promises.push(item.validate()))
    Promise.all(promises)
      .then((values) => {
        onSubmit && onSubmit(Object.assign({}, ...values))
      })
      .catch(() => {
        return
      })
  }

  private handleReset() {
    const { onReset } = this.props
    this.$formItems.forEach((item) => (item.value = ''))
    onReset && onReset()
  }
}
