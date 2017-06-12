import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'

const scrollxs = ['scrollx', 'fade']

/*
 props
 */
export const defaultState = {
  effect: scrollxs[0],
  dots: true,
  vertical: false,
  autoplay: false,
}

export const stateTypes = {
  effect: PropTypes.oneOf(scrollxs),
  dots: PropTypes.bool,
  vertical: PropTypes.bool,
  autoplay: PropTypes.bool,
}

/*
 reduce functions
 */
export const defaultListeners = {
  beforeChange({ state }) {
    return state
  },
  afterChange({ state }) {
    return state
  },
}

const renderCarousel = (children) => {
  let component = null
  if (children.length !== 0) {
    component = children
  } else {
    component = <div />
  }
  return component
}

/*
 render
 */
export function render({ state, listeners, children }) {
  return (<Carousel {...state} {...listeners} >
    {renderCarousel(children)}
  </Carousel>)
}
