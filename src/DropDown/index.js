import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon, Button } from 'antd'
import { pick, omit } from '../util'

const TRIGGER = ['hover', 'click']
const { Item } = Menu
const THEME = ['light', 'dark']
const MODE = ['vertical', 'horizontal', 'inline']
const TYPES = ['a', 'Button']
const PLACEMENTS = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']

export const getDefaultState = () => ({
  text: '',
  type: TYPES[0],
  trigger: TRIGGER[0],
  visible: false,
  items: [],
  theme: THEME[0],
  mode: MODE[0],
  placement: PLACEMENTS[0],
})

export const stateTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(TYPES),
  trigger: PropTypes.oneOf(TRIGGER),
  visible: PropTypes.bool,
  items: PropTypes.array,
  theme: PropTypes.oneOf(THEME),
  mode: PropTypes.oneOf(MODE),
  placement: PropTypes.oneOf(PLACEMENTS),
}

export const defaultListeners = {
  onVisibleChange() {},
  onClick() {},
}

function renderMenuItem(item, index) {
  const { disabled = false, text = '', key, icon, href, target = '_self' } = item
  const iconNode = icon ? <Icon type={icon} /> : null
  const textNode = (href === undefined || disabled) ? text : (<a href={href} target={target}>{iconNode}{text}</a>)
  return <Item key={key || index} disabled={disabled}>{textNode}</Item>
}

function renderChildren(type, text) {
  let Component
  if (type === 'Button') {
    Component = (<Button type="ghost" style={{ marginLeft: 8 }}>
      {text} <Icon type="down" />
    </Button>)
  } else {
    Component = (
      <a className="ant-dropdown-link" href="javascript:void(0)">
      {text} <Icon type="down" />
      </a>
    )
  }

  return Component
}

export function render({ state, listeners }) {
  const menu = (
    <Menu onClick={listeners.onClick} {...omit(state, ['items', 'visible', 'trigger', 'text', 'placement'])}>
      {state.items.map((item, index) => renderMenuItem(item, index))}
    </Menu>)

  const innerState = pick(state, ['placement'])
  innerState.trigger = Array.of(state.trigger)

  return (
    <Dropdown {...innerState} overlay={menu} onVisibleChange={listeners.onVisibleChange}>
      {renderChildren(state.type, state.text)}
    </Dropdown>
  )
}
