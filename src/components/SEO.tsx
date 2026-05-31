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
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

export default function SEO({ 
  title, 
  description, 
  canonicalUrl, 
  type = 'website',
  imageUrl = 'https://usroutingnumber.com/og-image.jpg', // Default OG image placeholder
  noindex = false,
  children,
  datePublished,
  dateModified,
  authorName = "Stephen Sebastian"
}: SEOProps) {
  const currentUrl = `https://usroutingnumber.com${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;
  
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "USRoutingNumber.com Verification Engine",
    "url": "https://usroutingnumber.com",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "Client-side Modulo 10 check-digit validation, offline local storage tracking, sub-millisecond bank directory search filtering."
  };

  const articleSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "datePublished": datePublished || "2026-05-14T00:00:00Z",
    "dateModified": dateModified || "2026-05-31T00:00:00Z",
    "author": {
      "@type": "Person",
      "name": authorName,
      "jobTitle": "Head of Marketing & Product",
      "url": "https://usroutingnumber.com/about-us"
    },
    "publisher": {
      "@type": "Organization",
      "name": "USRoutingNumber.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://usroutingnumber.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : null;

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

      {/* Global structured data schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema, null, 2) }}
      />

      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema, null, 2) }}
        />
      )}

      {/* Additional schema or tags passed as children */}
      {children}
    </Helmet>
  );
}

