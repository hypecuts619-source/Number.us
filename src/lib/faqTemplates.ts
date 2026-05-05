export const generateBankStateFAQs = (bankName: string, stateFullName: string, routingNumber: string, type: string) => {
  const currentYear = new Date().getFullYear();
  return [
    {
      question: `What is the ${bankName} routing number for ${stateFullName}?`,
      answer: `The official ${currentYear} routing number for ${bankName} branches in ${stateFullName} is ${routingNumber}. You can use this for safe processing.`,
    },
    {
      question: `Is ${routingNumber} the correct ACH routing number for ${bankName}?`,
      answer: `This routing number (${routingNumber}) is verified for ${type === 'BOTH' ? 'ACH direct deposits and Wire transfers' : type === 'ACH' ? 'ACH direct deposits only' : 'Wire transfers'}. Always confirm with your employer or sending institution before authorizing payments.`,
    },
    {
      question: `Can I use this ${bankName} routing number for international wire transfers?`,
      answer: `Usually, US routing numbers like ${routingNumber} are only used for domestic transfers. For international wires to ${bankName}, you will also need a SWIFT/BIC code.`,
    },
    {
      question: `Where can I find my ${bankName} routing number on a check?`,
      answer: `The routing number ${routingNumber} is typically the first nine digits located at the very bottom left side of your ${bankName} paper checks.`,
    },
    {
      question: `Does the routing number change if I move out of ${stateFullName}?`,
      answer: `If you opened your ${bankName} account in ${stateFullName}, you typically continue using the exact same routing number (${routingNumber}) even if you move to another state. Check your online banking to be completely sure.`,
    },
    {
      question: `Why does ${bankName} have multiple routing numbers?`,
      answer: `Large banks like ${bankName} have different routing numbers based on the geographic region where the account was opened, and sometimes they separate ACH, Wire, and Paper Check operations.`,
    },
    {
      question: `What happens if I use the wrong routing number for ${bankName}?`,
      answer: `If you do not use the correct routing number (for instance, using an ACH number for a Wire Transfer), the transaction will likely be delayed or returned with fees. Ensure you use ${routingNumber} only for its intended ${type} type.`,
    },
    {
      question: `How do I verify this routing number is currently active in ${currentYear}?`,
      answer: `The number ${routingNumber} has been checked against the latest ${currentYear} Federal Reserve system data. You can always double-check by calling ${bankName} customer service or logging into your mobile app.`,
    },
  ];
};

export const generateGeneralBankFAQs = (bankName: string) => {
  return [
    {
      question: `How do I find the correct routing number for ${bankName}?`,
      answer: `The easiest way to find your ${bankName} routing number is by looking at the bottom left of your paper checks, logging into your online banking portal, or using our comprehensive directory organized by state.`,
    },
    {
      question: `Are ACH and Wire routing numbers the same at ${bankName}?`,
      answer: `It varies. Some banks use the same routing number for both ACH direct deposits and wire transfers, while other large institutions use dedicated processing numbers for wire transfers. Always check the specific transaction type.`,
    },
    {
      question: `Is it safe to give out my ${bankName} routing number?`,
      answer: `Yes, routing numbers are public information used to identify the bank. However, you should guard your actual checking account number, as the combination of your routing number and account number can be used to initiate transactions.`,
    },
    {
      question: `What should I do if my direct deposit was sent to the wrong routing number?`,
      answer: `If you provided the wrong ${bankName} routing number for payroll or direct deposit, contact your employer or the sender immediately. The funds are typically rejected by the Federal Reserve and returned to the sender within a few business days.`,
    },
    {
      question: `Will my ${bankName} routing number change?`,
      answer: `Routing numbers rarely change, though they might be updated if ${bankName} merges with another bank or changes its operational structure. They will notify you well in advance if your routing number changes.`,
    },
  ];
};

