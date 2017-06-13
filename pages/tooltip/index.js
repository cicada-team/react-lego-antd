import render from '../../util/render'

export default () => render({
  children: [{
    type: 'div',
    children: [{
      type: 'Tooltip',
      getInitialState: () => ({
        title: '这是个tooltip',
        placement: 'bottomLeft',
        arrowPointAtCenter: false,
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        trigger: 'hover',
        overlayClassName: 'my-class',
      }),
      children: [{
        type: 'Tooltip.Title',
        children: [{
          type: 'div',
          children: ['这是个提示'],
        }],
      }, {
        type: 'Tooltip.Presenter',
        children: [{
          type: 'div',
          children: ['鼠标移上来就看见'],
        }],
      }],
    }],
  }],
})
