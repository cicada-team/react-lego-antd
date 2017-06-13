import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Input',
    bind: 'input',
    props: {
      placeholder: '这里输入forbid就可以阻止上传',
    },
  }, {
    type: 'Upload',
    bind: 'upload',
    interceptors: {
      beforeUpload: ({ store, util }, ...argv) => {
        console.log(argv)
        const forbid = store.get('input.value') === 'forbid'
        if (forbid) {
          util.message.warn('不准上传')
        } else {
          util.message.success('开始上传')
        }
        return !forbid
      },
    },
    listeners: {
      onChange: {
        fns: [{
          fn({ state }, { fileList }) {
            fileList.map(file => file.url = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
          },
        }],
      },
    },
  }],
})
