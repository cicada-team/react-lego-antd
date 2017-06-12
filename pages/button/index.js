import render from '../../util/render'
export default () => render({
  children: [
    {
      type: 'Button',
      getInitialState: () => ({
        text: '普通按钮',
        type: 'normal',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn(...argv) {
              console.log(1, argv)
            },
          }],
        },
      },
    },
    {
      type: 'Button',
      getInitialState: () => ({
        loading: true,
        shape: 'circle',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn(...argv) {
              console.log(1, argv)
            },
          }],
        },
      },
    },
    {
      type: 'Button',
      getInitialState: () => ({
        text: '主题按钮',
        type: 'primary',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn(...argv) {
              console.log(1, argv)
            },
          }],
        },
      },
    },
    {
      type: 'Button',
      getInitialState: () => ({
        text: '图标按钮',
        icon: 'search',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn(...argv) {
              console.log(1, argv)
            },
          }],
        },
      },
    }
  ],
})