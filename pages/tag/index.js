import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Tag',
    bind: 'tag1',
  }, {
    type: 'Tag',
    bind: 'tag2',
  }, {
    type: 'Tag',
    bind: 'tag3',
  }, {
    type: 'Tag',
    bind: 'tag4',
  }, {
    type: 'Tag',
    bind: 'tag5',
  }, {
    type: 'Tag',
    bind: 'tag6',
  }, {
    type: 'Tag',
    bind: 'tag7',
  }, {
    type: 'Tag',
    bind: 'tag8',
  }],
}, {
  tag1: {
    text: '周一',
    color: 'blue',
  },
  tag2: {
    text: '周二',
    color: 'green',
  },
  tag3: {
    text: '周二',
    color: 'yellow',
    closable: true,
  },
  tag4: {
    text: '周二',
    color: 'red',
  },
  tag5: {
    text: '周二',
    color: 'pink',
  },
  tag6: {
    text: '周二',
    color: 'orange',
  },
  tag7: {
    text: '周二',
    color: 'cyan',
  },
  tag8: {
    text: '周二',
    color: 'purple',
  },

})
