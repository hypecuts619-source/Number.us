import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: 'website' | 'article';
  imageUrl?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

export default function SEO({ 
  title, 
  description, 
  canonicalUrl, 
  type = 'website',
  imageUrl = 'https://usroutingnumber.com/og-image.jpg', // Default OG image placeholder
  noindex = false,
  children
}: SEOProps) {
  const currentUrl = `https://usroutingnumber.com${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;
  
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="en-US" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Search Engine Directives */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

      {/* Prevent clickjacking */}
      <meta httpEquiv="X-Frame-Options" content="DENY" />

      {/* Additional schema or tags passed as children */}
      {children}
    </Helmet>
  );
}
