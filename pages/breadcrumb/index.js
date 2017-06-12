import render from '../../util/render'
export default () => render({
  children: [{
    type: 'Breadcrumb',
    getInitialState: () => ({
      separator: '>',
      items: [{
        label: 'Home',
        size: 16,
        color: '#3a91e9'
      }, {
        label: 'Cicada',
        href: '/',
      }],
    }),
  }],
})