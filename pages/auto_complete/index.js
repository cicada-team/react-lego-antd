// TODO 未通过
import render from '../../util/render'
export default () => render({
  children: [
    {
      type: 'AutoComplete',
      bind: 'autoComplete',
      getInitialState: () => ({
        disabled: false,
        label: '文字',
        placeholder: '忽略大小写查询',
        labelCol: {
          span: 2,
        },
      }),
      intercepters: {
        filterOption: (_, inputValue, option) => {
          return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        },
      },
      listeners: {
        onSelect: {
          fns: [{
            fn({ store }, value) {
              console.log(value)
            },
          }],
        },
      },
    },
    {
      type: 'Button',
      getInitialState: () => ({
        text: '改值',
      }),
      listeners: {
        onClick: {
          fns: [{
            fn({ store }) {
              const autoComplete = store.get('autoComplete')
              autoComplete.value = '回填'
              store.set('autoComplete', autoComplete)
            },
          }],
        },
      },
    },
    {
      children: [
        {
          getInitialState: () => ({
            flex: '1',
            spacing: 'none',
          }),
          children: [
            {
              type: 'AutoComplete',
              bind: 'autoComplete2',
              getInitialState: () => ({
                disabled: false,
                label: '文字',
                placeholder: '带查询的搜索框',
                labelCol: {
                  span: 2,
                },
                wrapperCol: {
                  span: 22,
                }
              }),
              intercepters: {
                filterOption: ({ store, util }, inputValue, option) => {
                  return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                },
              },
              listeners: {
                onSelect: {
                  fns: [{
                    fn({ store }, value) {
                      console.log(value)
                    },
                  }],
                },
              },
            },
          ],
        }, {
          getInitialState: () => ({
            width: '200px',
            padding: '4px 0 0 4px',
          }),
          children: [
            {
              type: 'Icon',
              props: {
                size: '16',
                type: 'search',
              },
            },
          ]
        }
      ],
    },
  ],
}, {
  autoComplete: {
    options: [
      'Burns Bay Road',
      'Downing Street',
      'Wall Street',
    ],
  },
})