import render from '../../util/render'

export default () => render({
  type: 'ButtonGroup',
  children: [{
    type: 'Button',
    getInitialState: () => ({
      text: 'One',
    }),
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(1, argv) },
        }],
      },
    },
  }, {
    type: 'Button',
    getInitialState: () => ({
      text: 'Two',
    }),
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(2, argv) },
        }],
      },
    },
  }, {
    type: 'Button',
    getInitialState: () => ({
      text: 'Three',
    }),
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(3, argv) },
        }],
      },
    },
  }],
})
