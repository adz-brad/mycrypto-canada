import React from "react"
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faWallet, faCoins, faList, faQuestion, faUniversity, faHandshake, faChalkboardTeacher, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
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

        <div className="py-2">

            <div className="px-3">

                <div className="flex flex-col w-full border-b-2 border-primary-600 my-3">
                    <h1 className="text-3xl md:text-5xl font-bold font-headers tracking-tight pb-1">Learn About Crypto</h1>     
                </div>

                <p className="mb-5 px-1">myCrypto Canada is an online resource library where users can educate themselves on what cryptocurrencies are and how to use them. Specifically, it is a place for Canadians to learn how they can invest and grow their wealth through the trading of cryptocurrency.</p>
                
                <h1 className="text-2xl md:text-3xl text-indigo-300 border-b border-primary-600 font-semibold pt-1 mb-2">How does it work?</h1> 
                <p className="mb-5 px-1">It's super simple! There are no memberships, sign-ups or logins required - if you're interested, we have the resources for you. Browse the categories below to start your journey!</p>
            
                <div className="flex flex-col w-full border-b-2 border-primary-600 pt-3 my-5">
                    <h1 className="text-3xl md:text-5xl font-bold font-headers tracking-tight">Resources</h1>     
                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 my-5">

                <Link to="/learn/courses" className="card resources">
                    <FontAwesomeIcon icon={faUniversity} className="card-icon"/>
                    <span className="card-header">Courses</span>
                </Link>

                <Link to="/learn/careers" className="card resources">
                    <FontAwesomeIcon icon={faHandshake} className="card-icon"/>
                    <span className="card-header">Careers</span>
                </Link>

                <Link to="/learn/currencies" className="card resources">
                    <FontAwesomeIcon icon={faCoins} className="card-icon"/>
                    <span className="card-header">Currencies</span>
                </Link>

                <Link to="/learn/trading-platforms" className="card resources">
                    <FontAwesomeIcon icon={faMobileAlt} className="card-icon"/>
                    <span className="card-header">Platforms</span>
                </Link>

                <Link to="/learn/wallets" className="card resources">
                    <FontAwesomeIcon icon={faWallet} className="card-icon"/>
                    <span className="card-header">Wallets</span>
                </Link>

                <Link to="/learn/markets" className="card resources">
                    <FontAwesomeIcon icon={faChartLine} className="card-icon"/>
                    <span className="card-header">Markets</span>
                </Link>

                <Link to="/learn/how-to-guides" className="card resources">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="card-icon"/>
                    <span className="card-header">How-to Guides</span>
                </Link>

                <Link to="/learn/videos" className="card resources">
                    <FontAwesomeIcon icon={faYoutube} className="card-icon"/>
                    <span className="card-header">Videos</span>
                </Link>

                <Link to="/learn/glossary" className="card resources">
                    <FontAwesomeIcon icon={faList} className="card-icon"/>
                    <span className="card-header">Glossary</span>
                </Link>

                <Link to="/learn/faq" className="card resources">
                    <FontAwesomeIcon icon={faQuestion} className="card-icon"/>
                    <span className="card-header">FAQ</span>             
                </Link>

            </div>

            <div className="px-3">

                <h1 className="text-2xl md:text-3xl text-indigo-300 border-b border-primary-600 font-semibold pt-1 mb-2">Why use myCrypto Canada?</h1> 
                <p className="mb-5 px-1">The web is a labyrinth of information and unfortunately it can be difficult to get the right answers to the questions you're asking. That's a big deal, especially when you're questions are related to investing your hard-earned money. Many countries have different rules regarding trading cryptocurrency, and Canada is no different. That's why we set out to demistify the veil of uncertainty surrounding crypto for Canadians.</p>
                
                <h1 className="text-2xl md:text-3xl text-indigo-300 border-b border-primary-600 font-semibold pt-1 mb-2">What can I learn?</h1> 
                <p className="mb-5 px-1">Understanding the ins and outs of cryptocurrency trading before investing a single cent is vital to succeeding in trading crypto and building wealth. With myCrypto Canada, you can learn all about the different types of cryptocurrencies, types of markets, how currencies are traded and how cryptocurrencies are used in modern society.</p>
            
            </div>

        </div>

    </React.Fragment>

    )

}

export default Learn