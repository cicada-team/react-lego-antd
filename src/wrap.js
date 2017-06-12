import { pick, mapValues, each, keys } from './util'
import { Component, PropTypes } from 'react'

export const lifecycleFnNames = [
  'componentDidMount',
  'componentWillReceiveProps',
  'componentWillUnmount',
  'getChildContext',
]

export function destructure(DeclarativeComponent) {
  const {
    stateTypes = {},
    defaultState = {},
    contextTypes = {},
    defaultListeners = {},
    initialize = () => ({}),
    render,
  } = DeclarativeComponent

  const lifecycleFns = pick(DeclarativeComponent, lifecycleFnNames)
  const reduceFnPropTypes = mapValues(defaultListeners, () => PropTypes.func)
  const propTypes = { ...stateTypes, ...reduceFnPropTypes }

  return {
    defaultState,
    stateTypes,
    contextTypes,
    defaultListeners,
    initialize,
    render,
    lifecycleFns,
    propTypes,
  }
}

export function createIngredients(props, piece, context) {
  const result = {}
  result.state = { ...piece.defaultState, ...pick(props, keys(piece.stateTypes)) }
  result.instance = piece.initialize()

  each(piece.lifecycleFns, (fn, key) => {
    result[key] = (...args) => {
      fn({ props: context.props, context: context.context }, ...args)
    }
  })

  result.listeners = mapValues(piece.defaultListeners, (fn, key) => {
    return (...args) => {
      const nextState = fn({ state: context.state, context: context.context }, ...args)
      context.setState(nextState)
      if (context.props[key]) {
        context.props[key]({ state: nextState, context: context.context }, ...args)
      }
    }
  })

  return result
}

export default function wrap(DeclarativeComponent) {
  const piece = destructure(DeclarativeComponent)

  class CicadaWrapper extends Component {
    static defaultProps = piece.defaultState
    static propTypes = piece.propTypes
    static contextTypes = piece.contextTypes

    constructor(props) {
      super()
      const ingredients = createIngredients(props, piece, this)
      this.state = ingredients.state
      this.instance = ingredients.instance
      this.listeners = ingredients.listeners
    }

    render() {
      return piece.render({
        state: this.state,
        listeners: this.listeners,
        props: this.props,
        // 简便获取 children
        children: this.props.children,
        context: this.context,
        instance: this.instance,
      })
    }
  }

  return CicadaWrapper
}
