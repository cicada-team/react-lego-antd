import render from '../../util/render'

export default () => render({
  children: [{
    type: 'DialogPreview',
    bind: 'dialog1',
    getInitialState: () => ({
      width: '300',
    }),
    children: [{
      type: 'DialogPreview.Title',
      children: ['title.'],
    }, {
      type: 'DialogPreview.Content',
      children: ['this is dialog content.', 'this is dialog content.', 'this is dialog content.'],
    }, {
      type: 'DialogPreview.Footer',
      children: ['footer'],
    }],
  }],
})
