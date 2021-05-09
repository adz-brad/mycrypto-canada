import React from 'react'
import { useQuery, gql } from '@apollo/client'
import LineGraph from 'react-line-graph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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

const USD_HOURLY_QUERY = gql`
  query($baseSymbol: String!){
    timeseries(resolution: _1h, limit: 24, sort: OLD_FIRST) {
        markets(filter: { exchangeSymbol:{ _in:["CoinbasePro"]} baseSymbol: { _eq: $baseSymbol }, quoteSymbol: { _eq: "USDT" } }) {
          closePrice
          percentChange
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


const Coin = ({ pageContext: { coin } }) => {

    const { data: marketData, error: marketDataError, loading: marketDataLoading }  = useQuery(MARKET_QUERY, {
        variables: { baseSymbol: `${coin.symbol }` },
        pollInterval: 1000
    });

    console.log(marketData);

    const { data: usdHourlyData, error: usdHourlyDataError, loading: usdHourlyDataLoading } = useQuery(USD_HOURLY_QUERY, {
        variables: { baseSymbol: `${coin.symbol}` },
        pollInterval: 60000
    });

    console.log(usdHourlyData);

    const usdHourlyPriceList = usdHourlyData?.timeseries ? ( usdHourlyData.timeseries.map((timeseries) => timeseries.markets.map((market) => parseFloat(market.closePrice).toFixed(2)) ) ) : null;
  
    const priceMap = Array.from(usdHourlyPriceList);
    console.log(priceMap)

    const data = [].concat.apply([], priceMap);
    console.log(data);

    const props = {
        data,
        accent: 'rgba(165, 180, 252,1)',
        hover: true,
    };

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

            <div className="w-full flex flex-row items-center p-2 border-b-2 border-primary-600">

                <div className="h-60 w-3/5 p-2">
                    <LineGraph {...props}/>
                </div>


                <div className="flex flex-col w-2/5 p-2 ml-5">

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl font-bold mr-2 text-indigo-300">Symbol:</h2>
                        <span className="text-lg">{coin.symbol}</span>
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl font-bold mr-2 text-indigo-300">Market Cap:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg">$ {marketData.asset.marketCap}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl font-bold mr-2 text-indigo-300">Market Cap Rank:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg">{marketData.asset.marketCapRank}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl font-bold mr-2 text-indigo-300">Current Supply:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg">{marketData.asset.currentSupply}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl font-bold mr-2 text-indigo-300">Total Supply:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.asset ? (<span className="text-lg">{marketData.asset.totalSupply}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center pt-2">
                        <h2 className="text-xl font-bold mr-2 text-indigo-300">Price <small>(CAD)</small>:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.cadMarket ? (<span className="text-lg">$ {parseFloat(marketData.cadMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                    </div>

                    <div className="flex flex-row items-center">
                        <h2 className="text-xl font-bold mr-2 text-indigo-300">Price <small>(USD)</small>:</h2>
                        {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                        {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                        {marketData?.usdMarket ? (<span className="text-lg">$ {parseFloat(marketData.usdMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                    </div>

                    </div>

            </div>

            
            <span className="text-xs text-secondary-700 font-medium italic">CAD prices sourced from Kraken, USD prices sourced from CoinbasePro. Data courtesy of Blocktap.io.</span>
             
 
    </div>

    )
}

export default Coin