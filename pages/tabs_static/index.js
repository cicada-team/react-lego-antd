import render from '../../util/render'

export default () => render({
  children: [{
    type: 'TabsStatic',
    children: [{
      type: 'TabsStatic.Group',
      children: [{
        type: 'TabsStatic.Title',
        children: [{
          type: 'span',
          children: ['one'],
        }],
      }, {
        type: 'TabsStatic.Content',
        children: [{
          type: 'Input',
          bind: 'content1',
        }],
      }],
    }, {
      type: 'TabsStatic.Group',
      children: [{
        type: 'TabsStatic.Title',
        children: [{
          type: 'span',
          children: ['two'],
        }],
      }, {
        type: 'TabsStatic.Content',
        children: [{
          type: 'Input',
          bind: 'content2',
        }],
      }],
    }],
  }],
}, {
  content1: {
    value: 'content1',
  },
  content2: {
    value: 'content2',
  },
})
