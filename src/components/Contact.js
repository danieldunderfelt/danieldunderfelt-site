import React from 'react'
import { FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

export default props => {
  
  return (
    <div className="Contact">
      <p>
        <FaTwitter size={20} /> <a href="https://twitter.com/ddunderfelt">@ddunderfelt</a>
      </p>
      <p>
        <FaGithub size={ 20 } /> <a href="https://github.com/danieldunderfelt">danieldunderfelt</a>
      </p>
      <p>
        <FaEnvelope size={ 20 } /> <strong>daniel@developsuperpowers.com</strong>
      </p>
    </div>
  )
}
