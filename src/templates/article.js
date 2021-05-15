import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const Article = ({ pageContext: { news } }) => {

    return(

        <div className="flex flex-col items-center p-2 lg:w-3/4 mx-auto">

            <div className="flex flex-col items-center w-full text-center py-5">
                <h1 className="text-3xl md:text-4xl w-full font-bold border-b-2 border-primary-600 tracking-tighter leading-none pb-1">{news.title}</h1>
                <div className="flex flex-col md:flex-row items-center pt-3">
                    <div className="flex flex-row items-center">
                        <span className="text-sm text-primary-300 mr-1">Published:</span><span className="text-sm md:mx-2">{news.date.split('-')[0]} EST</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <span className="text-sm text-primary-300 md:mx-2">Source:</span><a className="text-sm ml-1" href={news.news_url} target="_blank" rel="noreferrer">{news.source_name}</a>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <GatsbyImage className="w-full rounded-md shadow-lg" image={news.remoteImage.childImageSharp.gatsbyImageData} alt={`${news.title} Image`} />
                <p className="font-medium text-xs text-primary-500 leading-none">Image Source: <a className="font-light" href={news.image_url} target="_blank" rel="noreferrer">{news.image_url}</a></p>
            </div>

            <div className="py-2 mt-4">
                <p className="">{news.text}</p>
            </div>

            <a className="font-headers font-semibold text-2xl bg-indigo-900 hover:bg-indigo-800 leading-none p-4 rounded-md shadow-lg my-5" href={news.news_url} target="_blank" rel="noreferrer">Read Full Article</a>


            
        </div>

    )
}

export default Article