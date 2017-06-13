import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Switch',
    bind: 's1',
    initialState: {
      checkedChildren: '开启',
      unCheckedChildren: '关闭',
    },
  }, {
    type: 'Switch',
    bind: 's2',
  }, {
    type: 'Switch',
    bind: 's3',
  }],
}, {
  s1: {
    checked: true,
  },
  s2: {
    disabled: true,
  },
  s3: {
    size: 'small',
  },
})
