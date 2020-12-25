import { Button, Form, Input, Component } from '../src'

const onSubmit = (values) => console.log(values)

const onReset = () => console.log('reset')

const header = new Component('header')
const title = new Component('h1')
header.append(title.$el)

const footer = new Component('footer')

new Button({
  htmlType: 'submit',
  el: footer.$el,
  slots: '提交'
})

new Button({
  htmlType: 'reset',
  el: footer.$el,
  slots: '重置'
})

new Form({
  el: 'body',
  onSubmit,
  onReset,
  slots: {
    header: header.$el,
    content: [
      new Form.Item({
        prop: 'username',
        rules: [
          { required: true, message: '请输入用户名' },
          { min: 4, message: '用户名长度不能低于4位' }
        ],
        input: new Input({
          plce: '请输入用户名'
        })
      }),
      new Form.Item({
        prop: 'password',
        rules: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码长度不能低于6位' }
        ],
        input: new Input({
          htmlType: 'password',
          plce: '请输入用户名'
        })
      })
    ],
    footer: footer.$el
  }
})
