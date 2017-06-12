import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'

export const defaultState = {
  items: [],
  separator: '/',
}

export const stateTypes = {
  items: PropTypes.array,
  separator: PropTypes.string,
}
/*
 render
 */
export function render({ state }) {
  const itemNodes = state.items.map((item, index) => (
    <Breadcrumb.Item key={index}>
      <a href={item.href || '#'} style={{ fontSize: item.size, color: item.color }}>
        <span>{item.label}</span>
      </a>
    </Breadcrumb.Item>
  ))

  return <Breadcrumb separator={state.separator}>{itemNodes}</Breadcrumb>
}
