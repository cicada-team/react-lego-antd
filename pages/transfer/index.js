import render from '../../util/render'

const dataSource = []
for (let i = 0; i < 20; i++) {
  dataSource.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: Math.random() * 3 < 1,
  })
}

const targetKeys = dataSource
  .filter(() => Math.random() * 2 > 1)
  .map(item => item.key)


export default () => render({
  type: 'Transfer',
  bind: 'transfer',
  props: {},
  listeners: {
    onSelectChange: {
      fns: [{
        fn(...args) { console.log(args) },
      }],
    },
  },
}, {
  transfer: {
    title: ['Source', 'Target'],
    dataSource,
    targetKeys,
    selectedKeys: [],
  },
})
