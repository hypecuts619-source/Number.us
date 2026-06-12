import React from 'react';
import { Helmet } from 'react-helmet-async';

interface DynamicSchemaData {
  bankName: string;
  routingNumber: string;
  city?: string;
  state?: string;
  zip?: string;
  address?: string;
  phone?: string;
  isCreditUnion?: boolean;
}

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
  schemaData?: DynamicSchemaData;
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
  authorName = "Stephen Sebastian",
  schemaData
}: SEOProps) {
  const currentUrl = `https://usroutingnumber.com${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`.toLowerCase();
  
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

  // Programmatic JSON-LD Schema Factory for dynamic branches
  const dynamicSchemas: any[] = [];
  if (schemaData) {
    const { bankName, routingNumber, city, state, zip, address, phone, isCreditUnion } = schemaData;
    const branchName = city && state ? `${bankName} ${city} Branch` : bankName;
    const orgType = isCreditUnion ? "CreditUnion" : "BankOrCreditUnion";

    dynamicSchemas.push({
      "@context": "https://schema.org",
      "@type": orgType,
      "name": branchName,
      "url": currentUrl,
      "telephone": phone || undefined,
      "address": city && state ? {
        "@type": "PostalAddress",
        "streetAddress": address && address !== 'Unknown' ? address : undefined,
        "addressLocality": city,
        "addressRegion": state,
        "postalCode": zip && zip !== 'Unknown' ? zip : undefined,
        "addressCountry": "US"
      } : undefined,
      "identifier": {
        "@type": "PropertyValue",
        "name": "Routing Number",
        "value": routingNumber
      },
      "makesOffer": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "FinancialProduct",
          "name": "Checking Account Direct Deposit Integration",
          "description": `ACH routing setup utilizing transit number ${routingNumber}.`
        }
      }
    });

    dynamicSchemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the routing number for ${bankName} ${city ? `in ${city}, ${state}` : ''}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The verified 9-digit ABA routing number for ${bankName} ${city ? `in ${city}` : ''} is ${routingNumber}. Use this code for domestic wire transfers and ACH direct deposits.`
          }
        },
        {
          "@type": "Question",
          "name": `Is it safe to use ${routingNumber} for a direct deposit into my ${bankName} account?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, ${routingNumber} satisfies the Modulus-10 checksum validation required by the Federal Reserve and can be used to set up payroll direct deposits with Accounts Payable.`
          }
        }
      ]
    });
  }

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

      {dynamicSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}

      {/* Additional schema or tags passed as children */}
      {children}
    </Helmet>
  );
}

