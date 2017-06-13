import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Spin',
    bind: 's1',
    getInitialState: () => ({
      tip: 'loading',
      delay: 2000,
    }),
    children: [{
      type: 'Table',
      bind: 't1',
      getInitialState: () => ({
        showHeader: true,
        pageSize: 3,
        size: 'small',
      }),
      children: [
        {
          type: 'Table.Column',
          bind: 'age',
          getInitialState: () => ({
            title: 'Age',
            dataIndex: 'age',
          }),
          children: [{
            type: 'Input',
            bind: 'age',
          }],
        },
      ],
    }],
  }, {
    type: 'Button',
    getInitialState: () => ({
      text: 'toggle spin',
    }),
    listeners: {
      onClick: {
        fns: [{
          fn({ store }) {
            store.set('s1.spinning', !store.get('s1.spinning', false))
          },
        }],
      },
    },

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
  t1: {
    list: [
      { age: { value: '1' } },
      { age: { value: '2' } },
      { age: { value: '3' } },
    ],
  },
})
