import React from 'react'
import PropTypes from 'prop-types'

/*
 state
 */
export const defaultState = {
  src: '',
  width: '',
  height: '',
}

export const stateTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

/*
 render
 */
export function render({ state }) {
  return (
    <iframe {...state} frameBorder="no" />
  )
}
