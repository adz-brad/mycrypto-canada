const algoliaQuery = `
    {
      posts: allGraphCmsPost(sort: {order: DESC, fields: date}){
        nodes{
          objectID: id
          date
          title
          slug
          excerpt
          tags
          category
          coverImage {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
`;

module.exports = algoliaQuery;