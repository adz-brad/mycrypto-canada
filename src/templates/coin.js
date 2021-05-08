import React from 'react'
import { useQuery, gql } from '@apollo/client'
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
usdMarket: market(exchangeSymbol: "Binance", baseSymbol: $baseSymbol, quoteSymbol: "USDT") {
    ticker {
      lastPrice
    }
  },
cadMarket: market(exchangeSymbol: "Kraken", baseSymbol: $baseSymbol, quoteSymbol: "CAD") {
    ticker {
      lastPrice
    }
  },

}`;

const Coin = ({ pageContext: { coin } }) => {

    const { data: marketData, error: marketDataError, loading: marketDataLoading }  = useQuery(MARKET_QUERY, {
        variables: { baseSymbol: `${coin.symbol }` },
        pollInterval: 1000
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

            <div className="flex flex-col p-2 border-b-2 border-primary-600">

                <div className="flex flex-row items-center">
                    <h2 className="text-xl font-bold mr-2 text-indigo-300">Symbol:</h2>
                    <span className="text-lg">{coin.symbol}</span>
                </div>

                <div className="flex flex-row items-center">
                    <h2 className="text-xl font-bold mr-2 text-indigo-300">Market Cap:</h2>
                    {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                    {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                    {marketData?.asset ? (<span className="text-lg">$ {data.asset.marketCap}</span>) : null }
                </div>

                <div className="flex flex-row items-center">
                    <h2 className="text-xl font-bold mr-2 text-indigo-300">Market Cap Rank:</h2>
                    {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                    {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                    {marketData?.asset ? (<span className="text-lg">{data.asset.marketCapRank}</span>) : null }
                </div>

                <div className="flex flex-row items-center">
                    <h2 className="text-xl font-bold mr-2 text-indigo-300">Current Supply:</h2>
                    {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                    {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                    {marketData?.asset ? (<span className="text-lg">{data.asset.currentSupply}</span>) : null }
                </div>

                <div className="flex flex-row items-center">
                    <h2 className="text-xl font-bold mr-2 text-indigo-300">Total Supply:</h2>
                    {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                    {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                    {marketData?.asset ? (<span className="text-lg">{data.asset.totalSupply}</span>) : null }
                </div>

                <div className="flex flex-row items-center pt-2">
                    <h2 className="text-2xl font-bold mr-2 text-indigo-300">Price <small>(CAD)</small>:</h2>
                    {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                    {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                    {marketData?.cadMarket ? (<span className="text-xl">$ {parseFloat(data.cadMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                </div>

                <div className="flex flex-row items-center">
                    <h2 className="text-2xl font-bold mr-2 text-indigo-300">Price <small>(USD)</small>:</h2>
                    {marketDataLoading ? <FontAwesomeIcon icon={faSpinner} spin size="sm" /> : null}
                    {marketDataError ? <span className="italic text-sm font-medium">Error Loading Data</span> : null}
                    {marketData?.usdMarket ? (<span className="text-xl">$ {parseFloat(data.usdMarket.ticker.lastPrice).toFixed(2)}</span>) : null }
                </div>

                <span className="text-xs text-secondary-700 font-medium italic">CAD prices sourced from Kraken, USD prices sourced from Binance. Data courtesy of Blocktap.io.</span>
             
            </div>
 
    </div>

    )
}

export default Coin