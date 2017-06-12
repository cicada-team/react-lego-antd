/**
 * Warn: 目前该文件只被Demos和DemoWrapper使用，全局注册了postMessage事件，其他组件暂时不要使用避免影响业务场景的使用
 */
const listeners = []
export function isIframe() {
  return window.parent !== window
}

function listen(event, callback) {
  const listener = { event, callback }
  listeners.push(listener)
  return function removeListener() {
    const index = listeners.indexOf(listener)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
  }
}

export function dispatch(event, data) {
  if (isIframe()) {
    const message = JSON.stringify({ event, data })
    window.parent.postMessage(message, '*')
  }
}

export function fetch(event, data, waitTime = 1000) {
  return new Promise((res, rej) => {
    let removeListener
    let isReturn = false
    const uid = Date.now().toString() + Math.random()
    const cb = (responseData) => {
      if (responseData && responseData.uid === uid) {
        isReturn = true
        removeListener()
        res(responseData.data)
      }
    }
    removeListener = listen(event, cb)
    dispatch(event, { data, uid })
    // 超时后后没返回则直接删除
    window.setTimeout(() => {
      if (!isReturn) {
        removeListener()
        rej(new Error('fetch time out'))
      }
    }, waitTime)
  })
}

// Init post message
window.addEventListener('message', (e) => {
  if (e.data) {
    let message = {}
    try {
      message = JSON.parse(e.data)
    } catch (error) {
      console.warn('Post message parse error: ', e.data)
    }
    listeners.forEach(({ event, callback }) => {
      if (message.event === event) {
        callback(message.data)
      }
    })
  }
}, false)
