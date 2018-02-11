import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import particlesJson from '../particles.json'

import '../styles/reset.css'
import '../styles/main.scss'

class TemplateWrapper extends Component {
  
  static propTypes = {
    children: PropTypes.func,
  }
  
  componentDidMount() {
    window.particlesJS('particles-js', particlesJson)
  }
  
  render() {
    const { children } = this.props
    
    return (
      <div>
        <Helmet
          title="Daniel Dunderfelt"
          meta={ [
            { name: 'description', content: 'Daniel Dunderfelt, full-stack developer' },
            { name: 'keywords', content: 'daniel dunderfelt, dunderfelt, developer, full-stack, react, node' },
          ] }
        />
        <div className="Site">
          <div id="particles-js" className="particles-bg" />
          <div className="Site__wrapper">
            { children() }
          </div>
        </div>
      </div>
    )
  }
}

export default TemplateWrapper
