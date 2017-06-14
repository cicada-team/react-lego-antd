import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import { omit, compose } from '../util'
import { Children } from '../lego'

export const PLACEMENTS = ['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft',
  'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']

export const TRIGGERS = ['hover', 'focus', 'click']

export const getDefaultState = () => ({
  trigger: TRIGGERS[0],
  placement: PLACEMENTS[0],
  visible: false,
  title: '',
  content: '',
})

export const stateTypes = {
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
}

export const defaultListeners = {
  onVisibleChange(_, visible) {
    return {
      visible,
    }
  },
}

export const identifiers = {
  Title: {},
  Content: {},
  Presenter: {},
}

export function render({ state, listeners, children }) {
  const title = compose(Children.find, Children.hasChildren)(children, identifiers.Title) ? (
    <div>{Children.findChildren(children, identifiers.Title)}</div>
  ) : state.title

  const content = compose(Children.find, Children.hasChildren)(children, identifiers.Content) ? (
    <div>{Children.findChildren(children, identifiers.Content)}</div>
  ) : state.content

  const presenter = compose(Children.find, Children.hasChildren)(children, identifiers.Presenter) ? (
    Children.findChildren(children, identifiers.Presenter)[0]
  ) : state.presenter

  // TODO 由于外部包装了一个 div，增加一个 inline 的选项？
  return (
    <Popover title={title} content={content} {...omit(state, ['title', 'content'])} {...listeners}>
      <div>
        {presenter}
      </div>
    </Popover>
  )
}
