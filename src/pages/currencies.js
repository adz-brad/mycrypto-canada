import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Currencies = () => {

    const data = useStaticQuery(graphql`
      {
        allGraphCmsCoin {
            nodes {
              id
              name
              slug
              icon{
              url
              }
            }
          }
      }
    `)

    return(

        <div className="p-2">

            <div className="flex flex-col w-full border-b-2 border-primary-600 pt-1">
                <h1 className="text-5xl font-bold font-headers tracking-tight">Currencies</h1>     
            </div>

            <p className="p-1">Click on a cryptocurrency to learn more about it.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-2">

                {data.allGraphCmsCoin.nodes.map((coin) => {
                    return(
                        <Link className="flex flex-col items-center cursor-pointer p-2" to={`/currencies/${coin.slug}`} key={coin.id}>
                            <img className="w-4/5 transform hover:scale-105 p-2" src={coin.icon.url} alt={`${coin.name} Icon`} />
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{coin.name}</h1>
                        </Link>
                    )
                })}

            </div>

        </div>

    )
}

export default Currencies