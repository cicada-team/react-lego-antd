import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import { id, omit, compose } from '../util'
import { Children } from '../lego'
import {
  noop,
} from '../common'

export const PLACEMENTS = ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft',
  'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']
export const TRIGGERS = ['hover', 'focus', 'click']

/*
 state
 */
export const defaultState = {
  trigger: TRIGGERS[0],
  placement: PLACEMENTS[0],
  visible: false,
  title: '',
  content: '',
}
export const stateTypes = {
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onVisibleChange({ state }, visible) {
    return {
      ...state,
      visible,
    }
  },
}

/*
 identifier
 */
export const identifiers = {
  Title: id(noop),
  Content: id(noop),
  Presenter: id(noop),
}

/*
 render
 */
export function render({ state, listeners, children }) {
  const title = compose(Children.find, Children.hasChildren)(children, identifiers.Title) ? (
    Children.findChildren(children, identifiers.Title)[0]
  ) : state.title

  const content = compose(Children.find, Children.hasChildren)(children, identifiers.Content) ? (
    Children.findChildren(children, identifiers.Content)[0]
  ) : state.content

  const presenter = compose(Children.find, Children.hasChildren)(children, identifiers.Presenter) ? (
    Children.findChildren(children, identifiers.Presenter)[0]
  ) : state.presenter

  return (
    <Popover title={title} content={content} {...omit(state, ['title', 'content'])} {...listeners}>
      {presenter}
    </Popover>
  )
}
