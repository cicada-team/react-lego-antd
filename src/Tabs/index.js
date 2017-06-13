import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import Scope from '@cicada/render/lib/components/Scope'
import { Children } from '../lego'
import {
  noop,
  SIZES,
} from '../common'

const Pane = Tabs.TabPane
const TYPES = ['line', 'card']
const POSITIONS = ['top', 'right', 'bottom', 'left']

export const identifiers = {
  Title: {},
  Content: {},
}

export const getDefaultState = () => ({
  activeKey: undefined,
  disabled: false,
  type: TYPES[0],
  editable: false,
  items: [],
  size: SIZES[0],
  position: POSITIONS[0],
  hideAdd: true,
  animated: true,
})

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

export const defaultListeners = {
  onDelete: noop,
  onAdd: noop,
  onTabClick: noop,
  onChange({ state }, activeKey) {
    return {
      activeKey,
    }
  },
}

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
