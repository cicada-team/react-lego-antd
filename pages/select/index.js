import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Select',
    bind: 'select',
    getInitialState: () => ({
      mode: 'combobox',
      disabled: false,
      showSearch: true,
      optionFilterProp: 'children',
      allowClear: true,
      placeholder: 'test',
      notFoundContent: '没有数据',
      dropdownMatchSelectWidth: false,
      defaultActiveFirstOption: false,
    }),
    intercepters: {
      filterOption: ({ store, util }, inputValue, option) => {
        return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      },
    },
    listeners: {
      onSearch: {
        fns: [{
          fn() { console.log() },
        }],
      },
    },
  }],
}, {
  select: {
    options: [{
      value: 'jim',
      label: 'Jim Dunken',
    }, {
      value: 'tom',
      label: 'Tom Dunken',
    }, {
      type: 'group',
      label: 'Other Family',
      children: [{
        value: 'tom2',
        label: 'Tom2 Dunken',
      }, {
        value: 'tom3',
        label: 'Tom3 Dunken',
      }],
    }],
  },
})
