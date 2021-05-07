import React, { useEffect } from 'react'

const Header = ({ children }) => {
    return(
        <header>
            {children}
        </header>
    )
}

const PageWrapper = ({ children }) => {

    useEffect(() => window.scrollTo(0, 0), [])

    return(
        <main className="page-wrapper">
            {children}
        </main>
    )
}

const Footer = ({ children }) => {
    return(
        <footer>
            {children}
        </footer>
    )
}

export { Header, PageWrapper, Footer }