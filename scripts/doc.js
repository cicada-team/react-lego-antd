#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const stringify = require('json-stable-stringify')
const fileMap = {
  pc: 'components',
  mobile: 'mobile',
}
const { mapValues, each, pick } = require('./common/utils')
// 用户可以自定义的属性内容
const DOC_CUSTOM_KEYS = ['description', 'advanced', 'deprecated']

function browserPolyfill() {
  require('jsdom-global')()
  // fix: matchMedia没有报错问题
  global.matchMedia = window.matchMedia = window.matchMedia || function() {
      return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
      };
    };
  // 忽略css, less
  Object.assign(require.extensions, {
    '.css': () => {},
    '.less': () => {},
  })
  // fix: 代码中有Image报错问题
  global.Image = window.Image
  // fix: antd-mobile无法require问题
  const originFindPath = module.constructor._findPath
  module.constructor._findPath = function(request, paths, isMain) {
    if ((/antd-mobile/.test(request) || /antd-mobile/.test(paths[0])) && !/\.web\.js$/.test(request)) {
      let tryRequest = request + '/index.web.js'
      if (originFindPath(tryRequest, paths, isMain)) {
        request = tryRequest
      }
      tryRequest = request + '.web.js'
      if (originFindPath(tryRequest, paths, isMain)) {
        request = tryRequest
      }
    }
    return originFindPath(request, paths, isMain)
  }
}

function cmd(cmd, cwd, ignoreError) {
  return () => new Promise((res) => {
    exec(cmd, {
      cwd: cwd || process.cwd(),
      env: process.env,
    }, function cb(err, stdout) {
      if (stdout) {
        console.log(stdout)
      }
      if (!ignoreError && err) {
        console.log('error cmd: ', cmd)
        throw err
      }
      res()
    })
  })
}

function promiseChain(currentPromise, ...nextPromise) {
  return Promise.resolve(currentPromise && currentPromise().then(() => nextPromise.length > 0 && promiseChain(...nextPromise)))
}

function readReactPropTypes(comp, name) {
  const propTypes = mapValues(comp.stateTypes || {}, (typeObject, key) => {
    const res = {
      type: typeObject.typeName,
      required: typeObject.typeRequired,
    }
    if (typeObject.typeName === 'oneOf') {
      res.type = 'string'
      res.values = typeObject.typeChecker
    }
    if (typeObject.typeName === 'object') {
      res.type = 'json'
    }
    res.default = comp.defaultState ? comp.defaultState[key] : undefined
    res.advanced = false
    res.deprecated = false
    res.description = ''
    return res
  })
  Object.assign(propTypes, mapValues(comp.defaultListeners || {}, (val, key) => ({ description: '', type: 'function' })))
  return {
    name,
    props: propTypes,
  }
}

function getExtendsProps(exts, type) {
  return exts.reduce((props, ext) => {
    const json = require(`../doc/${fileMap[type]}/common/${ext}.json`) || {}
    Object.assign(props, json)
    return props
  }, {})
}

function createDoc(type, ignoreWarn) {
  const cwd = path.join(process.cwd(), fileMap[type])
  const nodeInstalled = fs.existsSync(path.join(cwd, 'node_modules'))
  promiseChain(
    !nodeInstalled ? cmd('tnpm i', cwd) : () => Promise.resolve(null),
    cmd('tnpm i', cwd),
    cmd('tnpm run build', cwd)
  ).then(() => {
    const data = require(`../${fileMap[type]}/lib/index`)
    const components = mapValues(data.default || data, (comp, name) => readReactPropTypes(comp, name))
    const unDescComps = []
    each(components, (comp) => {
      const compPath = path.join(process.cwd(), `./doc/${fileMap[type]}/${comp.name}.json`)
      let compJson = { props: {} }
      let unDescProps = []
      if (fs.existsSync(compPath)) {
        try {
          compJson = require(compPath)
        } catch(e) {
          e.message = `JSON语法错误：${e.message}`
          throw e
        }
      }
      compJson.name = comp.name
      compJson.description = compJson.description || ''
      compJson.extends = compJson.extends || []
      compJson.usage = compJson.usage || []
      const extendProps = getExtendsProps(compJson.extends, type)
      compJson.props = mapValues(comp.props || {}, (prop, propKey) => {
        const currentProp = Object.assign(prop, pick(compJson.props[propKey] || {}, DOC_CUSTOM_KEYS), pick(extendProps[propKey] || {}, DOC_CUSTOM_KEYS))
        if (!currentProp.deprecated && !currentProp.description) unDescProps.push(propKey)
        return currentProp
      })
      fs.writeFileSync(path.join(process.cwd(), 'doc', fileMap[type], `${comp.name}.json`), stringify(compJson, { space: '  ' }))
      if (unDescProps.length !== 0 || !compJson.description || !compJson.usage.length === 0) {
        unDescComps.push({ name: comp.name, hasDesc: !!compJson.description, unDescProps, hasUsage: compJson.usage.length !== 0 })
      }
    })
    if (!ignoreWarn && unDescComps.length > 0) {
      console.log('未描述清楚的组件文档：')
      unDescComps.sort((c1, c2) => c1.name > c2.name ? 1 : -1).forEach(comp => console.log(`- ${comp.name}${comp.hasDesc ? '' : '(未描述组件)'}${comp.hasUsage ? '' : '(未写usage)'}: ${comp.unDescProps.join(', ')}`))
    } else {
      console.log(`Build ${type} components doc success.`)
    }
  }).catch(e => console.error(e))
}

browserPolyfill()
createDoc('mobile', true)
createDoc('pc')
