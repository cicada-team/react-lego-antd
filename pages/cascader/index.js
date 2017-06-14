import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Cascader',
    bind: 'cascader',
    getInitialState: () => ({
      align: 'center',
      text: '标签测试',
      placeholder: '请选择',
      changeOnSelect: true,
      showSearch: true,
      size: 'small',
      style: {
        width: 400,
      },
      options: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake',
          }],
        }],
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [],
        }],
      }],
    }),
    intercepters: {
      displayRender: (_, label) => {
        return label.join(' . ')
      },
    },
  }],
}, {
  cascader: {
    value: ['zhejiang', 'hangzhou', 'xihu'],
  },
})
