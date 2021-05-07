import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StyledToggle, StyledMenu, } from './components.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'
import { bool, func } from 'prop-types'
  
    const NavLogo = ( { homeUrl, title, caption, logoImage }) => {

        return(
        
            <div className="py-2">

                <Link 
                    className="flex flex-row items-center"
                    to={homeUrl} 
                    alt="Link to Adrenalize e-Commerce Home Page"
                >

                    <GatsbyImage 
                        className="w-10 sm:w-12 lg:w-16 mx-1"
                        image={logoImage} 
                        alt={`${title} Logo`} 
                    />

                    <div className="flex flex-col ml-2 sm:ml-3">
                        <h1 className="text-2xl lg:text-4xl font-extrabold text-white leading-none font-headers drop-shadow-md">{title}</h1>            
                        <div className="flex items-center">
                            <h2 className="text-base sm:text-md lg:text-2xl font-medium leading-none font-headers uppercase text-white">{caption}</h2>
                            <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-lg lg:text-2xl ml-1 text-red-600"/>
                        </div>
                    </div>


                </Link>

            </div>
        
        )
    }

    const MenuToggle = ({open, setOpen}) => {
    
        return(

            <StyledToggle onClick={() => setOpen(!open)} open={open} className="toggle-button ml-3 flex lg:hidden right-4 absolute" role="button" aria-label="Menu Toggle">
                <div />
                <div />
                <div />
            </StyledToggle>               
        )
    }

    MenuToggle.propTypes = {
        open: bool.isRequired,
        setOpen: func.isRequired,
    };

    const NavMenu =({className, children, open}) =>{

        return(
            
            <StyledMenu open={open} className={className}>
                    {children}           
            </StyledMenu>
        
        )
    }

    NavMenu.propTypes = {
        open: bool.isRequired,
    }


export { NavLogo, MenuToggle, NavMenu }