import React from 'react'
import { Helmet } from 'react-helmet-async'
const SEO = ({ title, description, name, type, url, hashtag, image }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta property="type" content="website" />
            <meta property="url" content={url} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="msapplication-TileColor" content="#ffffff" />
            { /* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:url" content={url} />
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
            { /* End Twitter tags */}
        </Helmet>
    )
}

export default SEO
