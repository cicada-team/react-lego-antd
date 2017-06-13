import render from '../../util/render'

// TODO 未通过
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
              fn() { console.log(arguments) },
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
          interceptors: {
            getCalendarContainer: ({ store, util }, ...argv) => {
              return document.querySelector('.ant-popover-inner-content')
            },
          },
        }],
      }],
    }],
  }],
})
