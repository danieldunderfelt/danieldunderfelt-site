import React from 'react'

class IndexPage extends React.Component {
  
  render() {
    
    return (
        <div>
          <h1 className="MegaHeading">
            Daniel<br />
            Dunderfelt
          </h1>
          <p>Full-stack developer from Helsinki.</p>
          <ul className="skill-list">
            <li>React</li>
            <li>React native</li>
            <li>Node.js</li>
            <li>Wordpress</li>
            <li>Laravel</li>
            <li>Sky's the limit!</li>
          </ul>
          <div className="Contact">
            <p>
              Twitter <a href="https://twitter.com/ddunderfelt">@ddunderfelt</a>
            </p>
            <p>
              Github <a href="https://github.com/danieldunderfelt">danieldunderfelt</a>
            </p>
            <p>
              Email <strong>daniel@developsuperpowers.com</strong>
            </p>
          </div>
        </div>
    )
  }
}

export default IndexPage