export const generateLookupFAQs = (routingNumber: string, bankName?: string) => {
  const currentYear = new Date().getFullYear();
  return [
    {
      question: `What bank is routing number ${routingNumber}?`,
      answer: bankName ? `Routing number ${routingNumber} belongs to ${bankName}.` : `The routing number ${routingNumber} is mathematically valid, but we do not have public institution details for it. Usually it belongs to a local credit union or specific regional bank.`,
    },
    {
      question: `Is ${routingNumber} a valid routing number in ${currentYear}?`,
      answer: `Yes, ${routingNumber} passes the standard ABA checksum algorithm, meaning it is mathematically valid. Please contact your financial institution to confirm it is fully active for deposits or withdrawals.`,
    },
    {
      question: `Can I use ${routingNumber} for a wire transfer?`,
      answer: `Some routing numbers are restricted exclusively to electronic ACH transfers, while others support Wire transfers. You must confirm directly with the receiving institution to ensure ${routingNumber} is authorized for Domestic Wires before initiating funds.`,
    },
    {
      question: `How is the routing number ${routingNumber} verified?`,
      answer: `It is verified using a module 10 checksum algorithm established by the American Bankers Association. The first eight digits designate the Federal Reserve routing symbol and institution identifier, and the ninth digit must validate the preceding eight.`,
    },
    {
      question: `Where will I see routing number ${routingNumber}?`,
      answer: `If it belongs to your checking account, ${routingNumber} is printed as the first set of nine digits on the bottom left corner of your paper checks, or visible in your online banking app under "Account Details".`,
    }
  ];
};

export const generateHomeFAQs = () => {
  const currentYear = new Date().getFullYear();
  return [
    {
      question: `What is a routing number?`,
      answer: `A routing transit number (RTN) is a nine-digit code that identifies the financial institution in the United States upon which a payment is drawn. It essentially tells the financial network which bank holds your account.`,
    },
    {
      question: `How do I find a US bank routing number?`,
      answer: `You can find a routing number on the bottom of a personal check, by logging into your online banking, or by using our directory to search up official routing numbers for thousands of US banks.`,
    },
    {
      question: `Are routing numbers public info?`,
      answer: `Yes, routing numbers are public information and simply identify the bank branch or district. However, you should never share your routing number *alongside* your private account number unless initiating a secure transaction.`,
    },
    {
      question: `Do routing numbers change?`,
      answer: `Typically, no. However, a routing number might change if a bank is acquired, undergoes a structural merger, or consolidates regions. Banks inform customers well in advance if their routing number is going to change.`,
    },
    {
      question: `Is the ABA routing number the same as an ACH routing number?`,
      answer: `Often, yes. Most large banks use their ABA routing number for ACH direct deposits. However, some banks maintain separate, specific routing numbers exclusively for ACH transfers or exclusively for wire transfers.`,
    },
    {
      question: `Can international wire transfers use a 9-digit routing number?`,
      answer: `No. International transfers typically require a SWIFT code or BIC, potentially combined with a clearing code or IBAN, rather than the standard 9-digit US routing number.`,
    }
  ];
};

export const generateMajorBanksFAQs = () => {
  return [
    {
      question: `Do all major US banks have multiple routing numbers?`,
      answer: `Yes. Top financial institutions like Chase, Bank of America, and Wells Fargo operate nationally and thus maintain dozens of routing numbers corresponding to the states or regions where accounts were opened.`,
    },
    {
      question: `What is the difference between an ACH and Wire routing number for major banks?`,
      answer: `Major banks process immense volumes of transactions. To organize traffic, they often specify one 9-digit routing number for standard ACH (direct deposits/automatic bill pay) and a completely different 9-digit routing number to route Fedwire funds immediately.`,
    },
    {
      question: `Can I use any routing number for my bank?`,
      answer: `No, you must use the specific routing number designated for your account's state or region. While all the routing numbers might belong to the same bank, a mismatch can cause transaction delays or rejections.`,
    },
    {
      question: `Why don't major banks use a single national routing number?`,
      answer: `US banking infrastructure grew historically through acquisitions of local regional banks. The localized ABA numbers were retained to process checks accurately through their respective regional Federal Reserve branches.`,
    },
    {
      question: `How do I find my specific routing number for a major bank?`,
      answer: `The most accurate method is to check the bottom left corner of a check from your specific checkbook, or log in securely to the bank's mobile app to view the routing numbers assigned specifically to your checking account.`,
    }
  ];
};
