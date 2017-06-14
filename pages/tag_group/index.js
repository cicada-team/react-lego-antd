import render from '../../util/render'

const list = [
  {
    text: '一',
    description: '周一',
    id: 111,
  }, {
    text: '二',
    description: '周二',
    id: 222,
  }, {
    text: '三',
    description: '周三',
    id: 333,
  },
]

const initialState = {
  tagGroup: {
    list,
  },
}

export default () => render({
  children: [
    {
      type: 'TagGroup',
      bind: 'tagGroup',
    },
  ],
}, initialState)
