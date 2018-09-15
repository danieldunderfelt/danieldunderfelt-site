import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Content from '../components/Content'
import Contact from '../components/Contact'
import { FaReact, FaNodeJs, FaWordpress, FaLaravel, FaJs, FaPhp } from 'react-icons/fa'
import graphQlLogo from '../img/graphql.svg'

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Hero>
          <Content>
            <h1 className="MainHeading">
              Daniel <strong>Dunderfelt</strong>
            </h1>
            <p>
              <nobr>I am a freelance full-stack web developer</nobr><wbr />
              <nobr> from Helsinki. I love to work with:</nobr>
            </p>
            <div>
              <ul className="skill-list">
                <li><FaJs color="#f5da55" /> Javascript</li>
                <li><FaReact color="#61dafb" /> React</li>
                <li><img src={ graphQlLogo } /> GraphQL</li>
                <li><FaNodeJs color="#43853d" /> Node.js</li>
              </ul>
              <ul className="skill-list">
                <li><FaPhp color="#4F5B93" /> PHP</li>
                <li><FaWordpress color="#0073aa" /> Wordpress</li>
                <li><FaLaravel color="#f4645f" /> Laravel</li>
              </ul>
            </div>
            <header className="Header">
              <Contact />
            </header>
          </Content>
        </Hero>
      </Layout>
    )
  }
}

export default IndexPage
