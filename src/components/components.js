import React from 'react'

const Bubble = ({text, className}) => {
    return(
        <div className={`bubble flex flex-row justify-center items-center ${className}`}>
            {text}
        </div>
    )
}

export { Bubble }