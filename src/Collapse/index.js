import React from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'antd'
import Scope from '@alipay/cicada-render/lib/components/Scope'
import { id, compose } from '../util'
import { Children } from '../lego'
import {
  noop,
} from '../common'

const Panel = Collapse.Panel

/*
 props
 */
export const defaultState = {
  activeKey: undefined,
  items: [],
}

export const stateTypes = {
  activeKey: PropTypes.array,
  items: PropTypes.array,
}

function remove(arr = [], item) {
  return arr.filter(current => current !== item)
}

function toggle(arr = [], item) {
  return arr.includes(item) ? remove(arr, item) : arr.concat(item)
}

function uuid() {
  return `${Date.now()}-${Math.random()}`
}

/*
 reduce functions
 */
export const defaultListeners = {
  onChange({ state }, key) {
    return {
      ...state,
      activeKey: toggle(state.activeKey, key),
    }
  },
}

/*
 identifier
 */
export const identifiers = {
  Panel: id(noop),
  Extra: id(noop),
}

function ensureArray(obj) {
  return Array.isArray(obj) ? obj : [obj]
}

const renderCollapsePanel = (item, index, children, salt, listeners) => {
  // CAUTION 如果数据里面没有 key, 说明 key 用户不需要在一开始就打开这个 collapse。之后动态插入或者删除也不会有影响。
  const key = item.key === undefined ? uuid() : item.key
  // CAUTION 如果没有 key，必须用这种方式加上，否则 collapse 打不开。以后强制要有 key。
  if (item.key === undefined) {
    /* eslint-disable no-console*/
    console.warn('collapse items must have a key property in every item.')
    item.key = key
  }
  const extraPosition = { position: 'absolute', right: 5, top: 0 }
  const header = (
    <Scope relativeChildStatePath={`items.${index}`}>
      <div style={{ position: 'relative' }} onClick={(e) => { listeners.onChange(key); e.stopPropagation() }}>
        { item.header }
        { compose(Children.find, Children.hasChildren)(children, identifiers.Extra) ? (
          <div style={extraPosition} >
            {React.cloneElement(Children.findChildren(children, identifiers.Extra)[0])}
          </div>
        ) : null}
      </div>
    </Scope>
  )
  const panel = Children.has(children, identifiers.Panel) ? Children.findChildren(children, identifiers.Panel) : []
  return (
    <Panel header={header} key={`${key}`}>
      <Scope relativeChildStatePath={`items.${index}`}>
        <div>
          {ensureArray(panel).map(c => React.cloneElement(c))}
        </div>
      </Scope>
    </Panel>
  )
}

/*
 render
 */
export function render({ state, listeners, children }) {
  const salt = Date.now().toString()
  const { activeKey = [] } = state
  // CAUTION 以前给 activeKey 加上 salt 是因为用户可能动态删了某个 collapse 又动态加上,就会出现乱动的情况
  // const activeKeyWithSalt = activeKey.map(key => `${key}_${salt}`)
  return (
    <Collapse {...state} {...listeners} activeKey={activeKey}>
      { state.items.map((item, index) => renderCollapsePanel(item, index, children, salt, listeners)) }
    </Collapse>
  )
}
