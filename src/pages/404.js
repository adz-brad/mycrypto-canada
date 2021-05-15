import React from 'react'
import Seo from '../components/seo/SEO'


const NotFoundPage = () => {


    const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return(

            <div className="text-center flex flex-col items-center py-10">
 
                <Seo
                    pageTitle="404"
                    pageDescription="404. This Page Does Not Exist."
                    pageKeywords="404, myCrypto, Canada, Page Not Found"
                    pageImage=""
                    pageUrl={sharingUrl}
                />
            
                <span className="text-2xl font-semibold">This is not the page you are looking for...</span>
                <span className="text-base font-medium">Unfortunately the page you ARE looking for can't be found, probably because it doesn't exist... YET! In the meantime, why not check out our search page to see what else you can find.</span>
            
            </div>

    )
}

export default NotFoundPage