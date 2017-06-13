import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Radio',
    bind: 'radio',
    getInitialState: () => ({
      required: true,
      label: '标签名称',
    }),
  }],
}, {
  radio: {
    disabled: false,
    type: 'button',
    size: 'large',
    items: [{
      text: 'a',
      value: 'a',
      key: 'a',
    }, {
      text: 'b',
      value: 'b',
      key: '',
    }, {
      text: 'c',
      value: 'c',
      key: 'c',
      disabled: true,
    }, {
      text: 'd',
      value: 'd',
      key: 'd',
    }, {
      text: 'e',
      value: 'e',
      key: 'e',
    }],
  },
})
