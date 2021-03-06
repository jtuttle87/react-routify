import React, { Component } from 'react'
import store from './store'

class Link extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: store.getPath() === props.to
    }

    this._onChange = ctx => {
      this.setState({
        active: ctx.path === this.props.to
      })
    }
  }

  componentDidMount() {
    store.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    store.removeChangeListener(this._onChange)
  }

  render() {
    const {to, activeClassName, ...rest} = this.props

    let props = {
      href: to,
      ...rest
    }

    if(activeClassName && this.state.active) {
      if(props.className) {
        props.className += ' ' + activeClassName
      } else {
        props.className = activeClassName
      }
    }

    return <a {...props} />
  }
}

export default Link
