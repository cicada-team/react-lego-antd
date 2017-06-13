import render from '../../util/render'

export default () => render({
  children: [{
    type: 'DropDown',
    bind: 'dropDown',
    getInitialState: () => ({
      text: 'click me',
      type: 'a',
      trigger: 'click',
      placement: 'bottomCenter',
    }),
    listeners: {
      onVisibleChange: {
        fns: [{
          fn(...argv) { console.log(1, argv) },
        }],
      },
    },
  }],
}, {
  dropDown: {
    items: [{
      key: '1',
      text: '发邮件',
      icon: 'mail',
      href: 'alipay.com',
    }, {
      key: '2',
      text: '逛淘宝',
      icon: 'appstore',
      href: 'taobao.com',
      target: '_blank',
    }, {
      key: '3',
      text: '禁用',
      icon: 'appstore',
      href: 'taobao.com',
      target: '_blank',
      disabled: true,
    }],
  },
})