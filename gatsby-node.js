const path = require('path')

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
          }
        }
    `)

    data.coins.edges.forEach(({ coin }) => {
        createPage({
          component: path.resolve('./src/templates/coin.js'),
          context: {
            coin,
          },
          path: `/coins/${coin.slug}`,
        })
    })

 }