import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import '../styles/reset.css'
import '../styles/main.scss'
import Matrix from '../components/Matrix'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.func
  }
  
  render() {
    const { children } = this.props

    return (
      <div className="Site-container">
        <Helmet
          title="Daniel Dunderfelt"
          meta={[
            { name: 'description', content: 'Daniel Dunderfelt, full-stack developer' },
            {
              name: 'keywords',
              content: 'daniel dunderfelt, dunderfelt, developer, full-stack, react, node'
            }
          ]}
        />
        <Matrix />
        <div className="Page-container">
          { children }
        </div>
      </div>
    )
  }
}

export default Layout
