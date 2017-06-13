import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Popconfirm',
    props: {
      text: 'button',
      title: '确认删除吗？',
    },
    listeners: {
      onConfirm: {
        fns: [{
          fn(...argv) { console.log(arguments) },
        }],
      },
    },
    children: [
      {
        type: 'Link',
        props: {
          href: 'http://www.baidu.com',
          target: '_blank',
          padding: '50px',
          color: 'blue',
          text: '测试链接',
        },
      },
    ],
  }],
})
