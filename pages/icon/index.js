import render from '../../util/render'

export default () => render({
  children: [
    {
      type: 'Icon',
      getInitialState: () => ({
        type: 'left',
        size: '16',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn() {
            },
          }],
        },
      },
    }, {
      type: 'Icon',
      getInitialState: () => ({
        type: 'up',
        size: '18',
        color: 'red',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn() {
            },
          }],
        },
      },
    },
    {
      type: 'Icon',
      getInitialState: () => ({
        type: 'question',
        spin: true,
        size: '24',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn() {

            },
          }],
        },
      },
    },
  ],
})
