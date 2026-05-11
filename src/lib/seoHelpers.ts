export const generateBankOverviewTitle = (bankName: string) => {
  return `${bankName} Routing Number Directory (Federal Reserve 2026)`;
};

export const generateBankOverviewDescription = (bankName: string) => {
  return `Find the official 2026 routing numbers for ${bankName} across all states. Verify exact numbers for direct deposits, wire transfers, and ACH routing.`;
};

export const generateBankStateTitle = (bankName: string, stateName: string) => {
  return `${bankName} Routing Number ${stateName} (Federal Reserve 2026)`;
};

export const generateBankStateDescription = (bankName: string, stateName: string, routingNumber: string) => {
  return `The official 2026 Federal Reserve verified routing number for ${bankName} in ${stateName} is ${routingNumber}. Use this code for direct deposit, ACH and wire transfers.`;
};

export const generateLookupTitle = (routingNumber: string) => {
  return `Lookup Routing Number ${routingNumber} — Federal Reserve Verification`;
};

export const generateLookupDescription = (routingNumber: string, bankName: string) => {
  return `Verify if routing number ${routingNumber} belongs to ${bankName}. Check instantaneous validation status for wire transfers, ACH direct deposits and checks.`;
};

// Return a stringified script tag for SEO
export const generateBreadcrumbSchema = (crumbs: { name: string; url: string }[]) => {
  const allCrumbs = [
    { name: 'Home', url: 'https://usroutingnumber.com/' },
    ...crumbs
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allCrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
  return JSON.stringify(schema);
};

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(schema);
};

export const generateFinancialInstitutionSchema = (
  bankName: string, 
  routingNumber: string, 
  address?: string, 
  city?: string, 
  state?: string, 
  zip?: string, 
  phone?: string
) => {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'BankOrCreditUnion',
    name: bankName,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'RoutingNumber',
      value: routingNumber,
    },
  };

  if (address && city && state && zip) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: city,
      addressRegion: state,
      postalCode: zip,
      addressCountry: 'US',
    };
  }

  if (phone) {
    schema.telephone = phone;
  }

  return JSON.stringify(schema);
};

export const generateWebSiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'USRoutingNumber.com',
    url: 'https://usroutingnumber.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://usroutingnumber.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  return JSON.stringify(schema);
};

export const generateArticleSchema = (title: string, description: string, url: string, datePublished: string) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: 'USRoutingNumber.com Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'USRoutingNumber.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://usroutingnumber.com/logo.png'
      }
    },
    datePublished: datePublished,
    dateModified: datePublished,
  };
  return JSON.stringify(schema);
};
