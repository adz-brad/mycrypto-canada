import React from 'react'
import { graphql } from 'gatsby'
import { useQuery, gql } from '@apollo/client'
import { GatsbyImage } from 'gatsby-plugin-image'
import LineGraph from 'react-line-graph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Bubble } from '../components/components'
import Button from '../components/button/button'


const MARKET_QUERY = gql`
  query ($baseSymbol: String!){
    asset(assetSymbol: $baseSymbol){
        currentSupply
        totalSupply
        marketCap
        marketCapRank
    }
    usdMarket: market(exchangeSymbol: "CoinbasePro", baseSymbol: $baseSymbol, quoteSymbol: "USDT") {
        ticker {
        lastPrice
        }
    },
    cadMarket: market(exchangeSymbol: "Kraken", baseSymbol: $baseSymbol, quoteSymbol: "CAD") {
        ticker {
        lastPrice
        }
    }
  }
`;

const CAD_HOURLY_QUERY = gql`
  query($baseSymbol: String!){
    timeseries(resolution: _1h, limit: 24, sort: OLD_FIRST) {
        markets(filter: { exchangeSymbol:{ _in:["Kraken"]} baseSymbol: { _eq: $baseSymbol }, quoteSymbol: { _eq: "CAD" } }) {
            closePrice
            percentChange
          }
      }
  }
`;

const CAD_WEEKLY_QUERY = gql`
  query($baseSymbol: String!){
    timeseries(resolution: _1d, limit: 7, sort: OLD_FIRST) {
        markets(filter: { exchangeSymbol:{ _in:["Kraken"]} baseSymbol: { _eq: $baseSymbol }, quoteSymbol: { _eq: "CAD" } }) {
          closePrice
          percentChange
        }
      }
  }
`;

const CAD_MONTHLY_QUERY = gql`
  query($baseSymbol: String!){
    timeseries(resolution: _1d, limit: 31, sort: OLD_FIRST) {
        markets(filter: { exchangeSymbol:{ _in:["Kraken"]} baseSymbol: { _eq: $baseSymbol }, quoteSymbol: { _eq: "CAD" } }) {
          closePrice
          percentChange
        }
      }
  }
`;

const CAD_THREEMONTH_QUERY = gql`
  query($baseSymbol: String!){
    timeseries(resolution: _1d, limit: 62, sort: OLD_FIRST) {
        markets(filter: { exchangeSymbol:{ _in:["Kraken"]} baseSymbol: { _eq: $baseSymbol }, quoteSymbol: { _eq: "CAD" } }) {
          closePrice
          percentChange
        }
      }
  }
`;

const CAD_YEARLY_QUERY = gql`
  query($baseSymbol: String!){
    timeseries(resolution: _1d, limit: 365, sort: OLD_FIRST) {
        markets(filter: { exchangeSymbol:{ _in:["Kraken"]} baseSymbol: { _eq: $baseSymbol }, quoteSymbol: { _eq: "CAD" } }) {
          closePrice
          percentChange
        }
      }
  }
`;


