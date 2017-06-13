// TODO 未通过
import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { Children } from '../lego'
import {
  SIZES,
} from '../common'

const Pane = Tabs.TabPane
const TYPES = ['card', 'line']
const POSITIONS = ['top', 'right', 'bottom', 'left']

export const identifiers = {
  Group: {},
  Title: {},
  Content: {},
}

export const getDefaultState = () => ({
  activeKey: undefined,
  disabled: false,
  type: TYPES[0],
  size: SIZES[0],
  position: POSITIONS[0],
})

export const stateTypes = {
  activeKey: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
  position: PropTypes.oneOf(POSITIONS),
}

export const defaultListeners = {
  onChange(_, activeKey) {
    return {
      activeKey,
    }
  },
}

export function render({ state, listeners, children }) {
  const groups = Children.filter(children, identifiers.Group)
  if (groups.length === 0) return null
  const { type, activeKey = 0 } = state

  return (
    <Tabs hideAdd onChange={listeners.onChange} activeKey={String(activeKey)} type={type}>
      {groups.map((group, index) => {
        const groupChildren = group.props.children
        const titleNode = Children.has(groupChildren, identifiers.Title) ? Children.findChildren(groupChildren, identifiers.Title) : null
        const contentNode = Children.has(groupChildren, identifiers.Content) ? Children.findChildren(groupChildren, identifiers.Content) : null
        return (
          <Pane tab={titleNode} key={String(index)}>
            {contentNode}
          </Pane>
        )
      })}
    </Tabs>
  )
}
