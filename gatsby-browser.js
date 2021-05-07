import React from 'react'
import Layout from './src/components/layout/layout'
import './src/styles/global.css'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch'
import { MDXProvider } from '@mdx-js/react'

const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

const blocktapLink = new HttpLink({
  uri: process.env.GATSBY_BLOCKTAP_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_BLOCKTAP_API_KEY}`,
  },
  fetch,
});

const blocktapClient = new ApolloClient ({
  link: blocktapLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
  };

const wrapRootElement = ({ element }) => {
  return (
      <ApolloProvider client={blocktapClient}>
        <MDXProvider>
              {element}
        </MDXProvider>
      </ApolloProvider>
  )
}

export { wrapPageElement, wrapRootElement, onServiceWorkerUpdateReady }