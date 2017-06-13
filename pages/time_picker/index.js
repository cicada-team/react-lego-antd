import render from '../../util/render'

export default () => render({
  children: [{
    type: 'TimePicker',
    bind: 'timePicker',
    getInitialState: () => ({
      disabled: false,
      format: 'HH:mm',
      placeholder: 'test',
    }),
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(1, argv) },
        }],
      },
    },
  }],
})
