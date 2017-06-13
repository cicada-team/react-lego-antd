import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Textarea',
    bind: 'text',
    getInitialState: () => ({
      placeholder: 'test input',
      disabled: true,
      minRows: 10,
      maxRows: 20,
    }),
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(1, argv) },
        }],
      },
    },
  }, {
    type: 'Textarea',
    bind: 'text2',
    getInitialState: () => ({
      placeholder: 'test input',
      label: 'name',
      labelCol: {
        span: 4,
        offset: 0,
      },
    }),
  }, {
    type: 'Textarea',
    bind: 'text3',
    getInitialState: () => ({
      placeholder: 'test input',
      label: 'name',
      status: 'error',
      message: 'enter name please',
    }),
  }, {
    type: 'Textarea',
    bind: 'textToSubmit',
    getInitialState: () => ({
      placeholder: 'test input',
      label: '多行数据提交',
    }),
  }, {
    type: 'Button',
    bind: 'button',
    getInitialState: () => ({
      text: '提交',
    }),
    listeners: {
      onClick: {
        fns: [{
          fn({ util, store }) {
            util.service.call({ name: 'queryAppInfo', query: '{a, b}' }, { content: store.get('textToSubmit.value'), context: { a: 1, b: { c: [{ d: 'some' }] } } })
          },
        }],
      },
    },
  }],
})
