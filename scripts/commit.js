#!/usr/bin/env node
const dedent = require('dedent')
const scopeEnums = ['mobile', 'pc', 'engine']
const path = require('path')
const exec = require('child_process').exec
const fs = require('fs')
const git = require('simple-git')(process.cwd())
const fileMap = {
  pc: 'components',
  mobile: 'mobile',
  engine: 'render',
}
const typeEnums = {
  feat: {
    name: '新增',
    desc: '新功能',
  },
  fix: {
    name: '修复',
    desc: '修复问题',
  },
  refactor: {
    name: '优化',
    desc: '重构代码',
  },
  perf: {
    name: '优化',
    desc: '提升性能'
  },
  deps: {
    name: '更新',
    desc: '升级依赖'
  },
  chore: {
    name: '工具',
    desc: '修改工具相关',
  },
  doc: {
    name: '文档',
    desc: '修改文档',
  },
}
function getLogMessage(msg) {
  return msg.replace(/^.+\(.+\):/, '').replace(/\(HEAD.+$/, '').trim()
}
function promiseChain(currentPromise, ...nextPromise) {
  return Promise.resolve(currentPromise && currentPromise().then(() => nextPromise.length > 0 && promiseChain(...nextPromise)))
}
function checkScope(scope) {
  return scopeEnums.find(item => scope === item || RegExp(`^${item}/.+`).test(scope))
}
function normalizeMessage(messageArr) {
  messageArr[0] = messageArr[0].trim().replace(/^["']/, '')
  messageArr[messageArr.length - 1] = messageArr[messageArr.length - 1].trim().replace(/["']$/, '').replace(/[.。]$/, '')
  return messageArr.map(m => m.trim()).join(' ')
}
function showHelp() {
  console.log(dedent(`
    cicada-engine command:
    
    Usage:
      - npm run commit <scope> <type> <message>
      - npm run publish <scope> [tag]
    Args:  
      - scope: (required) ${scopeEnums.join('|')}, 后边可以加上组件名
      - type: (required) ${Object.keys(typeEnums).map(item => `${item}(${typeEnums[item].desc})`).join(',')}
      - message: (required) 消息内容，可以加引号或者不加都行
      - tag: (optioned) 标签名，缺省的话则自动递增
    Example:
      - npm run commit mobile/Table feat 'your message'
      - npm run commit pc/Table fix 'your message'
      - npm run commit engine fix 'your message'
      - npm run publish engine 0.1.0
`))
}
function cmd(cmd, cwd, isGitCmd, ignoreGitError) {
  return () => new Promise((res) => {
    exec(cmd, {
      cwd: cwd || process.cwd(),
      env: process.env,
    }, function cb(err, stdout, stderr) {
      if (stdout) {
        console.log(stdout)
      }
      if (err) {
        console.log('error cmd: ', cmd)
        throw err
      }
      // git命令会把错误打印到stderr字段
      if (isGitCmd && stderr) {
        if (!ignoreGitError) {
          console.log('git cmd error: ', cmd)
          console.log(stderr)
          process.exit()
        }
        console.log(stderr)
      }
      res()
    })
  })
}
function commitMessage(scope, type, message) {
  /*
  const [currentScope, component] = scope.split('/')
  if (component) {
    if (currentScope === 'pc') {
      const fileExists = fs.existsSync(path.join(process.cwd(), 'components/src', component))
      if (!fileExists) {
        console.error('Unnown component: ' + scope)
        process.exit()
      }
    } else if (currentScope === 'mobile') {
      const fileExists = fs.existsSync(path.join(process.cwd(), 'mobile/src', component))
      if (!fileExists) {
        console.error('Unnown component: ' + scope)
        process.exit()
      }
    }
  }
  */
  cmd(`git commit -m '${type}(${scope}): ${normalizeMessage(message)}.'`, null, true)()
}
function createChangeLog(scope, cb) {
  let tags = []
  const changeLogList = []
  const commitListCache = []

  function getLogByTag(preTag, tag) {
    return () => new Promise((res) => {
      git.log({ from: preTag, to: tag }, (err, data) => {
        if (err) console.error(err)
        else {
          commitListCache.push({ tag, data: data.all.filter(item => RegExp(`\\(${scope}.*\\):`).test(item.message)) })
          res()
        }
      })
    })
  }

  function getNum(str) {
    const [n1, n2, n3] = str.replace(/^[^0-9]*/, '').replace(/-.*$/, '').split('.')
    return n1 * 100000 + n2 * 10000 + n3
  }

  git.tags((err, tagList) => {
    // Get current scope tag
    tags = tagList.all.filter(tag => RegExp(`^${scope}`).test(tag)).sort((pre, after) => getNum(pre) < getNum(after) ? -1 : 1)
    tags.push('master')
    const promiseList = tags.reduce((arr, tag, index) => {
      arr.push(getLogByTag(tags[index - 1], tag))
      return arr
    }, [])
    promiseChain(...promiseList).then(() => {
      // 第一个tag目前会被计算为全部需要去除掉
      commitListCache[0].data = commitListCache[0].data.filter((commit) => {
        return !commitListCache.slice(1).find(item => item.data.find(c => c.hash === commit.hash))
      })
      commitListCache.forEach((c) => {
        const { tag, data: commitList } = c
        const currentLogList = []
        const componentCache = {}
        const latestDate = commitList[0] && commitList[0].date
        // tag内容采用最旧的在前
        commitList.reverse()
        commitList.forEach(item => {
          const matched = item.message.match(RegExp(`^.+\\(${scope}\\/(.+)\\):`))
          const type = item.message.match(RegExp('^(.+)\\(.+\\):'))[1]
          if (!typeEnums[type]) return
          if (matched) {
            const comp = matched[1]
            if (!componentCache[comp]) componentCache[comp] = []
            componentCache[comp].push({
              type,
              message: getLogMessage(item.message),
            })
          } else {
            currentLogList.push({
              type,
              message: getLogMessage(item.message),
            })
          }
        })
        Object.keys(componentCache).forEach(comp => currentLogList.push({
          comp,
          list: componentCache[comp]
        }))
        changeLogList.push({
          tag,
          date: latestDate,
          list: currentLogList,
        })
      })
      changeLogList.reverse()
      cb(changeLogList)
    })
  })
}
function printLogAndCommit(scope, logList, newTag) {
  // print log
  const logs = [
    dedent`
## 更新日志

日志严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

* patch 版本：每周进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* minor 版本：每月发布一个带有新特性的版本。
* 大版本号：含有破坏性更新和新特性，不在发布周期内。
          `,
  ]
  logList.forEach(log => {
    if (log.list.length === 0) return
    const date = new Date(log.date)
    const fixedList = log.list.map(item => {
      // 忽略doc
      if (item.type === 'doc') return
      if (!item.comp) {
        return `- ${typeEnums[item.type].name}: ${item.message}`
      }
      return `- **${item.comp}**
${item.list.filter(i => i.type !== 'doc').map(i => `  - ${typeEnums[i.type].name}: ${i.message}`).join('\n')}`
    })
    logs.push(
      `## ${log.tag.replace(`${scope}-`, '')}
            
\`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}\`

${fixedList.join('\n')}`)
  })
  const changelogFile = path.join(process.cwd(), fileMap[scope], 'changelog.md')
  const packageFile = path.join(process.cwd(), fileMap[scope], 'package.json')
  const oldFileData = fs.readFileSync(changelogFile).toString()
  const oldPackageData = fs.readFileSync(packageFile).toString()
  const newFileData = logs.join('\n\n')
  const newPackageData = oldPackageData.replace(/\"version\":\s*\"[^"]+\"/, () => {
    return `"version": "${newTag}"`
  })
  // Only changed
  if (newFileData !== oldFileData) {
    fs.writeFileSync(changelogFile, newFileData)
    fs.writeFileSync(packageFile, newPackageData)
    console.log(`update ${changelogFile}, ${packageFile}`)
    git
      .add([changelogFile, packageFile])
      .commit(`version: ${scope}-${newTag}`, () => {
        // force update tag
        promiseChain(
          cmd(`git tag ${scope}-${newTag} -f`, null, true),
          cmd('tnpm publish', path.join(process.cwd(), fileMap[scope])),
          cmd('git push', null, true, true),
          cmd('git push --tags -f', null, true, true)
        ).then(() => console.log('publish success.'))
      })
  } else {
    console.warn('commit未有新的内容提交，请尝试用npm run commit提交新内容再publish.')
  }
}
function upgridNum(num) {
  if (/^[0-9]+$/.test(num)) return ++num
  if (/-[^0-9]+$/.test(num)) return num + '1'
  return num.replace(/-[^0-9]+([0-9]+)$/, (s1, s2) => s1.replace(/[0-9]+$/, '') + (++s2))
}

function publish(scope, newTag) {
  if (!fileMap[scope]) throw new Error(`Uknown scope name ${scope}.`)
  if (!newTag) {
    const oldVersion = require(`../${fileMap[scope]}/package.json`).version
    newTag = oldVersion.split('.').map((num, index) => index === 2 ? upgridNum(num) : num).join('.')
  }
  cmd('git pull --tags', null, true)().then(() => {
    createChangeLog(scope, (logList) => {
      // Replace master to new Tag
      logList.forEach(log => {
        if (log.tag === 'master') log.tag = `${scope}-${newTag}`
      })
      printLogAndCommit(scope, logList, newTag)
    })
  })
}
function main() {
  const argv = process.argv.slice(2)
  const cmd = argv[0]
  if (cmd === 'commit') {
    const [scope, type, ...message] = argv.slice(1)
    if (!scope || !checkScope(scope) || !type || !typeEnums[type] || message.length === 0) {
      showHelp()
      return
    }
    commitMessage(scope, type, message)
  } else if (cmd === 'publish') {
    const [scope, tag] = argv.slice(1)
    if (!scope) {
      showHelp()
      return
    }
    publish(scope, tag)
  } else {
    console.error('Unknown command: ' + cmd)
    showHelp()
  }
}
main()
