import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import { noop } from '../common'
import { id, compose } from '../util'
import { Children } from '../lego'

const POSITIONS = ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight',
  'leftTop', 'leftBottom', 'rightTop', 'rightBottom']
const EVENTS = ['hover', 'focus', 'click']

export const defaultState = {
  title: '',
  placement: POSITIONS[0],
  arrowPointAtCenter: false,
  visible: false,
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0,
  trigger: EVENTS[0],
  overlayClassName: '',
}

export const stateTypes = {
  title: PropTypes.string,
  placement: PropTypes.oneOf(POSITIONS),
  arrowPointAtCenter: PropTypes.bool,
  visible: PropTypes.bool,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  trigger: PropTypes.oneOf(EVENTS),
  overlayClassName: PropTypes.string,
}

export const defaultListeners = {
  onVisibleChange({ state }, visible) {
    return {
      ...state,
      visible,
    }
  },
}

export const identifiers = {
  Title: id(noop),
  Presenter: id(noop),
}

export function render({ state, listeners, children }) {
  const title = compose(Children.find, Children.hasChildren)(children, identifiers.Title) ? (
    Children.findChildren(children, identifiers.Title)[0]
  ) : state.title

  const presenter = compose(Children.find, Children.hasChildren)(children, identifiers.Presenter) ? (
    Children.findChildren(children, identifiers.Presenter)[0]
  ) : state.presenter

  return (
    <Tooltip {...state} {...listeners} title={title} >
      <div>
        {presenter}
      </div>
    </Tooltip>
  )
}
