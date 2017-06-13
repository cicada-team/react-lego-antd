import React from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd'
import { pick } from '../util'

const TreeNode = Tree.TreeNode

export const getDefaultState = () => ({
  items: [],
  multiple: false,
  checkable: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  expandedKeys: [],
  defaultCheckedKeys: [],
  checkedKeys: [],
  defaultSelectedKeys: [],
  selectedKeys: [],
  showLine: false,
})

export const stateTypes = {
  items: PropTypes.array,
  multiple: PropTypes.bool,
  checkable: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,
  defaultExpandedKeys: PropTypes.array,
  expandedKeys: PropTypes.array,
  defaultCheckedKeys: PropTypes.array,
  checkedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  showLine: PropTypes.bool,
}


export const defaultListeners = {
  onExpand({ state }, expandedKeys) {
    return {
      autoExpandParent: false,
      expandedKeys,
    }
  },
  onCheck({ state }, checkedKeys) {
    return {
      checkedKeys,
    }
  },
  onSelect({ state }, selectedKeys) {
    return {
      selectedKeys,
    }
  },
}


export function render({ state, listeners }) {
  const { items } = state

  const loop = data => data.map((item) => {
    if (item.children && item.children.length) {
      return (
        <TreeNode key={item.key} title={item.key} {...pick(item, ['disabled', 'disableCheckbox', 'isLeaf'])}>
          {loop(item.children)}
        </TreeNode>
      )
    }
    return (
      <TreeNode key={item.key} title={item.key} {...pick(item, ['disabled', 'disableCheckbox', 'isLeaf'])} />
    )
  })

  return (
    <Tree
      {...listeners}
      {...pick(state, ['multiple', 'checkable', 'defaultExpandAll', 'defaultExpandedKeys', 'defaultCheckedKeys', 'defaultSelectedKeys', 'showLine'])}
    >
      {loop(items)}
    </Tree>
  )
}
