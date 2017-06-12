import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { id } from '../util'
import { Children } from '../lego'
import {
  noop,
} from '../common'

const DIRECTION = ['row', 'row-reverse', 'column', 'column-reverse']
const WRAP = ['wrap', 'nowrap', 'wrap-reverse']
const JUSTIFY = ['start', 'center', 'end', 'between', 'around']
const ALIGN = ['center', 'start', 'end', 'baseline', 'stretch']
const ALIGN_CONTENT = ['stretch', 'start', 'center', 'end', 'between', 'around']
const POSITION = ['static', 'relative', 'absolute', 'fixed']

const prefixCls = 'ant-flexbox'

/*
 props
 */
export const defaultState = {
  direction: DIRECTION[0],
  wrap: WRAP[0],
  justify: JUSTIFY[0],
  align: ALIGN[0],
  alignContent: ALIGN_CONTENT[0],
  position: POSITION[0],
  margin: '',
  padding: '',
  border: '',
  style: {},
}

export const stateTypes = {
  direction: PropTypes.oneOf(DIRECTION),
  wrap: PropTypes.oneOf(WRAP),
  justify: PropTypes.oneOf(JUSTIFY),
  align: PropTypes.oneOf(ALIGN),
  alignContent: PropTypes.oneOf(ALIGN_CONTENT),
  position: PropTypes.oneOf(POSITION),
  margin: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  style: PropTypes.object,
}

const ITEM_ALIGN = ['atuo', 'start', 'end', 'center', 'baseline', 'stretch']

const FLEX_MAP = {
  start: 'flex-start',
  end: 'flex-end',
}

/*
 identifier
 */
export const identifiers = {
  Item: id(noop),
}

identifiers.Item.defaultState = {
  flex: 'none',
  alignSelf: ITEM_ALIGN[0],
  order: 0,
  width: '',
  height: '',
  style: {},
}

identifiers.Item.stateTypes = {
  flex: PropTypes.string,
  alignSelf: PropTypes.oneOf(ITEM_ALIGN),
  order: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
}

/*
 render
 */
export function render({ state, children }) {
  const { direction, wrap, justify, align, alignContent, style, position, margin, padding, border } = state

  const className = classNames({
    [`${prefixCls}`]: true,
    [`${prefixCls}-dir-row`]: direction === 'row',
    [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
    [`${prefixCls}-dir-column`]: direction === 'column',
    [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',

    [`${prefixCls}-nowrap`]: wrap === 'nowrap',
    [`${prefixCls}-wrap`]: wrap === 'wrap',
    [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',

    [`${prefixCls}-justify-start`]: justify === 'start',
    [`${prefixCls}-justify-end`]: justify === 'end',
    [`${prefixCls}-justify-center`]: justify === 'center',
    [`${prefixCls}-justify-between`]: justify === 'between',
    [`${prefixCls}-justify-around`]: justify === 'around',

    [`${prefixCls}-align-top`]: align === 'top' || align === 'start',
    [`${prefixCls}-align-bottom`]: align === 'bottom' || align === 'end',
    [`${prefixCls}-align-middle`]: align === 'middle' || align === 'center',
    [`${prefixCls}-align-stretch`]: align === 'stretch',
    [`${prefixCls}-align-baseline`]: align === 'baseline',

    [`${prefixCls}-align-content-start`]: alignContent === 'start',
    [`${prefixCls}-align-content-end`]: alignContent === 'end',
    [`${prefixCls}-align-content-center`]: alignContent === 'center',
    [`${prefixCls}-align-content-between`]: alignContent === 'between',
    [`${prefixCls}-align-content-around`]: alignContent === 'around',
    [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch',
  })

  const finalStyle = {
    ...style,
    position,
    margin,
    padding,
    border,
  }

  const itemConfig = Children.filter(children, identifiers.Item)

  return (<div className={className} style={finalStyle}>
    {
      itemConfig.map((item, index) => {
        const { props = {} } = item
        const { flex = 'none', order, width, height, flexBasis = 'auto', path = [], onFocus } = props
        let { alignSelf } = props
        if (alignSelf in FLEX_MAP) {
          alignSelf = FLEX_MAP[alignSelf]
        }
        const finalItemStyle = {
          flexBasis,
          ...props.style,
          flex,
          order,
          width,
          height,
        }
        const itemElements = item.props.children
        let previewProps = {}
        if (typeof onFocus === 'function') {
          previewProps = {
            'data-mark': path.join('.'),
            ref: (div) => {
              if (div) {
                div.onclick = (e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  onFocus(path)
                }
              }
            },
          }
        }
        return (<div {...previewProps} style={finalItemStyle} key={index}>
          {itemElements}
        </div>)
      })
    }
  </div>)
}
