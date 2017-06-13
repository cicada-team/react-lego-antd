import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { omit } from '../util'
import { ErrorWrongChildType, ErrorUnknownChildType } from '../errors'
import { noop } from '../common'

const { SubMenu, ItemGroup, Item } = Menu
const THEME = ['light', 'dark']
const MODE = ['vertical', 'horizontal', 'inline']
const TYPE_ITEM = 'item'
const TYPE_GROUP = 'group'
const TYPE_MENU = 'menu'

export const getDefaultState = () => ({
  theme: THEME[0],
  mode: MODE[0],
  selectedKeys: [],
  openKeys: [],
  items: [],
  inlineIndent: 24,
  multiple: false,
})

export const stateTypes = {
  theme: PropTypes.oneOf(THEME),
  mode: PropTypes.oneOf(MODE),
  selectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  items: PropTypes.array,
  inlineIndent: PropTypes.number,
  multiple: PropTypes.bool,
}

export const defaultListeners = {
  onClick: noop,
  onTitleClick: noop,
  onSelect: (_, { selectedKeys }) => {
    return {
      selectedKeys,
    }
  },
  onDeselect: (_, { selectedKeys }) => {
    return {
      selectedKeys,
    }
  },
  onOpenChange: (_, openKeys) => {
    return {
      openKeys,
    }
  },
}

function renderMenuItem(item, limit, parent, parentIndexNum, listeners) {
  const parentIndex = String(parentIndexNum)
  const { type = TYPE_ITEM, disabled = false, text = '', children = [], key = parentIndex, icon, href, target = '_self' } = item
  if (limit !== undefined && !limit.includes(type)) throw new ErrorWrongChildType(type, parent)
  let result
  if (type === TYPE_ITEM) {
    const iconNode = icon ? <Icon type={icon} /> : null
    const textNode = href === undefined ? text : (<a href={href} target={target}>{iconNode}{text}</a>)
    result = <Item key={key} disabled={disabled}>{textNode}</Item>
  } else if (type === TYPE_MENU) {
    const iconNode = icon ? <Icon type={icon} /> : null
    const textNode = href === undefined ? (<span>{iconNode}{text}</span>) : (<a href={href} target={target}>{iconNode}{text}</a>)
    result = (
      <SubMenu onTitleClick={listeners.onTitleClick} title={textNode} key={key}>
        {children.map((i, index) => renderMenuItem(i, [TYPE_ITEM, TYPE_GROUP, TYPE_MENU], type, `${key}.${index}`, listeners))}
      </SubMenu>
    )
  } else if (type === TYPE_GROUP) {
    result = (
      <ItemGroup title={text} key={key}>
        {children.map((i, index) => renderMenuItem(i, [TYPE_ITEM, TYPE_MENU], type, `${key}.${index}`, listeners))}
      </ItemGroup>
    )
  } else {
    throw new ErrorUnknownChildType(type)
  }
  return result
}

export function render({ state, listeners }) {
  const props = omit(state, ['items'])
  return (
    <Menu {...omit(listeners, ['onTitleClick'])} {...props}>
      {state.items.map((i, index) => renderMenuItem(i, undefined, TYPE_MENU, index, listeners))}
    </Menu>
  )
}
