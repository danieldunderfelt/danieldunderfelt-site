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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-110067126-1",
        head: false,
        anonymize: true,
        respectDNT: true
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify'
  ]
}
