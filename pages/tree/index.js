import render from '../../util/render'

const treeNodes = [
  {
    key: '1',
    disabled: false,
    disableCheckbox: false,
    isLeaf: false,
    children: [
      {
        key: '1-1',
        disabled: false,
        disableCheckbox: false,
        isLeaf: false,
      },
      {
        key: '1-2',
        disabled: false,
        disableCheckbox: false,
        isLeaf: false,
        children: [
          {
            key: '1-2-1',
            disabled: false,
            disableCheckbox: false,
            isLeaf: true,
          },
          {
            key: '1-2-2',
            disabled: false,
            disableCheckbox: false,
            isLeaf: true,
          },
          {
            key: '1-2-3',
            disabled: false,
            disableCheckbox: false,
            isLeaf: true,
          },
        ]
      },
      {
        key: '1-3',
        disabled: false,
        disableCheckbox: false,
        isLeaf: false,
      },
    ]
  },
  {
    key: '2',
    disabled: true,
    disableCheckbox: true,
    isLeaf: false,
  },
  {
    key: '3',
    disabled: false,
    disableCheckbox: false,
    isLeaf: true,
    children: [
      {
        key: '3-1',
        disabled: false,
        disableCheckbox: false,
        isLeaf: false,
      },
      {
        key: '3-2',
        disabled: false,
        disableCheckbox: false,
        isLeaf: false,
      },
    ],
  },
]

const config = {
  children: [{
    type: 'div',
    children: [{
      type: 'Tree',
      getInitialState: () => ({
        items: treeNodes,
        multiple: false,
        checkable: true,
        defaultExpandAll: false,
        defaultExpandedKeys: ['3'],
        defaultCheckedKeys: ['1-2'],
        defaultSelectedKeys: ['3'],
        showLine: true,
      }),
    }],
  }],
}

export default () => render(config)
