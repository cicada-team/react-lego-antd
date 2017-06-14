import render from '../../util/render'

export default () => render({
  children: [{
    children: [{
      children: [{
        type: 'Popover',
        getInitialState: () => ({
          content: 'content',
        }),
        listeners: {
          onVisibleChange: {
            fns: [{
              fn(...args) { console.log(args) },
            }],
          },
        },
        children: [{
          type: 'Popover.Presenter',
          children: [{
            type: 'Button',
            getInitialState: () => ({
              text: 'Popover',
            }),
          }],
        }],
      }],
    }],
  }, {
    type: 'div',
    children: [{
      type: 'Popover',
      children: [{
        type: 'Popover.Presenter',
        children: [{
          type: 'div',
          children: ['popover 内容为多行的例子，鼠标移上来就看见'],
        }],
      }, {
        type: 'Popover.Content',
        children: [{
          type: 'MonthPicker',
          bind: 'datePicker',
          intercepters: {
            getCalendarContainer: () => {
              return document.querySelector('.ant-popover-inner-content')
            },
          },
        }],
      }],
    }],
  }],
})
