import React from 'react'
import Render from '@cicada/render/lib/Render'
import createStateTree from '@cicada/render/lib/createStateTree'
import applyStateTreeSubscriber from '@cicada/render/lib/applyStateTreeSubscriber'
import createAppearance from '@cicada/render/lib/createAppearance'
import createConnect from '@cicada/render/lib/createConnect'
import createBackground from '@cicada/render/lib/createBackground'
import * as stateTreeUtility from '@cicada/render/lib/background/utility/stateTree'
import * as visibilityJob from '@cicada/render/lib/background/job/visibility'
import * as interpolationJob from '@cicada/render/lib/background/job/interpolation'

import { mapValues } from './index'
// 目前 next.js 的 alias 有问题，只能先用这种方式引入
// import { Input } from '@cicada/react-lego-antd'
// import * as Input  from '@cicada/react-lego-antd/Input'
import componentsDef from '../src'

const connect = createConnect()
const components = mapValues(componentsDef, connect)


export default (config, initialState = {}) => {
  const stateTree = applyStateTreeSubscriber(createStateTree)(initialState)
  const appearance = createAppearance(stateTree)

  if (typeof window !== 'undefined') {
    window.stateTree = stateTree
    window.appearance = appearance
  }

  const background = createBackground({
    utilities: {
      stateTree: stateTreeUtility,
    },
    jobs: {
      visible: visibilityJob,
      interpolation: interpolationJob,
    },
  }, stateTree, appearance)

  return (
    <Render
      stateTree={stateTree}
      appearance={appearance}
      components={components}
      background={background}
      config={config}
    />
  )
}
