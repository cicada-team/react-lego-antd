import render from '../../util/render'
export default () => render({
  children: [{
    type: 'InputNumber',
    bind: 'inputNumber',
    props: {
      min: 0,
      max: 10,
      step: 2,
    },
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(1, argv) },
        }],
      },
    },
  }, {
    type: 'InputNumber',
    bind: 'number',
  }],
}, {
  inputNumber: {
    value: 10,
  },
})
