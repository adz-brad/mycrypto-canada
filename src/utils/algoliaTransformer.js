const algoliaTransformer = ({ data: { posts } }) => 

    posts.nodes.map(({ coverImage, ...rest }) => {
        return{
            image: coverImage.localFile.childImageSharp.gatsbyImageData,
            ...rest
        }
    });

module.exports = algoliaTransformer;
