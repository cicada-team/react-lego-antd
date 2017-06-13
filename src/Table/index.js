import React from 'react'
import PropTypes from 'prop-types'
import { keep, noop } from '../common'
import { pick, omit, filter } from '../util'
import { Children } from '../lego'
import { Table } from 'antd'
import Scope from '@cicada/render/lib/components/Scope'

const { Column, ColumnGroup } = Table

const SIZES = ['default', 'small']

export const getDefaultState = () => ({
  dataSource: [],
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
})

export const stateTypes = {
  dataSource: PropTypes.array,
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
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    }
  },
  onExpandedRowsChange(_, expandedRowKeys) {
    return {
      expandedRowKeys,
    }
  },
  onExpand: keep,
  onRowClick: keep,
  onCellClick: keep,
  onPageChange(state, current, pageSize) {
    return {
      pagination: {
        ...state.pagination,
        current,
        pageSize,
      },
    }
  },
  onShowSizeChange({ state }, current, pageSize) {
    return {
      pagination: {
        ...state.pagination,
        current,
        pageSize,
      },
    }
  },
  onSelectChange({ state }, selectedRowKeys) {
    return {
      rowSelection: {
        ...state.rowSelection,
        selectedRowKeys,
      },
    }
  },
  onSelect: noop,
  onSelectAll: noop,
  onSelectInvert: noop,
}

const FIXEDS = [false, 'left', 'right']

export const identifiers = {
  Column: {
    getDefaultState: () => ({
      title: '',
      dataIndex: '',
      filters: [],
      filterMultiple: true,
      filtered: false,
      sorter: false,
      colSpan: undefined,
      width: '',
      className: '',
      fixed: FIXEDS[0],
    }),
    stateTypes: {
      title: PropTypes.string,
      dataIndex: PropTypes.string,
      filters: PropTypes.array,
      filterMultiple: PropTypes.bool,
      filtered: PropTypes.bool,
      sorter: PropTypes.bool,
      colSpan: PropTypes.number,
      width: PropTypes.string,
      className: PropTypes.string,
      fixed: PropTypes.oneOf(FIXEDS),
    },
  },
  ColumnGroup: {
    getDefaultState: () => ({
      title: '',
    }),
    stateTypes: {
      title: PropTypes.string,
    },
  },
  Title: {},
  Footer: {},
  ExpandedRow: {},
}

export const defaultIntercepters = {
  onSorter: undefined,
  onFilter: undefined,
  onCeil: undefined,
}

/* eslint-disable no-shadow */
/* eslint-disable no-mixed-operators */
const renderColumn = ({ props }, key, pagination, listeners, intercepters) => {
  const { children, dataIndex } = props
  const { onCeil = () => ({}) } = intercepters
  const { current = 1, pageSize = 10 } = pagination || {}
  let { onSorter, onFilter } = intercepters
  if (onSorter) {
    onSorter = (...argv) => intercepters.onSorter(dataIndex, ...argv)
  }
  if (onFilter) {
    onFilter = (...argv) => intercepters.onFilter(dataIndex, ...argv)
  }

  return (
    <Column
      key={key}
      render={(text, record, index) => {
        index = (current - 1) * pageSize + index
        const props = onCeil(index, dataIndex, record, text)
        if (!Array.isArray(children) || children.length === 0) {
          return {
            children: <div>{text}</div>,
            props,
          }
        }

        return {
          children: (
            <Scope relativeChildStatePath={`dataSource.${index}`} key={index}>
              <div>{children}</div>
            </Scope>
          ),
          props,
        }
      }}
      sorter={onSorter}
      {...filter(omit(props, ['children']), (value, key) => {
        if (key === 'fixed' && value === false) {
          return false
        }
        if (key === 'sorter' && value === true) {
          return false
        }
        return true
      })}
      {...pick(listeners, ['onCellClick'])}
      onFilter={onFilter}
    />
  )
}

const renderColumnGroup = ({ props }, key, pagination, listeners, intercepters) => {
  const { children } = props
  const columnsChildren = Children.pick(children, [identifiers.Column, identifiers.ColumnGroup])

  return (
    <ColumnGroup key={key} {...pick(props, ['title'])}>
      {columnsChildren.map((child, index) => {
        if (Children.is(child, identifiers.ColumnGroup)) {
          return renderColumnGroup(child, `${key}.${index}`, pagination, listeners, intercepters)
        }
        return renderColumn(child, `${key}.${index}`, pagination, listeners, intercepters)
      })}
    </ColumnGroup>
  )
}

export function render({ state, listeners, intercepters, children }) {
  let { pagination, rowSelection } = state
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
  const columnsChildren = Children.pick(children, [identifiers.Column, identifiers.ColumnGroup])

  return (
    <Table
      {...omit(state, ['pagination', 'rowSelection'])}
      {...pick(listeners, ['onChange', 'onRowClick', 'onExpandedRowsChange', 'onExpand'])}
      rowKey={(record, index) => {
        const { key = index } = record
        return key
      }}
      expandedRowRender={expandedRow}
      footer={footer}
      title={title}
      pagination={pagination}
      rowSelection={rowSelection}
    >
      {columnsChildren.map((child, index) => {
        if (Children.is(child, identifiers.ColumnGroup)) {
          return renderColumnGroup(child, index, pagination, listeners, intercepters)
        }
        return renderColumn(child, index, pagination, listeners, intercepters)
      })}
    </Table>
  )
}
