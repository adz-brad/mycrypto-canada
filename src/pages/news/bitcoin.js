import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const BitcoinNews = () => {

    const data = useStaticQuery(graphql`
        {
            news: allBitcoinNews{
                articles: nodes{
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
        }
    `)


    return(

        <div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight border-b-2 border-primary-600 my-4 mx-2">Bitcoin News</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">

                {data.news.articles.map((article) => { return(
                    <Link to={`/news/bitcoin/${article.slug}`} key={article.id} className="flex flex-col items-center m-3 pt-2">
                        <div className="w-full">
                            <GatsbyImage className="w-full rounded-md" image={article.remoteImage.childImageSharp.gatsbyImageData} alt={`${article.title} Image`}/>
                        </div>
                        <h1 className="w-full pt-1 pb-2 font-semibold tracking-tight">{article.title}</h1>
                    </Link>
                )})}
                
            </div>

        </div>

    )
}

export default BitcoinNews