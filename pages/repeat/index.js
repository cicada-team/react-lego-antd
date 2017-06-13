import render from '../../util/render'

export default () => render({
  type: 'div',
  children: [{
    type: 'Repeat',
    bind: 'list',
    children: [{
      type: 'Input',
      bind: 'name',
      listeners: {
        onChange: {
          fns: [{
            fn(...argv) { console.log(...argv) },
          }],
        },
      },
    }],
  }, { type: 'div', children: ['Repeat in Repeat'] }, {
    type: 'Repeat',
    bind: 'list2',
    children: [{
      type: 'Repeat',
      bind: 'inner_list',
      children: [{
        type: 'Input',
        bind: 'name',
      }],
    }],
  }],
}, {
  list: {
    items: [{
      name: {
        value: 'Jim',
      },
    }, {
      name: {
        value: 'Tom',
      },
    }, {
      name: {
        value: 'Jerry',
      },
    }],
  },
  list2: {
    items: [{
      inner_list: {
        items: [{
          name: {
            value: 'Tom2',
          },
        }, {
          name: {
            value: 'Tim2',
          },
        }],
      },
    }, {
      inner_list: {
        items: [{
          name: {
            value: 'Tom3',
          },
        }, {
          name: {
            value: 'Tim3',
          },
        }],
      },
    }],
  },
})
