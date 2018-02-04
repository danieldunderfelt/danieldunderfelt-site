import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../styles/reset.css'
import '../styles/main.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Daniel Dunderfelt"
      meta={[
        { name: 'description', content: 'Daniel Dunderfelt, full-stack developer' },
        { name: 'keywords', content: 'daniel dunderfelt, dunderfelt, developer, full-stack, react, node' },
      ]}
    />
    <div className="Site">
      <div className="Site__wrapper">
        { children() }
      </div>
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
