import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../components/button/button'
import Seo from '../components/seo/SEO'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'
import { faGraduationCap, faChartLine, faCoins, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
 
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
      btcNews: allBitcoinNews(limit: 2) {
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
      ethNews: allEthereumNews(limit: 2) {
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
      featuredBlog: allGraphCmsPost(filter: {category: {eq: Blog}, featured: {eq: true}} sort: {fields: publishedAt, order: DESC}, limit: 1) {
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
      latestBlog: allGraphCmsPost(sort: {fields: publishedAt, order: DESC}, limit: 4) {
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
  const btcNews = data.btcNews.nodes;
  const ethNews = data.ethNews.nodes;
  const latestBlog = data.latestBlog.nodes;
  const featuredBlog = data.featuredBlog.nodes;
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

                <p className="my-3">Are you among the millions of Canadians who are still unsure about the importance of cryptocurrency in modern economics? <strong>You aren't alone.</strong> Every day, digital currencies known as "cryptocurrency" are traded across the globe, and more than likely you've heard of a few. From Bitcoin to Ethereum, these currencies combine to a total value in the TRILLIONS of dollars, with many of them sure bets to be major players in future world markets.</p>

                <p className="text-center py-2 text-lg md:text-xl font-semibold tracking-tight">It's time you got your piece of the pie.</p>           
              
              </div>

              <Button text="Learn More" url="/learn" ariaLabel="" className=" text-2xl my-3 bg-red-600 hover:bg-red-700" />

              <div className="flex flex-col pt-5">

                <div className="flex flex-col lg:flex-row">

                  <div className="p-1 mx-2 lg:w-1/2">

                    <h1 className="text-3xl lg:text-4xl font-bold my-5 border-b border-primary-600 pt-1">Latest News</h1>

                    {latestNews.map((article) => {
                        
                      return(

                        <article className="shadow-lg rounded-lg flex flex-col items-center" key={article.id}>

                          <GatsbyImage image={article.remoteImage.childImageSharp.gatsbyImageData} alt={`${article.title} Image`} className="rounded-t-lg max-h-80 w-full"/>
                        
                          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold border-b border-primary-600 w-full mt-3 tracking-tight leading-none pb-1">{article.title}</h1>

                          <p className="pt-2 my-1 leading-tight w-full">{article.text.slice(0,200)}...</p>

                          <Button text="Read More" url={`/news/${article.slug}`} className="text-xl lg:text-2xl bg-indigo-700 hover:bg-indigo-900 mt-5" ariaLabel=""/>
                          
                        </article>
                      )
                    })}

                  </div>

                  <div className="p-1 mx-2 lg:w-1/2 flex flex-col">

                    <h1 className="text-2xl lg:text-3xl font-bold my-5 border-b border-primary-600 pt-2">Bitcoin News</h1>

                    <div className="grid grid-cols-2">

                      {btcNews.map((article) => {
                          
                        return(

                          <Link to={`/news/bitcoin/${article.slug}`} ariaLabel={article.title}>

                            <article className="shadow-lg rounded-lg flex flex-col items-center m-2" key={article.id}>

                              <GatsbyImage image={article.remoteImage.childImageSharp.gatsbyImageData} alt={`${article.title} Image`} className="rounded-t-lg max-h-36 w-full"/>
                            
                              <h1 className="text-xl font-semibold w-full mt-3 tracking-tight leading-none pb-1">{article.title}</h1>                     
                              
                            </article>

                          </Link>
                        )
                      })}

                    </div>

                    <Link className="mt-2 mx-2 text-sm font-medium flex flex-row items-center text-primary-400" to="/news/bitcoin" arialLabel="Read More Bitcoin News">
                        <FontAwesomeIcon icon={faChevronCircleRight} className="text-indigo-500 mr-2"/>Read More Bitcoin News
                    </Link>

                    <h1 className="text-2xl lg:text-3xl font-bold my-5 border-b border-primary-600">Ethereum News</h1>

                    <div className="grid grid-cols-2">

                      {ethNews.map((article) => {
                          
                        return(

                          <Link to={`/news/ethereum/${article.slug}`} ariaLabel={article.title}>

                            <article className="shadow-lg rounded-lg flex flex-col items-center m-2" key={article.id}>

                              <GatsbyImage image={article.remoteImage.childImageSharp.gatsbyImageData} alt={`${article.title} Image`} className="rounded-t-lg max-h-36 w-full"/>
                            
                              <h1 className="text-xl font-semibold w-full mt-3 tracking-tight leading-none pb-1">{article.title}</h1>                     
                              
                            </article>

                          </Link>
                        )
                      })}

                    </div>

                    <Link className="mt-2 mx-2 text-sm font-medium flex flex-row items-center text-primary-400" to="/news/ethereum" arialLabel="Read More Ethereum News">
                        <FontAwesomeIcon icon={faChevronCircleRight} className="text-indigo-500 mr-2"/>Read More Ethereum News
                      </Link>

                  </div>            

                </div>
          
                <div className="flex flex-col lg:flex-row pt-5">

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

                  <div className="mx-2 lg:w-1/2">

                    <h1 className="text-2xl lg:text-3xl font-bold my-5 border-b border-primary-600 pt-2 pb-1">Latest Blog Posts</h1>

                    <div className="grid grid-cols-2">
                      
                      {latestBlog.map((post) => {
                          
                        return(
                          <Link to={`/blog/${post.slug}`} ariaLabel={post.title}>
                            <article className="shadow-lg rounded-lg flex flex-col items-center m-1" key={post.id}>
                              <GatsbyImage image={post.coverImage.localFile.childImageSharp.gatsbyImageData} alt={`${post.title} Image`} className="rounded-t-lg h-24 lg:h-auto max-h-40 w-full"/>
                            
                              <h1 className="text-xl md:text-2xl font-semibold w-full mt-3 tracking-tight leading-none pb-1">{post.title}</h1>                     
                              
                            </article>
                          </Link>
                        )
                      })}

                    </div>

                  </div>

                </div>
 
              </div>      

          </div>

          <div className="px-2 pt-5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-indigo-300 font-bold pt-5 mb-4 text-center">Why use myCrypto Canada?</h1> 
            <p className="mb-5 px-1">The web is a labyrinth of information and unfortunately it can be difficult to get the right answers to the questions you're asking. That's a big deal, especially when your questions revolve around investing your hard-earned money. Many countries have different rules regarding trading cryptocurrency, and Canada is no different. That's why we set out to demistify the veil of uncertainty surrounding crypto for Canadians. We help you:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 my-2">

            <Link to="/learn" className="card">
                <span className="card-header">Learn</span>
                    <FontAwesomeIcon icon={faGraduationCap} className="card-icon"/>
                <span className="card-caption">Educate yourself about cryptocurrencies - how they work and how they are traded.</span>
            </Link>

            <Link to="/buy-sell-trade" className="card">
                <span className="card-header">Invest</span>
                    <FontAwesomeIcon icon={faChartLine} className="card-icon"/>
                <span className="card-caption">Turn your new-found knowledge of cryptocurrency into tangible wealth by trading currencies on the live market.</span>
            </Link>

            <Link to="/buy-sell-trade" className="card">
                <span className="card-header">Grow</span>
                    <FontAwesomeIcon icon={faCoins} className="card-icon"/>
                <span className="card-caption">Expand your crypto portfolio and leverage cryptocurrencies against one another to grow your wealth.</span>
            </Link>

          </div>

          <div className="flex flex-col items-center px-2">
            <p className="text-center py-2 text-lg md:text-xl font-semibold leading-tight">Interested? Crypto might not be for everyone but it could be for you!</p>           
            <Button text="Learn More" url="/learn" ariaLabel="" className=" text-2xl my-5 bg-red-600 hover:bg-red-700" />
          </div>
      </React.Fragment>

    )
  }

export default Index
