import React from 'react'
import PropTypes from 'prop-types'
import { Steps, Icon } from 'antd'
import Scope from '@cicada/render/lib/components/Scope'
import { pick } from '../util'
import { Children } from '../lego'
import {
  SIZES,
} from '../common'

const STATUS = ['process', 'wait', 'finish', 'error']
const DIRECTION = ['horizontal', 'vertical']

export const getDefaultState = () => ({
  current: 0,
  size: SIZES[0],
  status: STATUS[0],
  direction: DIRECTION[0],
  steps: [],
})

export const stateTypes = {
  current: PropTypes.number,
  size: PropTypes.oneOf(SIZES),
  status: PropTypes.oneOf(STATUS),
  direction: PropTypes.oneOf(DIRECTION),
  steps: PropTypes.array,
}

export const identifiers = {
  Title: {},
  Description: {},
}

export function render({ state, children }) {
  if (state.steps.length === 0) return null

  const title = Children.has(children, identifiers.Title) ? (
    Children.findChildren(children, identifiers.Title)
  ) : []

  const description = Children.has(children, identifiers.Description) ? (
    Children.findChildren(children, identifiers.Description)
  ) : []

  return (
    <Steps {...pick(state, ['current', 'status', 'size', 'direction'])}>
      {state.steps.map((step, index) => {
        const titleNode = title.length !== 0 ? (
          <Scope relativeChildStatePath={`steps.${index}`}>
            {title.map(t => ((typeof t === 'string') ? t : React.cloneElement(t)))}
          </Scope>
        ) : null

        const descriptionNode = description.length !== 0 ? (
          <Scope relativeChildStatePath={`steps.${index}`}>
            {description.map(d => ((typeof d === 'string') ? d : React.cloneElement(d)))}
          </Scope>
        ) : null

        const icon = step.iconType ? <Icon type={step.iconType} /> : undefined

        return (
          <Steps.Step key={index} title={titleNode} description={descriptionNode} icon={icon} />
        )
      })}
    </Steps>
  )
}
