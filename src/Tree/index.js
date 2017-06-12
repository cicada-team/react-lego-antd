import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import exist from '@alipay/cicada-render/lib/exist'
import Scope from '@alipay/cicada-render/lib/components/Scope'
import { id, compose } from '../util'
import { Children } from '../lego'
import {
  noop,
} from '../common'

/*
 identifier
 */
export const identifiers = {
  Presenter: id(noop),
}

/*
 props
 */
export const defaultState = {
  value: [],
  selectable: true,
  focusedPath: '',
  editMode: false,
  focusedInEdit: false,
}

export const stateTypes = {
  value: PropTypes.array,
  selectable: PropTypes.bool,
  focusedPath: PropTypes.string,
  editMode: PropTypes.bool,
  focusedInEdit: PropTypes.bool,
}


/*
 reduce functions
 */
export const defaultListeners = {
  onCheck({ state }, statePath) {
    const newState = { ...state, value: [...state.value] }
    const origin = exist.get(newState, statePath)
    origin.checked = true
    return newState
  },
  onUncheck({ state }, statePath) {
    const newState = { ...state, value: [...state.value] }
    const origin = exist.get(newState, statePath)
    origin.checked = false
    return newState
  },
  onExpand({ state }, statePath) {
    const newState = { ...state, value: [...state.value] }
    const origin = exist.get(newState, statePath)
    origin.expanded = true
    return newState
  },
  onFold({ state }, statePath) {
    const newState = { ...state, value: [...state.value] }
    const origin = exist.get(newState, statePath)
    origin.expanded = false
    return newState
  },
  onFocus({ state }, statePath) {
    return {
      ...state,
      focusedPath: statePath,
    }
  },
}

function renderTreeNode(tree, presenter, currentStatePath, listeners, parentPath, config = {}) {
  const { checked = false, expanded = true, isLeaf, children = [], disableCheckbox = false } = tree
  const absoluteStatePath = parentPath === undefined ? currentStatePath : `${parentPath}.${currentStatePath}`

  const onCheckChange = () => {
    if (disableCheckbox) {
      return
    }
    if (!checked) {
      listeners.onCheck(absoluteStatePath)
    } else {
      listeners.onUncheck(absoluteStatePath)
    }
  }

  const onFocus = () => listeners.onFocus(absoluteStatePath)

  const checkboxClass = classNames({
    'ant-tree-checkbox': true,
    'ant-tree-checkbox-checked': checked,
    'ant-tree-checkbox-disabled': disableCheckbox,
  })

  const checkbox = config.selectable ? (
    <span className={checkboxClass} onClick={onCheckChange}>
      <span className="ant-tree-checkbox-inner" />
    </span>
  ) : null

  let disabled = false
  if (config.editMode && (config.focusedPath !== currentStatePath || !config.focusedInEdit)) {
    disabled = true
  }

  const focusStyle = classNames({
    'ant-tree-node-selected': config.focusedPath === currentStatePath,
  })
  const presenterNode = presenter === undefined ? (tree.value) : React.cloneElement(presenter, { disabled })
  const finalPresenter = <a onClick={onFocus} className={focusStyle}>{presenterNode}</a>

  const subTreeNode = expanded ? children.map((subTree, i) => {
    const relativePath = `children.${i}`
    return (
      <Scope relativeChildStatePath={relativePath} key={i}>
        {renderTreeNode(subTree, presenter, relativePath, listeners, absoluteStatePath, config)}
      </Scope>
    )
  }) : null

  // 如果是叶子节点或者子节点长度为0，不展示下拉箭头
  const expandableChildren = isLeaf === undefined ? (typeof children !== 'string' && children.length !== 0) : !isLeaf

  const switcherClass = classNames({
    'ant-tree-switcher': true,
    [`ant-tree-noline_${expanded ? 'open' : 'close'}`]: expandableChildren,
  })

  const onExpandChange = () => {
    if (expanded) {
      listeners.onFold(absoluteStatePath)
    } else {
      listeners.onExpand(absoluteStatePath)
    }
  }
  const switcher = (<span className={switcherClass} onClick={onExpandChange} />)

  return (
    <li>
      {switcher}
      {checkbox}
      {finalPresenter}
      <ul className="ant-tree-child-tree ant-tree-child-tree-open">
        {subTreeNode}
      </ul>
    </li>
  )
}

/*
 render
 */
export function render({ state, listeners, children }) {
  const { value, ...config } = state
  const presenter = compose(Children.find, Children.hasChildren)(children, identifiers.Presenter) ? (Children.findChildren(children, identifiers.Presenter)[0]) : undefined

  return (
    <ul className="ant-tree">
      {value.map((tree, i) => (
        <Scope relativeChildStatePath={`value.${i}`} key={i}>
          {renderTreeNode(tree, presenter, `value.${i}`, listeners, undefined, config)}
        </Scope>
      ))}
    </ul>
  )
}
