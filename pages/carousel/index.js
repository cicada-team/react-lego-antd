import render from '../../util/render'

export default () => render({
  children: [{
    type: 'Carousel',
    bind: 'carousel',
    props: {
      effect: 'fade',
      dots: true,
      vertical: false,
      autoplay: true,
    },
    listeners: {
      beforeChange: {
        fns: [{
          fn(...args) { console.log(args) },
        }],
      },
    },
    children: [{
      type: 'div',
      children: [{
        type: 'Image',
        getInitialState: () => ({
          src: 'http://img4.imgtn.bdimg.com/it/u=3164865206,572377556&fm=21&gp=0.jpg',
          width: '100%',
        }),
      }],
    }, {
      type: 'div',
      children: [{
        type: 'Image',
        getInitialState: () => ({
          src: 'http://pic2.16pic.com/00/04/39/16pic_439846_b.jpg',
          width: '100%',
        }),
      }],
    }],
  }],
})
