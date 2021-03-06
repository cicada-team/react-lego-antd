import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { pick, compose } from '../util'
import { Children } from '../lego'

export const getDefaultState = () => ({
  visible: false,
  closable: true,
  maskClosable: true,
  width: undefined,
})

export const stateTypes = {
  visible: PropTypes.bool,
  closable: PropTypes.bool,
  maskClosable: PropTypes.bool,
  width: PropTypes.string,
}

export const defaultListeners = {
  onClose() {
    return {
      visible: false,
    }
  },
}

export const identifiers = {
  Title: {},
  Footer: {},
  Content: {},
}

export function render({ state, children, listeners }) {
  const title = compose(Children.find, Children.hasChildren)(children, identifiers.Title) ? (
    Children.findChildren(children, identifiers.Title)[0]
  ) : null

  const footer = compose(Children.find, Children.hasChildren)(children, identifiers.Footer) ? (
    Children.findChildren(children, identifiers.Footer)[0]
  ) : null

  const content = compose(Children.find, Children.hasChildren)(children, identifiers.Content) ? (
    Children.findChildren(children, identifiers.Content)
  ) : null

  const dialogProps = pick(state, ['visible', 'closable', 'maskClosable', 'width'])

  return (
    <Modal
      {...dialogProps}
      title={title}
      footer={footer}
      {...listeners}
    >
      {content}
    </Modal>
  )
}
