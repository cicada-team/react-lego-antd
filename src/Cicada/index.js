import React from 'react'
import PropTypes from 'prop-types'
import Cicada from '@alipay/cicada-render/lib/Cicada'
import createContext from '@alipay/cicada-render/lib/context/createContext'
import createStore from '@alipay/cicada-render/lib/context/createStore'
import createForm from '@alipay/cicada-render/lib/context/createForm'
import createFuture from '@alipay/cicada-render/lib/context/createFuture'
import createValidation from '@alipay/cicada-render/lib/context/createValidation'
import { keep } from '../common'

/*
 state
 */
export const defaultState = {
  config: {},
  value: {},
}

export const stateTypes = {
  config: PropTypes.object,
  value: PropTypes.object,
}

/*
 reduce functions
 */
// CAUTION 注意 Cicada 组件并不是真正的接受受控形式, 因为内部数据目前不是 immutable, 也没有实现通过函数延迟执行。
export const defaultListeners = {
  onChange({ state }, _, cicadaContext) {
    return {
      ...state,
      value: { ...cicadaContext.store.getState() },
    }
  },
  didUpdate: keep,
}

/*
 render
 */
export function render({ state, listeners }) {
  const createCicadaContext = (initialState) => {
    const store = createStore(initialState)
    return createContext(
      store,
      createForm(),
      createFuture(),
      createValidation(store)
    )
  }

  return <Cicada config={state.config} createCicadaContext={createCicadaContext} value={state.value} {...listeners} />
}
