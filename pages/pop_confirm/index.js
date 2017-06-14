import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Popconfirm',
    getInitialState: () => ({
      text: 'button',
      title: '确认删除吗？',
    }),
    listeners: {
      onConfirm: {
        fns: [{
          fn(...argv) { console.log(argv) },
        }],
      },
    },
    children: [
      {
        type: 'Link',
        getInitialState: () => ({
          href: 'http://www.baidu.com',
          target: '_blank',
          padding: '50px',
          color: 'blue',
          text: '测试链接',
        }),
      },
    ],
  }],
})
