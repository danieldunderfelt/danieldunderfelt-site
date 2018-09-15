module.exports = {
  siteMetadata: {
    title: 'Daniel Dunderfelt'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: [
            'roboto mono\:100,300,400,700',
            'source code pro\:200,400,700'
          ]
        }
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify'
  ]
}
