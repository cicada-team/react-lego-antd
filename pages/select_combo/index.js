import render from '../../util/render'

export default () => render({
  children: [{
    type: 'SelectCombo',
    bind: 'selectCombo',
    props: {
      disabled: false,
      showSearch: true,
      optionFilterProp: 'children',
      allowClear: true,
      placeholder: 'test',
      notFoundContent: '没有数据',
      dropdownMatchSelectWidth: false,
      defaultActiveFirstOption: false,
    },
    interceptors: {
      filterOption: ({ store, util }, inputValue, option) => {
        return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      },
    },
    listeners: {
      onSearch: {
        fns: [{
          fn({ store, statePath}) {
            setTimeout(()=>{
              const selectCombo = store.get(statePath)
              selectCombo.options = [{label:'你好',value:'bbb'}]
              store.set(statePath, selectCombo)
            }, 1000)
          },
        }],
      },
    },
  }],
}, {
  selectCombo: {
    status: 'error',
    options: [{
      value: 'Jim',
      label: 'Jim Dunken',
    }, {
      value: 'Tom',
      label: 'Tom Dunken',
    }, {
      type: 'group',
      label: 'Other Family',
      children: [{
        value: 'Tom2',
        label: 'Tom2 Dunken',
      }, {
        value: 'Tom3',
        label: 'Tom3 Dunken',
      }],
    }],
  },
})
