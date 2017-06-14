import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Input',
    bind: 'input',
    getInitialState: () => ({
      placeholder: '禁用',
      disabled: true,
      status: 'error',
      extra: 'Please select the correct date',
    }),
    listeners: {
      onClick: {
        fns: [{
          fn(...args) { console.log(args) },
        }],
      },
    },
    children: [
      {
        type: 'Input.Prefix',
        children: [
          {
            type: 'div',
            children: ['prefix'],
          },
        ],
      },
    ],
  }, {
    type: 'Input',
    bind: 'input2',
    getInitialState: () => ({
      required: true,
      placeholder: '只读',
      readOnly: true,
      label: 'name',
      labelCol: {
        span: 4,
        offset: 0,
      },
    }),
    children: [{
      type: 'Input.Suffix',
      children: [{
        type: 'Icon',
        getInitialState: () => ({
          type: 'lock',
        }),
        listeners: {
          onClick: {
            fns: [{
              fn(...args) { console.log(args) },
            }],
          },
        },
      }],
    }],
  }, {
    type: 'Input',
    bind: 'input3',
    getInitialState: () => ({
      placeholder: '异常',
      label: 'name',
      status: 'error',
      message: 'enter name please',
    }),
  }, {
    type: 'Input',
    bind: 'input4',
    getInitialState: () => ({
      placeholder: 'search',
      search: true,
      label: 'name',
    }),
    listeners: {
      onBlur: {
        fns: [{
          fn(...args) {
            console.log(args)
          },
        }],
      },
    },
  }, {
    type: 'Input',
    children: [{
      type: 'Input.Prefix',
      children: [{
        type: 'Select',
        getInitialState: () => ({
          options: [{ label: '.com', value: '.com' }, { label: '.cn', value: '.cn' }],
          value: '.cn',
          hasFormItemWrapper: false,
          style: {
            width: '80px',
          },
        }),
      }],
    }, {
      type: 'Input.Suffix',
      children: [{
        type: 'Select',
        getInitialState: () => ({
          options: [{ label: '.com', value: '.com' }, { label: '.cn', value: '.cn' }],
          value: '.com',
          hasFormItemWrapper: false,
          style: {
            width: '70px',
          },
        }),
      }],
    }],
  }],
})
