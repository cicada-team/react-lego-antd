import render from '../../util/render'

export default () => render({
  type: 'Card',
  getInitialState: () => ({
    title: 'Card Title',
  }),
  children: [{
    type: 'Card.Extra',
    children: [{
      type: 'a',
      children: ['more'],
    }],
  }, {
    type: 'Card.Content',
    children: [{
      type: 'p',
      children: ['chapter 1'],
    }, {
      type: 'p',
      children: ['chapter 2'],
    }, {
      type: 'p',
      children: ['chapter 3'],
    }],
  }],
})
