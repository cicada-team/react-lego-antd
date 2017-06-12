import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import Scope from '@alipay/cicada-render/lib/components/Scope'
import { id } from '../util'
import { Children } from '../lego'
import {
  keep,
  noop,
  SIZES,
} from '../common'

const Pane = Tabs.TabPane
const TYPES = ['line', 'card']
const POSITIONS = ['top', 'right', 'bottom', 'left']
/*
 identifier
 */
export const identifiers = {
  Title: id(noop),
  Content: id(noop),
}

/*
 state
 */
export const defaultState = {
  activeKey: undefined,
  disabled: false,
  type: TYPES[0],
  editable: false,
  items: [],
  size: SIZES[0],
  position: POSITIONS[0],
  hideAdd: true,
  animated: true,
}

export const stateTypes = {
  activeKey: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  editable: PropTypes.bool,
  items: PropTypes.array,
  size: PropTypes.oneOf(SIZES),
  position: PropTypes.oneOf(POSITIONS),
  hideAdd: PropTypes.bool,
  animated: PropTypes.bool,
}

function ensureArray(obj) {
  return Array.isArray(obj) ? obj : [obj]
}

/*
 reduce functions
 */
export const defaultListeners = {
  onDelete: keep,
  onAdd: keep,
  onTabClick: keep,
  onChange({ state }, activeKey) {
    return {
      ...state,
      activeKey,
    }
  },
}

/*
 render
 */
export function render({ state, listeners, children }) {
  const onEdit = (key, type) => {
    if (type === 'add') {
      listeners.onAdd()
    } else {
      listeners.onDelete(key)
    }
  }

  const type = state.editable === true ? 'editable-card' : state.type
  const { hideAdd, items, animated } = state
  let { activeKey } = state
  if (items.length !== 0 && activeKey === undefined) {
    activeKey = items[0].key === undefined ? '0' : items[0].key
  }
  const title = Children.has(children, identifiers.Title) ? Children.findChildren(children, identifiers.Title) : []
  const content = Children.has(children, identifiers.Content) ? Children.findChildren(children, identifiers.Content) : []

  return (
    <Tabs hideAdd={hideAdd} animated={animated} onChange={listeners.onChange} activeKey={activeKey} onEdit={onEdit} type={type}>
      {items.map((item, index) => {
        const titleNode = (
          <Scope relativeChildStatePath={`items.${index}`}>
            {ensureArray(title).map(c => React.cloneElement(c))}
          </Scope>
        )
        const key = item.key === undefined ? String(index) : item.key
        return (
          <Pane tab={titleNode} key={key}>
            <Scope relativeChildStatePath={`items.${index}`}>
              <div>
                {ensureArray(content).map(c => React.cloneElement(c))}
              </div>
            </Scope>
          </Pane>
        )
      })}
    </Tabs>
  )
}
