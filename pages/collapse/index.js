import render from '../../util/render'

export default () => render({
  type: 'Collapse',
  bind: 'collapse',
  children: [{
    type: 'Collapse.Extra',
    children: [{
      type: 'Icon',
      bind: 'd',
      getInitialState: () => ({
        type: 'delete',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn({ store, statePath }) {
              const collapse = store.get('collapse')
              console.log('icon click statePath', statePath.toString())
              const items = collapse.items.filter((item, index) => index !== parseInt(statePath.get(-2), 10))
              store.merge('collapse', { items })
            },
          }],
        },

      },
    }],
  }, {
    type: 'Collapse.Panel',
    children: [{
      type: 'Input',
      bind: 'content',
      listeners: {
        onChange: {
          fns: [{
            fn({ statePath }) {
              console.log('statePath', statePath.toString())
            },
          }],
        },
      },
    }, {
      type: 'Collapse',
      bind: 'collapseInner',
      children: [{
        type: 'Collapse.Panel',
        children: [{
          type: 'div',
          children: ['子内容'],
        }],
      }],
    }],
  }],
}, {
  collapse: {
    activeKey: ['one'],
    items: [{
      key: 'one',
      header: 'one',
      content: {
        value: 'content1',
      },
      collapseInner: {
        activeKey: ['inner_one'],
        items: [{
          key: 'inner_one',
          header: 'inner one',
          content: {
            value: 'content11',
          },
        }, {
          key: 'inner_two',
          header: 'inner two',
          content: {
            value: 'content22',
          },
        }],
      },
    }, {
      key: 'two',
      header: 'two',
      content: {
        value: 'content2',
      },
    }, {
      key: 'Three',
      header: 'Three',
      content: {
        value: 'content3',
      },
    }, {
      key: 'Four',
      header: 'Four',
      content: {
        value: 'content4',
      },
    }],
  },
})
