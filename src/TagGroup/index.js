import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'
import { omit } from '../util'

const colors = ['', 'blue', 'green', 'yellow', 'red']

export const getDefaultState = () => ({
  closable: true,
  color: colors[0],
  list: [],
})

export const stateTypes = {
  closable: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  list: PropTypes.array,
}

export const defaultListeners = {
  onClose({ state }, removeTag) {
    return {
      list: state.list.filter(tag => removeTag.id !== tag.id)
    }
  },
  onClick() {},
  onMouseEnter() {},
  onMouseLeave() {},
}

function renderTags(tag, { state, listeners }) {
  const onClick = () => { listeners.onClick(tag) }

  const onMouseEnter = () => listeners.onMouseEnter(tag)

  const onMouseLeave = () => listeners.onMouseLeave(tag)

  const onClose = () => {
    return listeners.onClose(tag)
  }

  return (
    <Tag key={tag.id} {...omit(state, 'list')} onClose={onClose} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {tag.text}
    </Tag>
  )
}

export function render({ state, listeners }) {
  return (<div>
    {
      state.list.map(tag =>
        renderTags(tag, { state, listeners })
      )
    }
  </div>)
}
