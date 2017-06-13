import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'
import { compose } from '../util'
import { Children } from '../lego'

export const getDefaultState = () => ({
  width: '100%',
})

export const stateTypes = {
  width: PropTypes.string,
}

/*
 identifier
 */
export const identifiers = {
  Title: {},
  Footer: {},
  Content: {},
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
