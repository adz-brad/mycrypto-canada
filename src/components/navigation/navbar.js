import React, { useState, useRef, useEffect } from 'react'
import { useOnClickOutside } from '../../hooks/closeMenu'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { NavLogo, MenuToggle, NavMenu } from './components'
import { StyledNav } from './components.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faInstagram, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

	const data = useStaticQuery(graphql`
		{
		  graphCmsSiteId {
			title
			slogan
			logo {
			localFile {
			  childImageSharp {
				gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
				}
			  }
			}
		  }
		}
	`)

	const siteID = data.graphCmsSiteId;

	const [open, setOpen] = useState(false);

	const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));

	const [scrolled, setScrolled] = React.useState(false);

    const handleScroll = () => {
        const offset=window.scrollY;
        if(offset > 100){
            setScrolled(true);
        }
        else{
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    let navbarClasses=['navbar'];
    if(scrolled){
        navbarClasses.push('scrolled');
    }
    
    if (typeof window !== "undefined") {
        require("smooth-scroll")('a[href*="#"]')
    }


    return(

		<StyledNav ref={node} className={`${navbarClasses.join(" ")} fixed top-0 left-0 z-30 flex flex-row items-center w-full bg-primary-900 px-3`}>

			<NavLogo
				title={siteID.title}
				caption={siteID.slogan}
				logoImage={siteID.logo.localFile.childImageSharp.gatsbyImageData}
				homeUrl="/"
			/>

			<MenuToggle open={open} setOpen={setOpen} />

			<NavMenu open={open} setOpen={setOpen} className="hidden bg-white lg:bg-transparent fixed lg:relative flex flex-col lg:flex-row w-full z-40 p-3">

				<div className="flex flex-col items-center lg:flex-row mx-auto">

					<Link className="nav-link" to="/learn" alt="" onClick={() => setOpen(!open)}>Learn</Link>
					<Link className="nav-link" to="/trade" alt="" onClick={() => setOpen(!open)}>Trade</Link>
					<Link className="nav-link" to="/news" alt="" onClick={() => setOpen(!open)}>News</Link>
					<Link className="nav-link" to="/blog" alt="" onClick={() => setOpen(!open)}>Blog</Link>
					<Link className="nav-link" to="/careers" alt="" onClick={() => setOpen(!open)}>Careers</Link>
					<Link className="nav-link" to="/shop" alt="" onClick={() => setOpen(!open)}>Shop</Link>
					<Link className="nav-link" to="/search" alt="" onClick={() => setOpen(!open)}><span className="lg:hidden">Search</span><FontAwesomeIcon className="hidden lg:flex" icon={faSearch} /></Link>

				</div>			

				<div>

					<div className="flex flex-row items-center my-3 justify-center lg:ml-auto">
						<a href="https://www.facebook.com" alt="Link to myCrypto Canada Facebook Page" aria-label="Link to myCrypto Canada Facebook Page" className="social-link"><FontAwesomeIcon icon={faFacebookF} size="2x"/></a>
						<a href="https://www.instagram.com" alt="Link to myCrypto Canada Instagram Page" aria-label="Link to myCrypto Canada Instagram Page" className="social-link"><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
						<a href="https://www.pinterest.com" alt="Link to myCrypto Canada Pinterest Page" aria-label="Link to myCrypto Canada Pinterest Page" className="social-link"><FontAwesomeIcon icon={faPinterestP} size="2x"/></a>
						<a href="https://www.twitter.com" alt="Link to myCrypto Canada Twitter Profile" aria-label="Link to myCrypto Canada Twitter Profile" className="social-link"><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
						<a href="https://www.linkedin.com" alt="Link to myCrypto Canada LinkedIn Profile" aria-label="Link to myCrypto Canada LinkedIn Profile" className="social-link"><FontAwesomeIcon icon={faLinkedinIn} size="2x"/></a>
					</div>

				</div>


			</NavMenu>

		</StyledNav>

    )
}

export default Navbar