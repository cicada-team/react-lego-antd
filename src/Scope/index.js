import React from 'react'
import Scope from '@alipay/cicada-render/lib/components/Scope'

export function render({ children }) {
  return (
    <Scope>
      <div>
        {children}
      </div>
    </Scope>
  )
}
