import React from 'react'
import PropTypes from 'prop-types'
import { repeat, compose } from '../util'
import { Children } from '../lego'
import Scope from '@cicada/render/lib/components/Scope'

export const stateTypes = {
  data: PropTypes.array,
  labelWidth: PropTypes.number,
  dataMaxWidth: PropTypes.number,
  columns: PropTypes.number,
}

export const getDefaultState = () => ({
  data: [],
  labelWidth: undefined,
  dataMaxWidth: undefined,
  columns: 1,
})

export const identifiers = {
  Grid: {},
}

export function render({ state, children }) {
  const { data, columns } = state
  const rows = Math.ceil(data.length / columns)
  const presenter = compose(Children.find, Children.hasChildren)(children, identifiers.Grid) ?
    Children.findChildren(children, identifiers.Grid)[0] :
    null

  /* eslint-disable no-mixed-operators */
  return (
    <table className="cicada-table-grids">
      <tbody>
        {repeat(rows, rowIndex => (
          <tr key={rowIndex}>
            {repeat(columns, (colIndex) => {
              const dataIndex = colIndex * rows + rowIndex
              let labelChildren = null
              let dataChildren = null
              if (dataIndex < data.length) {
                labelChildren = data[dataIndex].label
                dataChildren = presenter === null ?
                  data[dataIndex].data :
                  <Scope relativeChildStatePath={`data.${dataIndex}.data`} key={dataIndex}>{presenter}</Scope>
              }

              return [
                <td key={`label-${dataIndex}`} className="label" width={state.labelWidth}>
                  {labelChildren}
                </td>,
                <td key={`data-${dataIndex}`} style={{ maxWidth: state.dataMaxWidth }}>
                  {dataChildren}
                </td>,
              ]
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
