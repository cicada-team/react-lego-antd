import React from 'react'
import PropTypes from 'prop-types'
import { keep, noop } from '../common'
import { id, pick, omit, walk } from '../util'
import { Children } from '../lego'
import { Table } from 'antd'
import Scope from '@alipay/cicada-render/lib/components/Scope'
import Cicada from '@alipay/cicada-render/lib/Cicada'

const SIZES = ['default', 'small']

export const defaultState = {
  dataSource: [],
  columns: undefined,
  pagination: undefined,
  rowSelection: undefined,
  size: SIZES[0],
  expandedRowKeys: [],
  defaultExpandAllRows: false,
  loading: false,
  locale: {},
  indentSize: 15,
  bordered: false,
  showHeader: true,
  scroll: {},
}

export const stateTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  pagination: PropTypes.object,
  rowSelection: PropTypes.object,
  size: PropTypes.oneOf(SIZES),
  expandedRowKeys: PropTypes.array,
  defaultExpandAllRows: PropTypes.bool,
  loading: PropTypes.bool,
  locale: PropTypes.object,
  indentSize: PropTypes.number,
  bordered: PropTypes.bool,
  showHeader: PropTypes.bool,
  scroll: PropTypes.object,
}

export const defaultListeners = {
  onChange({ state }, pagination) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    }
  },
  onExpandedRowsChange({ state }, expandedRowKeys) {
    return {
      ...state,
      expandedRowKeys,
    }
  },
  onExpand: keep,
  onRowClick: keep,
  onPageChange({ state }, current, pageSize) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        current,
        pageSize,
      },
    }
  },
  onShowSizeChange({ state }, current, pageSize) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        current,
        pageSize,
      },
    }
  },
  onSelectChange({ state }, selectedRowKeys) {
    return {
      ...state,
      rowSelection: {
        ...state.rowSelection,
        selectedRowKeys,
      },
    }
  },
  onSelect: keep,
  onSelectAll: keep,
  onSelectInvert: keep,
}

export const identifiers = {
  ExpandedRow: id(noop),
  Footer: id(noop),
  Title: id(noop),
}

/* eslint-disable no-shadow */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const wrapperColumnRender = (columns) => {
  walk({
    children: columns,
  }, 'children', (column) => {
    const { render } = column
    if (typeof render === 'function') {
      column.render = (text, record, index) => {
        const el = render(text, record, index)
        if (typeof el.config === 'object') {
          return <Cicada {...el} />
        }
        return el
      }
    }
  })
  return columns
}

export function render({ state, listeners, children }) {
  let { pagination, rowSelection, columns } = state
  if (pagination) {
    pagination = {
      ...pagination,
      ...pick(listeners, ['onShowSizeChange']),
      onChange: listeners.onPageChange,
    }
  }
  if (rowSelection) {
    rowSelection = {
      ...rowSelection,
      ...pick(listeners, ['onSelect', 'onSelectAll', 'onSelectInvert']),
      onChange: listeners.onSelectChange,
      getCheckboxProps: ({ disabled }) => ({ disabled }),
    }
  }
  // 如果支持Cicada组件就失去了封装动态Table的意义，目前暂时注释掉这个功能
  // if (columns) {
  //   columns = wrapperColumnRender(columns)
  // }
  const { current = 1, pageSize = 10 } = pagination || {}

  const expandedRow = Children.has(children, identifiers.ExpandedRow) ? (record, index) => {
    index = (current - 1) * pageSize + index
    return (
      <Scope relativeChildStatePath={`dataSource.${index}`} key={index}>
        <div>{Children.findChildren(children, identifiers.ExpandedRow)}</div>
      </Scope>
    )
  } : null
  const footer = Children.has(children, identifiers.Footer) ? () => (
    <div>{Children.findChildren(children, identifiers.Footer)}</div>
  ) : null
  const title = Children.has(children, identifiers.Title) ? () => (
    <div>{Children.findChildren(children, identifiers.Title)}</div>
  ) : null

  return (
    <Table
      {...omit(state, ['pagination', 'rowSelection', 'columns'])}
      {...pick(listeners, ['onChange', 'onRowClick'])}
      rowKey={(record, index) => {
        const { key = index } = record
        return key
      }}
      expandedRowRender={expandedRow}
      footer={footer}
      title={title}
      pagination={pagination}
      rowSelection={rowSelection}
      columns={columns}
    />
  )
}
