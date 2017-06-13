import render from '../../util/render'

const treeData = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
}]

const initialState = {
  treeSelect: {
    treeData,
  },
}

const config = {
  children: [{
    type: 'TreeSelect',
    bind: 'treeSelect',
    props: {
      placeholder: 'test',
    },
    listeners: {
      onClick: {
        fns: [{
          fn(...args) { console.log(args) },
        }],
      },
    },
  }],
}

export default () => render(config, initialState)
