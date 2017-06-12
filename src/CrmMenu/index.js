import React from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'
import { Icon } from 'antd'
import classNames from 'classnames'
import exist from '@alipay/cicada-render/lib/exist'

const prefixCls = 'crm-menu'

const DIRECTIONS = ['vertical', 'horizontal']

/*
 props
 */
export const defaultState = {
  items: [],
  focusedPath: undefined,
  direction: DIRECTIONS[0],
  menuExpand: true,
  style: {},
}

export const stateTypes = {
  items: PropTypes.array,
  focusedPath: PropTypes.string,
  direction: PropTypes.oneOf(DIRECTIONS),
  menuExpand: PropTypes.bool,
  style: PropTypes.object,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onExpand({ state }, statePath) {
    const newState = cloneDeep(state)
    const origin = exist.get(newState, statePath)
    origin.expanded = true
    newState.focusedPath = statePath
    return newState
  },
  onFold({ state }, statePath) {
    const newState = cloneDeep(state)
    const origin = exist.get(newState, statePath)
    origin.expanded = false
    newState.focusedPath = statePath
    return newState
  },
  onMenuFlex({ state }) {
    return {
      ...state,
      menuExpand: !state.menuExpand,
    }
  },
  onItemExpand({ state }, statePath) {
    const newState = cloneDeep(state)
    const origin = exist.get(newState, statePath)
    origin.view = true
    return newState
  },
  onItemFold({ state }, statePath) {
    const newState = cloneDeep(state)
    const origin = exist.get(newState, statePath)
    origin.view = false
    return newState
  },
}

function renderFlexButton(state, listeners) {
  const { menuExpand } = state
  const onExpandChange = () => {
    listeners.onMenuFlex()
  }

  const type = menuExpand ? 'menu-fold' : 'menu-unfold'

  return (<li className={`${prefixCls}-toggle`} onClick={onExpandChange}>
    <Icon type={type} />
  </li>)
}

function renderNodeExpand(menu, currentStatePath, parentPath, state = {}, listeners, i) {
  const { focusedPath, direction } = state
  const { expanded = true, children = [], text, icon, iconUrl, href, target = '_self' } = menu
  const absoluteStatePath = parentPath === undefined ? currentStatePath : `${parentPath}.${currentStatePath}`

  const itemStyle = classNames({
    [`${prefixCls}-submenu-item`]: true,
    [`${prefixCls}-submenu-item-${direction}`]: true,
    [`${prefixCls}-submenu-item-${direction}-selected`]: focusedPath === absoluteStatePath,
    [`${prefixCls}-submenu-item-${direction}-selected-children`]: focusedPath && focusedPath !== absoluteStatePath && focusedPath.indexOf(absoluteStatePath) > -1,
  })

  const arrow = expanded ? 'down' : 'up'

  const onExpandChange = () => {
    if (expanded) {
      listeners.onFold(absoluteStatePath)
    } else {
      listeners.onExpand(absoluteStatePath)
    }
  }

  /* eslint-disable */
  const finalPresenter = (<a href={href ? href: 'javascript:void(0)'} target={target} className={itemStyle} onClick={onExpandChange}>
    {
      (icon !== undefined || iconUrl !==undefined) && <div className={`${prefixCls}-submenu-item-icon`}>
        {
          icon && <Icon type={icon} />
        }
        {
          iconUrl && <img className={`${prefixCls}-submenu-item-icon-img`} src={iconUrl} />
        }
      </div>
    }
    {text}
    {
      children.length !== 0 && <div className={`${prefixCls}-submenu-item-arrow`}>
        <Icon type={arrow} />
      </div>
    }
  </a>)

  const subTreeNode = expanded ? children.map((subMenu, i) => {
    const relativePath = `children.${i}`
    return renderNodeExpand(subMenu, relativePath, absoluteStatePath, state, listeners, i)
  }) : null

  const subMenuStyle = classNames({
    [`${prefixCls}-submenu`] : true,
    [`${prefixCls}-submenu-vertical`]: direction === DIRECTIONS[0],
    [`${prefixCls}-submenu-horizontal`]: direction === DIRECTIONS[1],
  })

  return (
    <li className={subMenuStyle} key={i}>
      {finalPresenter}
      <ul className={`${prefixCls}-submenu-children`}>
        {subTreeNode}
      </ul>
    </li>
  )
}

function renderNodeFold(menu, currentStatePath, parentPath, state = {}, listeners, i) {
  const { focusedPath, direction, menuExpand } = state
  const { expanded = true, children = [], text, icon, href, target = '_self', view = false } = menu
  const absoluteStatePath = parentPath === undefined ? currentStatePath : `${parentPath}.${currentStatePath}`

  const onExpandChange = () => {
    if (expanded) {
      listeners.onFold(absoluteStatePath)
    } else {
      listeners.onExpand(absoluteStatePath)
    }
  }

  const onItemFlex = (expand) => ()=> {
    if(expand) {
      listeners.onItemExpand(absoluteStatePath)
    }else{
      listeners.onItemFold(absoluteStatePath)
    }
  }

  const itemStyle = classNames({
    [`${prefixCls}-submenu-item`]: true,
    [`${prefixCls}-submenu-item-${direction}`]: true,
    [`${prefixCls}-submenu-item-${direction}-fold`]: menuExpand === false,
    [`${prefixCls}-submenu-item-${direction}-selected`]: focusedPath === absoluteStatePath,
  })

  const finalPresenter = (<a
    /* eslint-disable */
    href={href ? href:'javascript:void(0)'}
    target={target}
    className={itemStyle}
    onClick={onExpandChange}
    onMouseEnter={onItemFlex(true)}
    onMouseLeave={onItemFlex(false)}
  >
    {
      icon !== undefined && <div className={`${prefixCls}-submenu-item-icon`}>
        <Icon type={icon} />
      </div>
    }
    {
      view === true && <div className={`${prefixCls}-submenu-item-${direction}-fold-view`}>
        <a className={`${prefixCls}-submenu-item-${direction}-fold-view-item`}>{text}</a>
        {
          children.map((subMenu, key) =>
            (<a
              key={key}
              href={subMenu.href ? subMenu.href: '#'}
              target={subMenu.target}
              className={`${prefixCls}-submenu-item-${direction}-fold-view-item`}
            >
              {subMenu.text}
            </a>)
          )
        }
      </div>
    }
  </a>)

  const subMenuStyle = classNames({
    [`${prefixCls}-submenu`] : true,
    [`${prefixCls}-submenu-vertical`]: direction === DIRECTIONS[0],
    [`${prefixCls}-submenu-horizontal`]: direction === DIRECTIONS[1],
  })

  return (
    <li className={subMenuStyle} key={i}>
      {finalPresenter}
    </li>
  )
}

/*
 render
 */
export function render({ state, listeners }) {
  const { items, direction, menuExpand } = state

  const isVertical = direction === DIRECTIONS[0]
  const isFold = menuExpand === false

  const classname = classNames({
    [`${prefixCls}`]: true,
    [`${prefixCls}-vertical`]: isVertical,
  })

  const style = Object.assign({
    'background': isVertical ? '#f7f7f7' : '#3A3C45',
    'fontSize': '14px',
  }, state.style)

  return (
    <ul className={classname} style={{ ...style }}>
      {
        isVertical === true && renderFlexButton(state, listeners)
      }
      {items.map((subMenu, i) => {
        const args = [subMenu, `items.${i}`, undefined, state, listeners, i]
        return isFold === true && isVertical === true ? renderNodeFold(...args) : renderNodeExpand(...args)
      })}
    </ul>
  )
}
