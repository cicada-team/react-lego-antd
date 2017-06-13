import React from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'antd'
import Scope from '@cicada/render/lib/components/Scope'
import {  compose } from '../util'
import { Children } from '../lego'

const Panel = Collapse.Panel

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

export const defaultListeners = {
  onChange({ state }, key) {
    console.log("change to key", toggle(state.activeKey, key), key)
    return {
      activeKey: toggle(state.activeKey, key),
    }
  },
}

export const identifiers = {
  Panel: {},
  Extra: {},
}

function ensureArray(obj) {
  return Array.isArray(obj) ? obj : [obj]
}

const renderCollapsePanel = (item, index, children, salt, listeners) => {
  if (item.key === undefined) {
    throw new Error('collapse items must have a key property in every item.')
  }

  const extraPosition = { position: 'absolute', right: 5, top: 0 }
  const header = (
    <Scope relativeChildStatePath={`items.${index}`}>
      <div style={{ position: 'relative' }} onClick={(e) => { listeners.onChange(item.key); e.stopPropagation() }}>
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
    <Panel header={header} key={`${item.key}`}>
      <Scope relativeChildStatePath={`items.${index}`}>
        <div>
          {ensureArray(panel).map(c => React.cloneElement(c))}
        </div>
      </Scope>
    </Panel>
  )
}

export function render({ state, listeners, children }) {
  const salt = Date.now().toString()
  const { activeKey = [] } = state
  return (
    <Collapse {...state} {...listeners} activeKey={activeKey}>
      { state.items.map((item, index) => renderCollapsePanel(item, index, children, salt, listeners)) }
    </Collapse>
  )
}
