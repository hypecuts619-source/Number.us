import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: 'website' | 'article';
  imageUrl?: string;
  noindex?: boolean;
  keywords?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  // Let parents pass exactly what jsonld is needed
  schemas?: any[];
  children?: React.ReactNode;
}

export default function SEO({ 
  title, 
  description, 
  canonicalUrl, 
  type = 'website',
  imageUrl,
  noindex = false,
  keywords,
  datePublished,
  dateModified,
  authorName,
  schemas = [],
  children
}: SEOProps) {
  const currentUrl = `https://usroutingnumber.com${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`.toLowerCase();
  
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="en-US" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="US Routing Number" />
      
      {/* Article Metadata */}
      {type === 'article' && datePublished && <meta property="article:published_time" content={datePublished} />}
      {type === 'article' && dateModified && <meta property="article:modified_time" content={dateModified} />}
      {type === 'article' && authorName && <meta property="article:author" content={authorName} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Search Engine Directives */}
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* JSON-LD Schemas */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {children}
    </Helmet>
  );
}


