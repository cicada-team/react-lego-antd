import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Tabs',
    bind: 'tabs',
    listeners: {
      onAdd: {
        fns: [{
          fn({ state }) {
            return {
              ...state,
              items: state.items.concat({
                title: {
                  value: 'title3',
                },
                content: {
                  value: 'content3',
                },
              }),
            }
          },
        }],
      },
      onDelete: {
        fns: [{
          fn({ state }, key) {
            return {
              ...state,
              items: state.items.filter((item, index) => (item.key !== undefined ? (item.key !== key) : (String(index) !== key))),
            }
          },
        }],
      },
    },
    children: [{
      type: 'Tabs.Title',
      children: [{
        type: 'span',
        interpolation: {},
        children: ['${title.value}'],
      }],
    }, {
      type: 'Tabs.Content',
      children: [{
        type: 'Input',
        bind: 'content',
      }],
    }],
  }, {
    type: 'h2',
    children: ['tabs 嵌套'],
  }, {
    type: 'Tabs',
    bind: 'tabs2',
    children: [{
      type: 'Tabs.Title',
      children: [{
        type: 'span',
        interpolation: {},
        children: ['${title.value}'],
      }],
    }, {
      type: 'Tabs.Content',
      children: [{
        type: 'Tabs',
        bind: 'tabs3',
        children: [{
          type: 'Tabs.Title',
          children: [{
            type: 'span',
            interpolation: {},
            children: ['${title.value}'],
          }],
        }, {
          type: 'Tabs.Content',
          children: [{
            type: 'Input',
            bind: 'content',
          }],
        }],
      }],
    }],
  }],
}, {
  tabs: {
    editable: true,
    hideAdd: false,
    items: [{
      title: {
        value: 'title1',
      },
      content: {
        value: 'content1',
      },
    }, {
      title: {
        value: 'title2',
      },
      content: {
        value: 'content2',
      },
    }],
  },

  tabs2: {
    items: [{
      title: {
        value: 'title2',
      },
      tabs3: {
        items: [{
          title: {
            value: 'title3',
          },
          content: {
            value: 'content3',
          },
        }, {
          title: {
            value: 'title4',
          },
          content: {
            value: 'content3',
          },
        }],
      },
    }],
  },
})
