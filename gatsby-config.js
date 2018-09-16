module.exports = {
  siteMetadata: {
    title: 'Daniel Dunderfelt'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          { family: 'Source Code Pro', variants: ['300', '700'] }
        ]
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify'
  ]
}