const Coin = ({ pageContext: { coin }, data: { news, blog } }) => {

    const { data: marketData, error: marketDataError, loading: marketDataLoading }  = useQuery(MARKET_QUERY, {
        variables: { baseSymbol: `${coin.symbol }` },
        pollInterval: 1000
    });

    const { data: cadHourlyData, error: cadHourlyDataError, loading: cadHourlyDataLoading } = useQuery(CAD_HOURLY_QUERY, {
        variables: { baseSymbol: `${coin.symbol}` },
        pollInterval: 60000
    });

    const { data: cadWeeklyData, error: cadWeeklyDataError, loading: cadWeeklyDataLoading } = useQuery(CAD_WEEKLY_QUERY, {
        variables: { baseSymbol: `${coin.symbol}` },
        pollInterval: 60000
    });

    const { data: cadMonthlyData, error: cadMonthlyDataError, loading: cadMonthlyDataLoading } = useQuery(CAD_MONTHLY_QUERY, {
        variables: { baseSymbol: `${coin.symbol}` },
        pollInterval: 86400000
    });

    const { data: cadThreeMonthData, error: cadThreeMonthDataError, loading: cadThreeMonthDataLoading } = useQuery(CAD_THREEMONTH_QUERY, {
        variables: { baseSymbol: `${coin.symbol}` },
        pollInterval: 86400000
    });

    const { data: cadYearlyData, error: cadYearlyDataError, loading: cadYearlyDataLoading } = useQuery(CAD_YEARLY_QUERY, {
        variables: { baseSymbol: `${coin.symbol}` },
        pollInterval: 86400000
    });

    return(

        <div className="p-2">

            <div className="w-full flex flex-col md:flex-row items-center py-2 border-b-2 border-primary-600">

                <div className="flex flex-col w-full md:w-1/2 py-2">

                    <div className="flex flex-col lg:flex-row items-center md:items-start">

                        <div className="flex flex-row items-center md:ml-4">
                            <div className="w-16 md:w-20">
                                <img className="w-full" src={coin.icon.url} alt={`${coin.name} Icon`}/>
                            </div>

                            <div className="ml-2">
                                <h1 className="text-5xl font-bold font-headers tracking-tight">{coin.name}</h1>
                            </div>
                        </div>

                        <div className="flex flex-row items-center md:ml-5 lg:mx-auto my-auto">
                            <div className="flex flex-row items-center ">
                                <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Symbol:</h2>
                                <Bubble className="text-lg md:text-xl px-3 py-1 m-1 bg-primary-600 text-white leading-none" text={coin.symbol}/>
                            </div>

                            <div className="flex flex-row items-center ml-2 md:mr-auto">
                                <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Rank:</h2>
                                {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                                {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                                {marketData?.asset ? (<Bubble className="text-lg md:text-xl px-3 py-1 m-1 bg-primary-600 text-white leading-none" text={`#${marketData.asset.marketCapRank}`}/>) : null }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start w-full pt-4 mx-auto md:ml-5">

                        <div className="flex flex-row items-center">
                            <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Market Cap </h2>
                            {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                            {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {marketData?.asset ? (<span className="text-lg lg:text-xl">$ {marketData.asset.marketCap}</span>) : null }
                        </div>

                        <div className="flex flex-row items-center">
                            <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Current Supply </h2>
                            {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                            {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {marketData?.asset ? (<span className="text-lg lg:text-xl">{marketData.asset.currentSupply}</span>) : null }
                        </div>

                        <div className="flex flex-row items-center">
                            <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Total Supply </h2>
                            {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                            {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {marketData?.asset ? (<span className="text-lg lg:text-xl">{marketData.asset.totalSupply}</span>) : null }
                        </div>

                        <div className="flex flex-row items-center">
                            <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Price <small>(CAD)</small></h2>
                            {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                            {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {marketData?.cadMarket ? (<span className="text-lg lg:text-xl">$ {parseFloat(marketData.cadMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                        </div>

                        <div className="flex flex-row items-center">
                            <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Price <small>(USD)</small></h2>
                            {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                            {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {marketData?.usdMarket ? (<span className="text-lg lg:text-xl">$ {parseFloat(marketData.usdMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                        </div>

                    </div>

                </div>

                <div className="w-full h-80 md:w-1/2 px-1 py-2 line-graph">

                    <Tabs>

                        <TabPanel>
                            {cadHourlyDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadHourlyDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadHourlyData?.timeseries ? (<LineGraph hover={true} accent="blue" smoothing={0.2} data={[].concat.apply([], Array.from(cadHourlyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>

                        <TabPanel>
                            {cadWeeklyDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadWeeklyDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadWeeklyData?.timeseries ? (<LineGraph hover={true} accent="blue" smoothing={0.2} data={[].concat.apply([], Array.from(cadWeeklyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>
                    
                        <TabPanel>
                            {cadMonthlyDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadMonthlyDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadMonthlyData?.timeseries ? (<LineGraph hover={true} accent="blue" smoothing={0.2} data={[].concat.apply([], Array.from(cadMonthlyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>

                        <TabPanel>
                            {cadThreeMonthDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadThreeMonthDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadThreeMonthData?.timeseries ? (<LineGraph hover={true} accent="blue" smoothing={0.2} data={[].concat.apply([], Array.from(cadThreeMonthData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>

                        <TabPanel>
                            {cadYearlyDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadYearlyDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadYearlyData?.timeseries ? (<LineGraph hover={true} accent="blue" smoothing={0.2} data={[].concat.apply([], Array.from(cadYearlyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>

                        <TabList>
                            <Tab>24 H</Tab>
                            <Tab>7 D</Tab>
                            <Tab>1 MO</Tab>
                            <Tab>3 MO</Tab>
                            <Tab>1 YR</Tab>
                        </TabList>
                    
                    </Tabs>

                </div>

            </div>

            <p className="text-xs p-1 text-secondary-700 font-medium italic leading-tight">CAD prices sourced from Kraken, USD prices sourced from CoinbasePro. Data courtesy of Blocktap.io.</p>
            
            <div className="coin-body py-2 md:px-2">

                <Tabs>

                    <TabList>

                        <Tab>News</Tab>
                        <Tab>Summary</Tab>
                        <Tab>History</Tab>                   
                        <Tab>Buy</Tab>

                    </TabList>

                    <TabPanel>

                        <h1 className="paragraph-header lg:text-4xl mt-5">Latest {coin.name} News</h1>

                        <div className="grid grid-cols-1 md:grid-cols-3">

                            {news.nodes.slice(0,3).map((node) => {

                                const article = node.context.news;

                                return(

                                    <div className="flex flex-col p-2 my-4">
                                        
                                        <article className="shadow-lg rounded-lg flex flex-col items-center h-full" key={article.id}>

                                            <img src={article.image_url} className="rounded-t-lg max-h-60 w-full object-cover" alt={article.title}/>

                                            <h1 className="text-xl md:text-2xl font-semibold border-b border-primary-600 w-full mt-3 tracking-tight leading-none pb-1">{article.title}</h1>
                                            <p className="my-1 pt-2 pb-5 leading-tight w-full">{article.text.slice(0,150)}...</p>
                                            <Button text="Read More" url={`/news/${coin.name.toLowerCase()}/${article.slug}`} className="text-xl lg:text-2xl bg-indigo-700 hover:bg-indigo-900 mt-auto" ariaLabel=""/>

                                        </article>

                                    </div>

                            )})}

                        </div>
                    </TabPanel>

                    <TabPanel>
                        <h1 className="paragraph-header lg:text-4xl mt-5">{coin.name} Summary</h1>
                        <div className="paragraph">                   
                            <MDXRenderer>{coin.summary.markdownNode.childMdx.body}</MDXRenderer>
                        </div>
                        <p className="font-medium text-xs text-primary-500 leading-none">Data Source: <a className="font-light" href={coin.referenceName} target="_blank" rel="noreferrer">{coin.referenceUrl}</a></p>
                    </TabPanel>

                    <TabPanel>
                        <h1 className="paragraph-header lg:text-4xl mt-5">{coin.name} History</h1>
                        <div className="paragraph">
                            <MDXRenderer>{coin.coinHistory.markdownNode.childMdx.body}</MDXRenderer>
                        </div>
                    </TabPanel>
             
                    <TabPanel>
                        <h1 className="paragraph-header lg:text-4xl mt-5">Buy {coin.name}</h1>
                        <div className="paragraph flex flex-col items-center">
                            <p className="w-full">Want to Buy {coin.name}? At myCrypto Canada, we provide all of the educational resources you need to make informed decisions about buying, selling and trading all types of cryptocurrency, including {coin.name}, and we encourage everyone to learn as much as they can to make responsible, informed decisions before getting started.</p> 
                            <p className="my-3">Find out how Canadians are buying, selling and trading {coin.name} today!</p>
                            <Button className="text-xl lg:text-2xl bg-indigo-700 hover:bg-indigo-900 my-4" url="/buy-sell-trade" text="Buy Crypto Today"/>
                        </div>
                    </TabPanel>
                </Tabs>

            </div>

            <div className="paragraph">

                <h1 className="paragraph-header lg:text-4xl">{coin.name} Blog Posts</h1>

                <div className="grid grid-cols-1 md:grid-cols-3">

                    {blog.nodes.slice(0,3).map((node) => {

                        return(

                            <div className="flex flex-col p-2 my-4">
                                
                                <article className="shadow-lg rounded-lg flex flex-col items-center h-full" key={node.id}>

                                    <GatsbyImage image={node.coverImage.localFile.childImageSharp.gatsbyImageData} className="rounded-t-lg max-h-60 w-full" alt={node.title}/>

                                    <h1 className="text-xl md:text-2xl font-semibold border-b border-primary-600 w-full mt-3 tracking-tight leading-none pb-1">{node.title}</h1>
                                    <p className="my-1 pt-2 pb-5 leading-tight w-full">{node.excerpt.slice(0,150)}...</p>
                                    <Button text="Read More" url={`/blog/${node.slug}`} className="text-xl lg:text-2xl bg-indigo-700 hover:bg-indigo-900 mt-auto" ariaLabel=""/>

                                </article>

                            </div>

                    )})}

                </div>

            </div>

        </div>

    )
}

export const pageQuery = graphql`
    query($symbol: String!, $tag: [String]) {
        news: allSitePage(filter: {context: {news: {symbol: {eq: $symbol}}}}) {
            nodes {
              context {
                news {
                  title
                  text
                  slug
                  image_url
                }
              }
            }
          },
        blog: allGraphCmsPost(filter: {tags: {in: $tag}}) {
            nodes {
              title
              slug
              excerpt
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
`

export default Coin