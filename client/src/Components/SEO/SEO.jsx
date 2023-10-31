import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
const SEO = ({ title, description, name, type, hashtag, image, quote }) => {

    const location = useLocation()
    const currentUrl = 'https://resortcainta.netlify.app' + location.pathname;
    return (
        <Helmet>
            <meta charset="utf-8" />
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta property="type" content={type} />
            <meta property="url" content={currentUrl} />
            <meta content="image/*" property="og:image:type" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            { /* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:quote" content={quote} />
            <meta property="og:url" content={window.location.pathname + window.location.search} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta property="twitter:url" content={currentUrl}/>
            <meta name="twitter:image" content={image} />
            { /* End Twitter tags */}
        </Helmet>
    )
}

export default SEO
