import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../button/button'
import { StyledFilter, StyledToggle } from './components.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { bool, func } from 'prop-types'

const SearchHit = ({ hit: { objectID, title, slug, image, excerpt } }) => {
    
    return(

        <article className="w-full p-2 flex flex-col items-center" key={objectID}> 
            <GatsbyImage className="rounded-t-md shadow-lg w-full h-60" image={image} alt=""/>
            <h1 className="text-3xl font-bold tracking-tighter border-b-2 border-primary-600 leading-none pt-2 pb-1 w-full">{title}</h1>
            <p className="py-1">{excerpt}</p>
            <Button className="text-xl lg:text-2xl bg-indigo-700 hover:bg-indigo-900 mt-5" url={`/blog/${slug}`} text="Read Post"/>
        </article>

    )
};

const FilterOverlay = ({children, className, open }) => {

    return(

        <StyledFilter open={open} className={className}>
            {children}
        </StyledFilter>

    )
}

FilterOverlay.propTypes = {
    open: bool.isRequired,
};

const FilterToggle = ({className, open, setOpen}) => {

    return(

        <div onClick={() => setOpen(!open)} onkeydown={() => setOpen(!open)} role="button" aria-pressed="false" tabindex="0" className={className}>
            <span className="text-lg md:text-xl font-semibold ml-auto mr-2">Search Filters</span>
            <StyledToggle open={open}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} className="text-xl" />
            </StyledToggle>
        </div>
    )
}

FilterToggle.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};

export { SearchHit, FilterOverlay, FilterToggle };