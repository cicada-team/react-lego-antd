import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { id } from '../util'
import {
  noop,
} from '../common'
import { Children } from '../lego'

/*
 props
 */
export const defaultState = {
  title: '',
  bordered: true,
  bodyStyle: {},
}

export const stateTypes = {
  title: PropTypes.string,
  bordered: PropTypes.bool,
  bodyStyle: PropTypes.object,
}

/*
 identifier
 */
export const identifiers = {
  Extra: id(noop),
  Content: id(noop),
}

/*
 render
 */
export function render({ state, children }) {
  const extraNode = Children.has(children, identifiers.Extra) ? Children.findChildren(children, identifiers.Extra) : null
  const contentNode = Children.has(children, identifiers.Content) ? Children.findChildren(children, identifiers.Content) : null
  return (
    <Card {...state} extra={extraNode}>
      {contentNode}
    </Card>
  )
}
