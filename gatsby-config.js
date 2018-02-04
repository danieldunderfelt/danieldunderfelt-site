const lost = require('lost')

module.exports = {
  siteMetadata: {
    title: 'Daniel Dunderfelt'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          'roboto mono\:100,300,400,700',
          'source code pro\:200,400,700'
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [ lost() ],
        precision: 8
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify'
  ]
}
