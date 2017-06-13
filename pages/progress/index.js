import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Progress',
    getInitialState: () => ({
      percent: 100,
    }),
  }, {
    type: 'Progress',
    getInitialState: () => ({
      percent: 30,
      status: 'active',
    }),
  }, {
    type: 'Progress',
    getInitialState: () => ({
      type: 'circle',
      percent: 30,
      status: 'active',
      width: 32,
    }),
  }, {
    type: 'Progress',
    getInitialState: () => ({
      type: 'circle',
      percent: 30,
      status: 'active',
      format(percent) {
        return `${percent} Days`
      },
    }),
  }],
})
