import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Steps',
    bind: 'steps',
    props: {
      current: 1,
    },
    children: [{
      type: 'Steps.Title',
      children: [{
        type: 'span',
        interpolation: {},
        children: ['${title}'],
      }],
    }, {
      type: 'Steps.Description',
      children: [{
        type: 'span',
        interpolation: {},
        children: ['${description}'],
      }],
    }],
  }],
}, {
  steps: {
    steps: [{
      title: 'title 1',
      description: 'description 1',
      iconType: 'user',
    }, {
      title: 'title 2',
      description: 'description 2',
      iconType: 'solution',
    },
      {
        title: 'title 3',
        description: 'description 3',
        iconType: 'credit-card',
      }],
  },
})
