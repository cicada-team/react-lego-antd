import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Table',
    bind: 'selectTable',
    children: [{
      type: 'Table.ColumnGroup',
      props: {
        title: 'Group',
      },
      children: [{
        type: 'Table.Column',
        props: {
          title: 'Name',
          dataIndex: 'name',
        },
        children: [{
          type: 'a',
          children: ['${name}'],
        }],
      }, {
        type: 'Table.Column',
        props: {
          title: 'Age',
          dataIndex: 'age',
        },
      }],
    }, {
      type: 'Table.Column',
      props: {
        title: 'Address',
        dataIndex: 'address',
      },
    }, {
      type: 'Table.ExpandedRow',
      children: [{
        type: 'div',
        children: ['${address}']
      }],
    }],
  }, {
    type: 'Table',
    bind: 'filterAndSorter',
    intercepters: {
      onFilter: (_, dataIndex, value, record) => {
        return record[dataIndex].indexOf(value) > -1
      },
      onSorter: (_, dataIndex, a, b) => {
        if (a[dataIndex] > b[dataIndex]) {
          return 1
        } else if (a[dataIndex] < b[dataIndex]) {
          return -1
        } else {
          return 0
        }
      },
    },
    children: [{
      type: 'Table.Column',
      props: {
        title: 'Name',
        dataIndex: 'name',
        filters: [{
          text: 'Joe',
          value: 'Joe',
        }, {
          text: 'Jim',
          value: 'Jim',
        }, {
          text: 'Submenu',
          value: 'Submenu',
          children: [{
            text: 'Green',
            value: 'Green',
          }, {
            text: 'Black',
            value: 'Black',
          }],
        }],
      },
    }, {
      type: 'Table.Column',
      props: {
        title: 'Age',
        dataIndex: 'age',
        sorter: true,
      },
    }, {
      type: 'Table.Column',
      props: {
        title: 'Address',
        dataIndex: 'address',
        sorter: true,
        filters: [{
          text: 'London',
          value: 'London',
        }, {
          text: 'New York',
          value: 'New York',
        }],
        filterMultiple: false,
      },
    }],
  }],
}, {
  selectTable: {
    dataSource: [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
      disabled: true,
    }],
    rowSelection: {},
    pagination: {
      pageSize: 2,
    },
    bordered: true,
  },
  filterAndSorter: {
    dataSource: [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    }],
    pagination: {
      pageSize: 2,
    },
  },
})
