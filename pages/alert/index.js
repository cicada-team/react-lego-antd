import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Alert',
    getInitialState: () => ({
      closable: false,
      type: 'error',
    }),
    children: [{
      type: 'Alert.Content',
      children: [{
        type: 'div',
        children: ['异常弹出'],
      }],
    }],
  }, {
    type: 'Alert',
    getInitialState: () => ({
      closable: true,
    }),
    children: [{
      type: 'Alert.Content',
      children: [{
        type: 'div',
        children: ['自定义关闭文字'],
      }],
    }, {
      type: 'Alert.CloseText',
      children: [{
        type: 'div',
        children: ['关闭'],
      }],
    }],
  }, {
    type: 'Alert',
    getInitialState: () => ({
      type: 'success',
      closable: true,
      showIcon: true,
    }),
    children: [{
      type: 'Alert.Content',
      children: [{
        type: 'div',
        children: ['展示图标'],
      }],
    }],
  }, {
    type: 'Alert',
    getInitialState: () => ({
      banner: true,
      closable: true,
    }),
    children: [{
      type: 'Alert.Content',
      children: [{
        type: 'div',
        children: ['展示图标与描述'],
      }],
    }, {
      type: 'Alert.Description',
      children: [{
        type: 'div',
        children: ['This is very long description text text text text text text text text text text text text text text text text text text text text text text text text'],
      }],
    }],
  }],
})
