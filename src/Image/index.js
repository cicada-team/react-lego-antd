import React from 'react'
import PropTypes from 'prop-types'

export const getDefaultState = () => ({
  alt: '',
  src: '',
  width: '',
  height: '',
  style: {},
})

export const stateTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
}

export function render({ state }) {
  return (
    <img {...state} role="presentation" />
  )
}

export const display = 'inline'