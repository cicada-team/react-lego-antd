import render from '../../util/render'
import moment from 'moment'

function range(start, end) {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

export default () => render({
  children: [{
    type: 'DateRange',
    bind: 'dateRange',
    props: {
      showTime: true,
      disabled: false,
      ranges: { Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] },
      style: {
        width: '100%',
      },
      label: '日期区间：',
      format: 'YYYYMMDD hh:mm:ss',
      required: true,
    },
    interceptors: {
      disabledDate: ({ store, util }, current) => {
        return current && current.valueOf() < Date.now()
      },
      disabledTime: ({ store, util }, _, type) => {
        if (type === 'start') {
          return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
          }
        }
        return {
          disabledHours: () => range(0, 60).splice(20, 4),
          disabledMinutes: () => range(0, 31),
          disabledSeconds: () => [55, 56],
        }
      },
    },
    listeners: {
      onClick: {
        fns: [{
          fn(...argv) { console.log(1, argv) },
        }],
      },
    },
  }],
}, {
    dateRange: {
      startValue: '20161201',
      endValue: '20161201',
    },
  }
)