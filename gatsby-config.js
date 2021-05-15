require('dotenv').config()
 
module.exports = {
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
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          maximumFileSizeToCacheInBytes: 7000000
        },
      },
    },
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
      resolve: `gatsby-plugin-algolia`,
      options: {
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
        queries: [
          {
            query: require('./src/utils/algoliaQuery'),
            transformer: require('./src/utils/algoliaTransformer'),
          },
        ],
      }
    },
    {
      resolve: `gatsby-source-open-exchange-rates`,
      options: {
        appId: process.env.GATSBY_OPEN_EXCHANGE_RATES_APP_ID,
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-mdx`,
  ],
}
