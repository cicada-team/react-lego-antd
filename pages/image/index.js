import render from '../../util/render'

export default () => render({
  type: 'Image',
  getInitialState: () => ({
    src: 'https://img.alicdn.com/tps/i2/TB1bNE7LFXXXXaOXFXXwFSA1XXX-292-116.png_145x145.jpg',
    width: '150px',
    height: '50px',
    style: {
      borderRadius: '50%',
    },
  }),
})
