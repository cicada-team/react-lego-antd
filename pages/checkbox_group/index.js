import render from '../../util/render'
export default () => render({
  children: [{
    type: 'CheckboxGroup',
    bind: 'checkboxGroup',
    getInitialState: () => ({
      required: true,
      label: '标签名称',
    }),
    listeners: {
      onChange: {
        fns: [{
          fn({ store, statePath }) {
            console.log(arguments)
          },
        }],
      },
    },
  }],
}, {
  checkboxGroup: {
    items: [{
      label: 'a',
      value: 'a',
    }, {
      label: 'b',
      value: 'b',
    }, {
      label: 'c',
      value: 'c',
      disabled: true,
    }, {
      label: 'd',
      value: 'd',
    }, {
      label: 'e',
      value: 'e',
    }],
  },
})