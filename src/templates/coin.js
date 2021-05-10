import React from 'react'
import { useQuery, gql } from '@apollo/client'
import LineGraph from 'react-line-graph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MDXRenderer } from 'gatsby-plugin-mdx'

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


const Coin = ({ pageContext: { coin } }) => {

    const { data: marketData, error: marketDataError, loading: marketDataLoading }  = useQuery(MARKET_QUERY, {
        variables: { baseSymbol: `${coin.symbol }` },
        pollInterval: 1000
    });

    const { data: cadHourlyData, error: cadHourlyDataError, loading: cadHourlyDataLoading } = useQuery(CAD_HOURLY_QUERY, {
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

            <div className="flex flex-row items-center w-full border-b-2 border-primary-600 py-2">

                <div className="w-16 mr-2 ml-auto">
                    <img className="w-full" src={coin.icon.url} alt={`${coin.name} Icon`}/>
                </div>

                <div className="ml-2 mr-auto">
                    <h1 className="text-5xl font-bold font-headers tracking-tight">{coin.name}</h1>
                </div>

            </div>

            <div className="w-full flex flex-col md:flex-row items-center py-2 border-b-2 border-primary-600">

                <div className="w-full sm:px-5 md:w-3/5 xl:w-2/3 px-1 py-2 line-graph">

                    <Tabs>

                        <TabPanel>
                            {cadHourlyDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadHourlyDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadHourlyData?.timeseries ? (<LineGraph hover={true} accent="blue" data={[].concat.apply([], Array.from(cadHourlyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>
                    
                        <TabPanel>
                            {cadMonthlyDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadMonthlyDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadMonthlyData?.timeseries ? (<LineGraph hover={true} accent="blue" data={[].concat.apply([], Array.from(cadMonthlyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>

                        <TabPanel>
                            {cadThreeMonthDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadThreeMonthDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadThreeMonthData?.timeseries ? (<LineGraph hover={true} accent="blue" data={[].concat.apply([], Array.from(cadThreeMonthData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>

                        <TabPanel>
                            {cadYearlyDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
                            {cadYearlyDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                            {cadYearlyData?.timeseries ? (<LineGraph hover={true} accent="blue" data={[].concat.apply([], Array.from(cadYearlyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)))))}/>) : null}                       
                        </TabPanel>

                        <TabList>
                            <Tab>24 H</Tab>
                            <Tab>1 MO</Tab>
                            <Tab>3 MO</Tab>
                            <Tab>1 YR</Tab>
                        </TabList>
                    
                    </Tabs>

                </div>

                <div className="flex flex-col w-full md:w-2/5 xl:w-1/3 py-2 ml-5">

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Symbol:</h2>
                        <span className="text-lg lg:text-xl">{coin.symbol}</span>
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Market Cap:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg lg:text-xl">$ {marketData.asset.marketCap}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Market Cap Rank:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg lg:text-xl">{marketData.asset.marketCapRank}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Current Supply:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg lg:text-xl">{marketData.asset.currentSupply}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Total Supply:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg lg:text-xl">{marketData.asset.totalSupply}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Price <small>(CAD)</small>:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.cadMarket ? (<span className="text-lg lg:text-xl">$ {parseFloat(marketData.cadMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl lg:text-2xl font-bold mr-2 text-indigo-300">Price <small>(USD)</small>:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.usdMarket ? (<span className="text-lg lg:text-xl">$ {parseFloat(marketData.usdMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                    </div>

                </div>

            </div>

            <p className="text-xs p-1 text-secondary-700 font-medium italic leading-tight">CAD prices sourced from Kraken, USD prices sourced from CoinbasePro. Data courtesy of Blocktap.io.</p>
            
            <div className="paragraph">
                <h1 className="paragraph-header">Currency Summary</h1>
                <MDXRenderer>{coin.summary.markdownNode.childMdx.body}</MDXRenderer>
            </div>

            <div className="paragraph">
                <h1 className="paragraph-header">Currency History</h1>
                <MDXRenderer>{coin.coinHistory.markdownNode.childMdx.body}</MDXRenderer>
            </div>

            <div className="paragraph">
                <h1 className="paragraph-header">How Can I Buy {coin.name} in Canada?</h1>
            </div>

            <div className="paragraph">
                <h1 className="paragraph-header">Blog Posts</h1>
            </div>

            <div className="paragraph">
                <h1 className="paragraph-header">Data References</h1>
            </div>

        </div>

    )
}

export default Coin