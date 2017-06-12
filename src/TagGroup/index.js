import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'
import { omit } from '../util'

const colors = ['', 'blue', 'green', 'yellow', 'red']

/*
 props
 */
export const defaultState = {
  closable: true,
  color: colors[0],
  list: [],
}

export const stateTypes = {
  closable: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  list: PropTypes.array,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onClose({ state }, removeTag) {
    const newState = { ...state }
    newState.list = newState.list.filter(tag => removeTag.id !== tag.id)
    return newState
  },
  onClick({ state }) {
    return state
  },
  onMouseEnter({ state }) {
    return state
  },
  onMouseLeave({ state }) {
    return state
  },
}

function renderTags(tag, { state, listeners }) {
  const onClick = () => { listeners.onClick(tag) }

  const onMouseEnter = () => listeners.onMouseEnter(tag)

  const onMouseLeave = () => listeners.onMouseLeave(tag)

  const onClose = () => {
    return listeners.onClose(tag)
  }

  return (<Tag key={tag.id} {...omit(state, 'list')} onClose={onClose} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {tag.text}
  </Tag>)
}

/*
 render
 */
export function render({ state, listeners }) {
  return (<div>
    {
      state.list.map(tag =>
        renderTags(tag, { state, listeners })
      )
    }
  </div>)
}
