import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { pick } from '../util'
import { Children } from '../lego'
import {
  preventDefault,
  noop,
  createFormItem,
  SIZES,
  VALIDATION_STATUS,
  COMMON_INPUT_STATE,
  COMMON_INPUT_EVENT } from '../common'

export defaultListeners from './listeners'

const prefixCls = 'ant-input-number'

export const getDefaultState = () => ({
  value: undefined,
  placeholder: '',
  size: SIZES[0],
  status: VALIDATION_STATUS[0],
  min: undefined,
  max: undefined,
  step: 1,
  disabled: false,
  label: '',
  help: '',
  required: false,
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  hasFeedback: true,
  hasFormItemWrapper: true,
})

export const stateTypes = {
  value: PropTypes.number,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  status: PropTypes.oneOf(VALIDATION_STATUS),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  help: PropTypes.string,
  required: PropTypes.bool,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
  hasFeedback: PropTypes.bool,
  hasFormItemWrapper: PropTypes.bool,
}

/*
 identifier
 */
export const identifiers = {
  Prefix: {},
  Suffix: {},
}

const renderInputNumber = (state, listeners) => {
  const classes = classNames({
    [prefixCls]: true,
    'ant-input': true,
    [`${prefixCls}-disabled`]: state.disabled,
    [`${prefixCls}-focused`]: state.focused,
  })
  let upDisabledClass = ''
  let downDisabledClass = ''

  const value = state.value
  if (!isNaN(value)) {
    const val = Number(value)
    if (val >= state.max) {
      upDisabledClass = `${prefixCls}-handler-up-disabled`
    }
    if (val <= state.min) {
      downDisabledClass = `${prefixCls}-handler-down-disabled`
    }
  } else {
    upDisabledClass = `${prefixCls}-handler-up-disabled`
    downDisabledClass = `${prefixCls}-handler-down-disabled`
  }

  const innerState = pick(state, COMMON_INPUT_STATE)
  const innerListeners = pick(listeners, COMMON_INPUT_EVENT)

  return (
    <div className={classes} style={state.style}>
      <div className={`${prefixCls}-handler-wrap`}>
        <a
          unselectable="unselectable" ref="up"
          onClick={upDisabledClass ? noop : listeners.onUp}
          className={`${prefixCls}-handler ${prefixCls}-handler-up ${upDisabledClass}`}
        >
          <span
            unselectable="unselectable"
            className={`${prefixCls}-handler-up-inner`}
            onClick={preventDefault}
          />
        </a>
        <a
          unselectable="unselectable" ref="down"
          onClick={downDisabledClass ? noop : listeners.onDown}
          className={`${prefixCls}-handler ${prefixCls}-handler-down ${downDisabledClass}`}
        >
          <span
            unselectable="unselectable"
            className={`${prefixCls}-handler-down-inner`}
            onClick={preventDefault}
          />
        </a>
      </div>
      <div className={`${prefixCls}-input-wrap`}>
        <input
          style={null}
          className={`${prefixCls}-input`}
          autoComplete="off"
          {...innerState}
          {...innerListeners}
          ref="input"
        />
      </div>
    </div>
  )
}

/*
 * render
 */
export function render({ state, children, listeners }) {
  const wrapperClassName = 'ant-input-group'
  const addonClassName = `${wrapperClassName}-addon`
  const suffix = Children.has(children, identifiers.Suffix) ? (
    <span className={addonClassName}>
      {Children.findChildren(children, identifiers.Suffix)}
    </span>
  ) : null

  const prefix = Children.has(children, identifiers.Prefix) ? (
    <span className={addonClassName}>
      {Children.findChildren(children, identifiers.Prefix)}
    </span>
  ) : null

  const className = classNames({
    [wrapperClassName]: (suffix || prefix),
    [`status-${state.status}`]: (suffix || prefix),
  })

  return createFormItem(
    state,
    <span className={className}>
      {prefix}
      {renderInputNumber(state, listeners)}
      {suffix}
    </span>
  )
}
