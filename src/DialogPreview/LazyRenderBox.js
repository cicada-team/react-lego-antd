import React from 'react'
import PropTypes from 'prop-types'
import assign from 'object-assign'
/* eslint-disable */
const LazyRenderBox = React.createClass({
  shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || nextProps.visible
  },
  render() {
    let className = this.props.className
    if (!!this.props.hiddenClassName && !this.props.visible) {
      className += ` ${this.props.hiddenClassName}`
    }
    const props = assign({}, this.props)
    delete props.hiddenClassName
    delete props.visible
    props.className = className
    return <div {...props} />
  },
})
LazyRenderBox.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  hiddenClassName: PropTypes.string,
  role: PropTypes.string,
  style: PropTypes.object,
}
export default LazyRenderBox
