require('dotenv').config()

const path = require('path')
const fetch = require('node-fetch');
const { createRemoteFileNode } = require("gatsby-source-filesystem")


 exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
   const { createNode } = actions;

   /* Source General News */

   const cryptoResponse = await fetch(`https://cryptonews-api.com/api/v1/category?section=general&items=5&type=article&sortby=rank&days=1&token=v4mwca3tgaks4r4fosybnlwlbtuhzqfhl9wbsfj2`);
   const cryptoNews = await cryptoResponse.json();
   const cryptoArticles = Object.values(cryptoNews.data);

   cryptoArticles.forEach((node, index) => {
     createNode({
       ...node,
       id: createNodeId(`CryptoNews-${node.news_id}`),
       slug: node.title.toString().toLowerCase().normalize('NFD').trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-'),
       parent: null,
       children: [],
       internal: {
         type: `CryptoNews`,
         content: JSON.stringify(node),
         contentDigest: createContentDigest(node)
       }
     })
   })

   /* Source Bitcoin */

   const btcResponse = await fetch(`https://cryptonews-api.com/api/v1?tickers=BTC&items=6&type=article&extra-fields=id&token=${process.env.GATSBY_CRYPTONEWS_API_KEY}`);
   const btcNews = await btcResponse.json();
   const btcArticles = Object.values(btcNews.data);

   btcArticles.forEach((node, index) => {
     createNode({
       ...node,
       id: createNodeId(`BitcoinNews-${node.news_id}`),
       slug: node.title.toString().toLowerCase().normalize('NFD').trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-'),
       parent: null,
       children: [],
       internal: {
         type: `BitcoinNews`,
         content: JSON.stringify(node),
         contentDigest: createContentDigest(node)
       }
     })
   })

   /* Source Ethereum */

   const ethResponse = await fetch(`https://cryptonews-api.com/api/v1?tickers=ETH&items=6&type=article&extra-fields=id&token=${process.env.GATSBY_CRYPTONEWS_API_KEY}`);
   const ethNews = await ethResponse.json();
   const ethArticles = Object.values(ethNews.data);

   ethArticles.forEach((node, index) => {
     createNode({
       ...node,
       id: createNodeId(`EthereumNews-${node.news_id}`),
       slug: node.title.toString().toLowerCase().normalize('NFD').trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-'),
       parent: null,
       children: [],
       internal: {
         type: `EthereumNews`,
         content: JSON.stringify(node),
         contentDigest: createContentDigest(node)
       }
     })
   })

 };

 exports.onCreateNode = async ({
  actions: { createNode },
  getCache,
  createNodeId,
  node,
    }) => {
      if (node.internal.type === `CryptoNews`) {
        const fileNode = await createRemoteFileNode({
          url: node.image_url,
          getCache,
          createNode,
          createNodeId,
          parentNodeId: node.id,
        })
        if (fileNode) {
          node.remoteImage___NODE = fileNode.id
        }
      }
      if (node.internal.type === `BitcoinNews`) {
        const fileNode = await createRemoteFileNode({
          url: node.image_url,
          getCache,
          createNode,
          createNodeId,
          parentNodeId: node.id,
        })
        if (fileNode) {
          node.remoteImage___NODE = fileNode.id
        }
      }
      if (node.internal.type === `EthereumNews`) {
        const fileNode = await createRemoteFileNode({
          url: node.image_url,
          getCache,
          createNode,
          createNodeId,
          parentNodeId: node.id,
        })
        if (fileNode) {
          node.remoteImage___NODE = fileNode.id
        }
      }
    }

 exports.createPages = async ({ actions: { createPage }, graphql }) => {

    const { data } = await graphql(
        `
        {
          coins: allGraphCmsCoin{
              edges{
                  coin: node{
                      id
                      name
                      slug
                      symbol
                      icon{
                        url
                      }
                      homepage
                      summary{
                        markdownNode {
                            childMdx {
                              body
                            }
                          }
                      }
                    coinHistory{
                        markdownNode {
                            childMdx {
                              body
                            }
                          }
                    }
                    value{
                        markdownNode {
                            childMdx {
                              body
                            }
                          }
                    }
                    trading{
                        markdownNode {
                            childMdx {
                              body
                            }
                          }
                    }
                  }
              }
          },
          cryptoNews: allCryptoNews {
            edges {
              news: node {
                id
                title
                text
                slug
                image_url
                news_url
                date
                source_name
                remoteImage {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
            }
          },
          bitcoinNews: allBitcoinNews {
            edges {
              news: node {
                id
                title
                text
                slug
                image_url
                news_url
                date
                source_name
                remoteImage {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
            }
          },
          ethereumNews: allEthereumNews {
            edges {
              news: node {
                id
                title
                text
                slug
                image_url
                news_url
                date
                source_name
                remoteImage {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
            }
          },
          blog: allGraphCmsPost {
            edges {
              post: node {
                id
                title
                date
                slug
                excerpt
                content {
                  markdownNode {
                    childMdx {
                      body
                    }
                  }
                }
                coverImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                tags
                imageCredit
              }
            }
          }
        }
    `)

    data.cryptoNews.edges.forEach(({ news }) => {
      createPage({
        component: path.resolve('./src/templates/article.js'),
        context: {
          news,
          pageName: news.title,
        },
        path: `/news/${news.slug}`,
      })
    })

    data.bitcoinNews.edges.forEach(({ news }) => {
      createPage({
        component: path.resolve('./src/templates/article.js'),
        context: {
          news,
          pageName: news.title,
        },
        path: `/news/bitcoin/${news.slug}`,
      })
    })

    data.ethereumNews.edges.forEach(({ news }) => {
      createPage({
        component: path.resolve('./src/templates/article.js'),
        context: {
          news,
          pageName: news.title,
        },
        path: `/news/ethereum/${news.slug}`,
      })
    })

    data.coins.edges.forEach(({ coin }) => {
        createPage({
          component: path.resolve('./src/templates/coin.js'),
          context: {
            coin,
            pageName: coin.name,
          },
          path: `/currencies/${coin.slug}`,
        })
    })

    data.blog.edges.forEach(({ post }) => {
      createPage({
        component: path.resolve('./src/templates/post.js'),
        context: {
          post,
          pageName: post.title,
        },
        path: `/blog/${post.slug}`,
      })
  })

 }