import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { FacebookShareButton, FacebookMessengerShareButton, LinkedinShareButton, TwitterShareButton, PinterestShareButton, RedditShareButton, WhatsappShareButton, EmailShareButton } from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faPinterestP, faTwitter, faFacebookMessenger, faRedditAlien, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Post = ({ pageContext: { post } }) => {

    const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return(

        <div className="flex flex-col items-center lg:w-3/4 mx-auto">

            <div className="flex flex-col items-center w-full text-center md:px-2 py-5">
                <h1 className="text-3xl md:text-4xl w-full font-bold md:border-b-2 border-primary-600 tracking-tighter leading-none pb-1">{post.title}</h1>
            </div>

            <div className="w-full md:p-2">
                <GatsbyImage className="w-full -px-2 md:rounded-md md:shadow-lg max-h-80" image={post.coverImage.localFile.childImageSharp.gatsbyImageData} alt={`${post.title} Image`} />
                <p className="font-medium text-xs text-primary-500 leading-none px-2 md:px-0">Image Credit: {post.imageCredit}</p>
            </div>

            <div className="flex flex-row w-full pt-3 px-3 -mb-2">
                <span className="text-sm text-indigo-300 mr-1">Published:</span><span className="text-sm md:mx-2">{post.date}</span>
            </div>

            <div className="px-3 mt-4 post-body">
                <MDXRenderer>{post.content.markdownNode.childMdx.body}</MDXRenderer>
            </div>

            <div className="social-sharing text-center w-full mb-2 px-2 md:px-0">

                <div className="wrapper">

                <p className="font-semibold font-headers mt-3 mb-1 pt-2 text-indigo-300 border-t-2 border-primary-600">Help your friends learn about crypto by sharing this post.</p>

                <FacebookShareButton 
                    url={sharingUrl}
                    quote={post.excerpt}
                    hashtag={`#${post.title}`}
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faFacebookF} />
                </FacebookShareButton>

                <FacebookMessengerShareButton
                    url={sharingUrl}
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faFacebookMessenger}/>
                </FacebookMessengerShareButton>

                <LinkedinShareButton 
                    url={sharingUrl}
                    title={post.title}
                    summary={post.excerpt}
                    source="https://www.adrenalizeme.com"
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faLinkedinIn} />
                </LinkedinShareButton>

                <TwitterShareButton 
                    url={sharingUrl}
                    title={post.title}
                    hashtags={post.tags}
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faTwitter}/>
                </TwitterShareButton>

                <PinterestShareButton 
                    url={sharingUrl}
                    media={post.coverImage.localFile.url}
                    description={post.excerpt}
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faPinterestP} />
                </PinterestShareButton>

                <RedditShareButton 
                    url={sharingUrl}
                    title={post.title}
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faRedditAlien} />
                </RedditShareButton>

                <WhatsappShareButton 
                    url={sharingUrl}
                    title={post.title}
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faWhatsapp} />
                </WhatsappShareButton>

                <EmailShareButton 
                    url={sharingUrl}
                    subject={post.title}
                    body={post.excerpt}
                >
                <FontAwesomeIcon className="social-sharing-icon" icon={faEnvelope} />
                </EmailShareButton>

                </div>

            </div>
            
        </div>

    )
}

export default Post