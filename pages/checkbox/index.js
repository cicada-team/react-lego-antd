import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Checkbox',
    bind: 'check',
    props: {
      indeterminate: false,
    },
  }, {
    type: 'h3',
    children: ['Repeat'],
  }, {
    type: 'Repeat',
    bind: 'list',
    children: [{
      type: 'Checkbox',
      bind: 'sub',
    }],
  }],
}, {
  check: {
    checked: true,
    text: 'apple',
  },
  list: {
    items: [{
      sub: {
        checked: true,
        text: 'banana',
      },
    }, {
      sub: {
        checked: false,
        disabled: true,
        text: 'pan',
      },
    }, {
      sub: {
        checked: true,
        text: 'pea',
      },
    }, {
      sub: {
        checked: false,
        text: 'bean',
      },
    }],
  },
})
