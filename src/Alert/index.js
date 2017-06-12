import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'
import { keep } from '../common'
import { Children } from '../lego'

const TYPES = ['info', 'success', 'warning', 'error']

export const getDefaultState = () => ({
  type: TYPES[0],
  closable: false,
  showIcon: false,
  banner: false,
})

export const stateTypes = {
  type: PropTypes.oneOf(TYPES),
  closable: PropTypes.bool,
  showIcon: PropTypes.bool,
  banner: PropTypes.bool,
}

export const defaultListeners = {
  onClose: keep,
}

export const identifiers = {
  Content: {},
  CloseText: {},
  Description: {},
}

export function render({ state, listeners, children }) {
  const content = Children.has(children, identifiers.Content) ? <div>{Children.findChildren(children, identifiers.Content)}</div> : null
  const closeText = Children.has(children, identifiers.CloseText) ? <div>{Children.findChildren(children, identifiers.CloseText)}</div> : null
  const description = Children.has(children, identifiers.Description) ? <div>{Children.findChildren(children, identifiers.Description)}</div> : null

  return (
    <Alert {...state} {...listeners} message={content} description={description} closeText={closeText} />
  )
}
