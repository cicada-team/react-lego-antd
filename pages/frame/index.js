import render from '../../util/render'

export default () => render({
  type: 'Frame',
  getInitialState: () => ({
    src: 'https://www.taobao.com',
    width: '100%',
    height: '500px',
  }),
})
