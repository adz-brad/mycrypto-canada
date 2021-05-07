require('dotenv').config()
 
module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: {
    title: `myCryptoCanada.ca`,
    description: `myCrypto Canada - Helping Canadians understand Crytocurrency`,
    keywords: 'dogecoin, bitcoin, ethereum, cryptocurrency, crypto, currency, trading, market, digital, Canada',
    siteUrl: 'https://www.mycryptocanada.ca',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'myCrypto Canada',
        short_name: `myCrypto Canada`,
        background_color: `#001247`,
        lang: `en`,
        theme_color: `#001247`,
        start_url: '/',
        display: `standalone`,
        cache_busting_mode: 'none',
        icon:'src/assets/icons/logo/mcclogo.png',
        include_favicon: true,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-mdx`,
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GATSBY_GRAPHCMS_ENDPOINT,
        token: process.env.GATSBY_GRAPHCMS_TOKEN,
        buildMarkdownNodes: true,
        downloadLocalImages: true,
      },
    },
    {
      resolve: `gatsby-source-open-exchange-rates`,
      options: {
        appId: process.env.GATSBY_OPEN_EXCHANGE_RATES_APP_ID,
      }
    },
  ],
}
