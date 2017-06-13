import React from 'react'
import PropTypes from 'prop-types'

export const getDefaultState = () => ({
  src: '',
  width: '',
  height: '',
})

export const stateTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export function render({ state }) {
  return (
    <iframe {...state} frameBorder="no" />
  )
}
