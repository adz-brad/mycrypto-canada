import React from "react"
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCoins, faBook, faQuestion } from '@fortawesome/free-solid-svg-icons'
import Seo from '../components/seo/SEO'


const Learn = () => {
    
  const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    return(
    
    <React.Fragment>

        <Seo
            pageTitle="Learn"
            pageDescription="Learn about cryptocurrency at myCryptoCanada.ca"
            pageKeywords="Home, Learning, Education, Crypto, Cryptocurrency, Canada"
            pageImage=""
            pageUrl={sharingUrl}
        />

        <div className="p-2">

            <div className="flex flex-col w-full border-b-2 border-primary-600 my-5">
                <h1 className="text-3xl md:text-5xl font-bold font-headers tracking-tight pb-1">Learn About Crypto</h1>     
            </div>

            <h1 className="text-2xl md:text-3xl text-indigo-300 font-semibold py-1">What is myCrypto Canada?</h1> 
            <p className="mb-5">myCrypto Canada is an online resource library where users can educate themselves on what cryptocurrencies are and how to use them. Specifically, it is a place for Canadians to learn how they can invest and grow their wealth through the trading of cryptocurrency.</p>
            
            <h1 className="text-2xl md:text-3xl text-indigo-300 font-semibold py-1">Why use myCrypto Canada?</h1> 
            <p className="mb-5">The web is a labyrinth of information and unfortunately it can be difficult to get the right answers to the questions you're asking. That's a big deal, especially when you're questions are related to investing your hard-earned money. Many countries have different rules regarding trading cryptocurrency, and Canada is no different. That's why we set out to demistify the veil of uncertainty surrounding crypto for Canadians.</p>
            
            <h1 className="text-2xl md:text-3xl text-indigo-300 font-semibold py-1">What can I learn?</h1> 
            <p className="mb-5">Understanding the ins and outs of cryptocurrency trading before investing a single cent is vital to succeeding in trading crypto and building wealth. With myCrypto Canada, you can learn all about the different types of cryptocurrencies, types of markets, how currencies are traded and how cryptocurrencies are used in modern society.</p>
        
            <h1 className="text-2xl md:text-3xl text-indigo-300 font-semibold py-1">How does it work?</h1> 
            <p className="mb-5">It's super simple! There are no memberships, sign-ups or logins required - if you're interested, we have the resources for you. Browse the categories below to start your journey!</p>
        
            <div className="flex flex-col w-full border-b-2 border-primary-600 pt-3 my-5 ">
                <h1 className="text-3xl md:text-5xl font-bold font-headers tracking-tight pb-1">Resources</h1>     
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5">

                <Link to="/currencies" className="card">
                    <span className="card-header">Currencies</span>
                        <FontAwesomeIcon icon={faCoins} className="card-icon"/>
                    <span className="card-caption">All of the most popular cryptocurrencies featuring live market data.</span>
                </Link>

                <Link to="/markets" className="card">
                    <span className="card-header">Markets</span>
                        <FontAwesomeIcon icon={faChartLine} className="card-icon"/>
                    <span className="card-caption">All of the most relevant cryptocurrency markets.</span>
                </Link>

                <Link to="/glossary" className="card">
                    <span className="card-header">Glossary</span>
                        <FontAwesomeIcon icon={faBook} className="card-icon"/>
                    <span className="card-caption">Learn about all the important buzz words in the crypto world.</span>
                </Link>

                <Link to="/faq" className="card">
                    <span className="card-header">FAQ</span>
                        <FontAwesomeIcon icon={faQuestion} className="card-icon"/>
                    <span className="card-caption">Crypto Q&A to satisfy your deepest curiosities.</span>
                </Link>

            </div>

        </div>

    </React.Fragment>

    )

}

export default Learn