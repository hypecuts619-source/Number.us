export const generateBankOverviewTitle = (bankName: string) => {
  return `${bankName} Routing Number 2026 — Lookup ACH & Wire`;
};

export const generateBankOverviewDescription = (bankName: string) => {
  return `Find all routing numbers for ${bankName} across all states. Check which number to use for ACH direct deposits, wire transfers, and paper checks safely.`;
};

export const generateBankStateTitle = (bankName: string, stateName: string) => {
  return `${bankName} Routing Number ${stateName} (Lookup 2026)`;
};

export const generateBankStateDescription = (bankName: string, stateName: string, routingNumber: string) => {
  return `The ${new Date().getFullYear()} routing number for ${bankName} in ${stateName} is ${routingNumber}. Learn how to use it safely for direct deposits, wire transfers, and ordering checks.`;
};

export const generateLookupTitle = (routingNumber: string) => {
  return `${routingNumber} Routing Number — Bank Lookup & Verification`;
};

export const generateLookupDescription = (routingNumber: string, bankName: string) => {
  return `Bank details for routing number ${routingNumber}. Verify this number belongs to ${bankName} and check if it supports ACH, wire transfers, or paper checks.`;
};

// Return a stringified script tag for SEO
export const generateBreadcrumbSchema = (crumbs: { name: string; url: string }[]) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
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
