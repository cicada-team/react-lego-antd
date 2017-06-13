import render from '../../util/render'

const baseState = {
  mode: 'horizontal',
  theme: 'light',
  items: [{
    type: 'menu',
    text: '账单查询',
    icon: 'mail',
  }, {
    type: 'menu',
    text: '账单操作',
    icon: 'setting',
    children: [
      {
        type: 'menu',
        text: '选项一',
        children: [
          {
            text: '选项一',
          },
          {
            text: '选项二',
          },
        ],
      },
      {
        text: '选项二',
      },
    ],
  }, {
    type: 'menu',
    text: '账单操作2',
    icon: 'setting',
    children: [
      {
        type: 'group',
        text: '选项一',
        children: [
          {
            text: '选项一',
          },
          {
            text: '选项二',
          },
        ],
      },
      {
        text: '选项二',
      },
    ],
  }],
}

export default () => render({
  children: [{
    type: 'Menu',
    bind: 'menu',
    getInitialState: () => baseState,
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) {
            console.log(1, argv)
          },
        }],
      },
      onTitleClick: {
        fns: [{
          fn(...argv) {
            console.log(2, argv)
          },
        }],
      },
    },
  }],
}, {
  menu: {
    inlineIndent: 12,
    multiple: true,
    openKeys: ['1'],
    selectedKeys: ['1.1'],
  },
})
