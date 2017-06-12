import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'
import { id, compose } from '../util'
import { Children } from '../lego'
import {
  noop,
} from '../common'

/*
 props
 */
export const defaultState = {
  width: '100%',
}

export const stateTypes = {
  width: PropTypes.string,
}

/*
 identifier
 */
export const identifiers = {
  Title: id(noop),
  Footer: id(noop),
  Content: id(noop),
}

/*
 preview
 */
export function render({ state, children }) {
  const title = compose(Children.find, Children.hasChildren)(children, identifiers.Title) ? (
    Children.findChildren(children, identifiers.Title)[0]
  ) : null

  const footer = compose(Children.find, Children.hasChildren)(children, identifiers.Footer) ? (
    Children.findChildren(children, identifiers.Footer)[0]
  ) : null

  const content = Children.has(children, identifiers.Content) ? (
    Children.findChildren(children, identifiers.Content)
  ) : null

  return (
    <Dialog
      visible
      width={state.width}
      prefixCls="ant-modal"
      mask={false}
      wrapClassName="ant-standalone-modal"
      title={title}
      footer={footer}
    >
      <div>{content}</div>
    </Dialog>
  )
}
