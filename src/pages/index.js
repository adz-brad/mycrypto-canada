import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../components/button/button'
import Seo from '../components/seo/SEO'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'
import { faGraduationCap, faChartLine, faCoins } from '@fortawesome/free-solid-svg-icons'
 
const Index = () => {

  const data = useStaticQuery(graphql`
    {
      news: allCryptoNews(limit: 1) {
        nodes {
            id
            title
            text
            slug
            remoteImage {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
        },
      blog: allGraphCmsPost(filter: {category: {eq: Blog}, featured: {eq: true}} sort: {fields: publishedAt, order: DESC}, limit: 1) {
        nodes {
          id
          title
          excerpt
          slug
          coverImage {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  const latestNews = data.news.nodes;
  const featuredBlog = data.blog.nodes;
  const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (

      <React.Fragment>

          <Seo
              pageTitle="Home"
              pageDescription="Home Page for myCrypto Canada"
              pageKeywords="Home, myCrypto, Canada"
              pageImage=""
              pageUrl={sharingUrl}
          />


          <div className="flex flex-col items-center mt-2 p-2">
            <div className="flex items-end border-b-2 border-primary-600 pb-1">
              <h1 className="text-5xl font-bold mr-2">myCrypto</h1>
              <h1 className="text-3xl tracking-tight uppercase mb-1">Canada</h1>
              <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-3xl pb-1 ml-1 text-red-600 mb-2"/>
            </div>
            <h2 className="text-xl font-semibold pt-1">Cryptocurrency Resources for Canadians</h2>      
          </div>


            <div className="flex flex-col justify-center p-2">

              <div className="p-1">

                <p className="my-3">Are you among the millions of Canadians who are still unsure about the importance of cryptocurrency in modern economics? <strong>You aren't alone.</strong></p> 
                
                <p className="my-3">Every day, digital currencies known as "cryptocurrency" are traded across the globe, and more than likely you've heard of a few. From Bitcoin to Ethereum, these currencies combine to a total value in the TRILLIONS of dollars, with many of them sure bets to be major players in future world markets.</p>

                <p className="my-3">Isn't it time you got your piece of the pie? Learn how you can start leveraging cryptocurrency to grow your wealth today!</p>
              
              </div>

              <Button text="Learn More" url="/learn" ariaLabel="" className=" text-2xl my-3 bg-red-600 hover:bg-red-700" />

              <div className="grid grid-cols-1 md:grid-cols-3 my-5">

                <Link to="/learn" className="card">
                    <span className="card-header">Educate</span>
                        <FontAwesomeIcon icon={faGraduationCap} className="card-icon"/>
                    <span className="card-caption">Learn all about cryptocurrencies - how they work and how they are traded.</span>
                </Link>

                <Link to="/trade" className="card">
                    <span className="card-header">Invest</span>
                        <FontAwesomeIcon icon={faChartLine} className="card-icon"/>
                    <span className="card-caption">Turn your new-found knowledge of cryptocurrency into tangible wealth by trading currencies on the live market.</span>
                </Link>

                <Link to="/trade" className="card">
                    <span className="card-header">Grow</span>
                        <FontAwesomeIcon icon={faCoins} className="card-icon"/>
                    <span className="card-caption">Expand your crypto portfolio and leverage cryptocurrencies against one another to grow your wealth.</span>
                </Link>

              </div>

              <div className="flex flex-col lg:flex-row">

                <div className="p-1 mx-2 lg:w-1/2">

                  <h1 className="text-3xl lg:text-4xl font-bold my-5 border-b border-primary-600 pt-1">Latest News</h1>

                  {latestNews.map((article) => {
                      
                    return(

                      <article className="shadow-lg rounded-lg flex flex-col items-center" key={article.id}>

                        <GatsbyImage image={article.remoteImage.childImageSharp.gatsbyImageData} alt={`${article.title} Image`} className="rounded-t-lg max-h-80 w-full"/>
                      
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold border-b border-primary-600 w-full mt-3 tracking-tight leading-none pb-1">{article.title}</h1>

                        <p className="pt-2 my-1 leading-tight w-full">{article.text.slice(0,150)}...</p>

                        <Button text="Read More" url={`/news/${article.slug}`} className="text-xl lg:text-2xl bg-indigo-700 hover:bg-indigo-900 mt-5" ariaLabel=""/>
                        
                      </article>
                    )
                  })}

                </div>

                <div className="p-1 mx-2 lg:w-1/2">

                  <h1 className="text-3xl lg:text-4xl font-bold my-5 border-b border-primary-600 pt-1">Featured Blog</h1>

                  {featuredBlog.map((post) => {
                    return(

                      <article className="shadow-lg rounded-lg flex flex-col items-center" key={post.id}>

                        <GatsbyImage image={post.coverImage.localFile.childImageSharp.gatsbyImageData} alt={`${post.title} Image`} className="rounded-t-lg max-h-80 w-full"/>
                      
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold border-b border-primary-600 w-full mt-3 tracking-tight leading-none pb-1">{post.title}</h1>
                        <p className="my-1 pt-2 leading-tight w-full">{post.excerpt.slice(0,150)}...</p>
                        <Button text="Read More" url={`/blog/${post.slug}`} className="text-xl lg:text-2xl bg-indigo-700 hover:bg-indigo-900 mt-5" ariaLabel=""/>
                        
                      </article>
                    )
                  })}

                </div>
 
              </div>      

          </div>

      </React.Fragment>

    )
  }

export default Index
