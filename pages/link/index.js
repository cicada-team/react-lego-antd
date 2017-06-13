import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Link',
    bind: 'input',
    props: {
      href: 'http://www.baidu.com',
      target: '_blank',
      padding: '50px',
      color: 'blue',
      text: '测试链接',
    },
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(1, argv) },
        }],
      },
    },
  }],
})