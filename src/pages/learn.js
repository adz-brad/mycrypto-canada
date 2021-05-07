import React from "react"
import Seo from '../components/seo/SEO'
import { faGraduationCap, faChartLine, faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

        <div className="p-1">

            <h1 className="text-2xl font-semibold my-3 border-b border-primary-600 pt-1">What is myCrypto Canada?</h1> 
            <p className="my-3">myCrypto Canada is an online resource library where users can educate themselves on what cryptocurrencies are and how to use them. Specifically, it is a place for Canadians to learn how they can invest and grow their wealth through the trading of cryptocurrency.</p>
            
            <h1 className="text-2xl font-semibold my-3 border-b border-primary-600 pt-1">Why use myCrypto Canada?</h1> 
            <p className="my-3">The web is a labyrinth of information and unfortunately it can be difficult to get the right answers to the questions you're asking. That's a big deal, especially when you're questions are related to investing your hard-earned money. Many countries have different rules regarding trading cryptocurrency, and Canada is no different. That's why we set out to demistify the veil of uncertainty surrounding crypto for Canadians.</p>
            
            <h1 className="text-2xl font-semibold my-3 border-b border-primary-600 pt-1">What can I learn?</h1> 
            <p className="my-3">Understanding the in's and out's of cryptocurrency trading before investing a single cent is vital to succeeding in trading crypto and building wealth. With myCrypto Canada, you can:</p>
        
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 cursor-pointer my-2">

            <div className="card">
                <span className="card-header">Educate</span>
                    <FontAwesomeIcon icon={faGraduationCap} className="card-icon"/>
                <span className="card-caption">Learn all about cryptocurrencies - how they work and how they are traded.</span>
            </div>

            <div className="card">
                <span className="card-header">Invest</span>
                    <FontAwesomeIcon icon={faChartLine} className="card-icon"/>
                <span className="card-caption">Turn your new-found knowledge of cryptocurrency into tangible wealth by trading currencies on the live market.</span>
            </div>

            <div className="card">
                <span className="card-header">Grow</span>
                    <FontAwesomeIcon icon={faCoins} className="card-icon"/>
                <span className="card-caption">Expand your crypto portfolio and leverage cryptocurrencies against one another to grow your wealth.</span>
            </div>

        </div>

    </React.Fragment>

    )

}

export default Learn