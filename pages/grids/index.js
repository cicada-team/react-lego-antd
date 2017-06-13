import render from '../../util/render'

export default () => render({
  type: 'div',
  children: [{
    type: 'Grids',
    bind: 'grids',
  }, {
    type: 'Grids',
    bind: 'grids2',
    children: [{
      type: 'Grids.Grid',
      children: [{
        type: 'Input',
        bind: 'i',
        getInitialState: () => ({
          hasFormItemWrapper: false,
        }),
      }],
    }],
  }],
}, {
  grids: {
    data: [{
      label: '姓名',
      data: 'Jim',
    }, {
      label: '年龄',
      data: '22',
    }, {
      label: '性别',
      data: '男',
    }, {
      label: '住址',
      data: '支付宝',
    }, {
      label: '职业',
      data: '程序员',
    }, {
      label: '职位',
      data: '无',
    }, {
      label: '爱好',
      data: '篮球',
    }, {
      label: '其他',
      data: '很长的文案很长的文案很长的文案很长的文案很长的文案很长的文案很长的文案很长的文案很长的文案很长的文案很长的文案很长的文案',
    }],
    labelWidth: 100,
    dataMaxWidth: 300,
    columns: 2,
  },
  grids2: {
    data: [{
      label: '姓名',
      data: {
        i: {
          value: 'Jim',
        },
      },
    }, {
      label: '年龄',
      data: {
        i: { value: '22' },
      },
    }, {
      label: '性别',
      data: {
        i: { value: '男' },
      },
    }, {
      label: '住址',
      data: {
        i: { value: '支付宝' },
      },
    }, {
      label: '职业',
      data: {
        i: { value: '程序员' },
      },
    }, {
      label: '职位',
      data: {
        i: { value: '无' },
      },
    }, {
      label: '爱好',
      data: {
        i: { value: '篮球' },
      },
    }],
    columns: 2,
  },
})
