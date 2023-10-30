import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
const SEO = ({ title, description, name, type, hashtag, image, quote }) => {

    const location = useLocation()
    const currentUrl = 'https://aquacaintaresort.netlify.app' + location.pathname;
    return (
        <Helmet>
            <meta charset="utf-8" />
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="msapplication-TileColor" content="#ffffff" />
            { /* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:quote" content={quote} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:description" content={description} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            { /* End Twitter tags */}
        </Helmet>
    )
}

export default SEO
