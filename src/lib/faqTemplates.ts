const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

export const generateBankStateFAQs = (bankName: string, stateFullName: string, routingNumber: string, type: string) => {
  const currentYear = new Date().getFullYear();
  const seed = hashString(bankName + stateFullName);
  
  const templates = [
    {
      q: [
        `What is the ${bankName} routing number for ${stateFullName}?`,
        `How do I find the ${stateFullName} routing number for ${bankName}?`,
        `Can you tell me the ${bankName} routing number in ${stateFullName}?`,
        `Looking for the ${bankName} routing number for branches in ${stateFullName}.`,
      ],
      a: [
        `The official ${currentYear} routing number for ${bankName} branches in ${stateFullName} is ${routingNumber}. You can use this for safe processing.`,
        `For ${bankName} accounts opened in ${stateFullName}, the verified routing number is ${routingNumber}.`,
        `Use ${routingNumber} as the routing number for ${bankName} within the state of ${stateFullName}.`,
        `The correct 9-digit code for ${bankName} in ${stateFullName} is ${routingNumber}, valid for ${currentYear}.`,
      ]
    },
    {
      q: [
        `Is ${routingNumber} the correct ACH routing number for ${bankName}?`,
        `Can I use ${routingNumber} for a direct deposit to ${bankName}?`,
        `Will ${routingNumber} work for ACH transfers at ${bankName}?`,
      ],
      a: [
        `This routing number (${routingNumber}) is verified for ${type === 'BOTH' ? 'ACH direct deposits and Wire transfers' : type === 'ACH' ? 'ACH direct deposits only' : 'Wire transfers'}. Always confirm with your employer or sending institution.`,
        `${routingNumber} is the designated ABA code for ${type === 'BOTH' ? 'both ACH and wire' : type.toLowerCase()} processing at ${bankName}. Verify with your local branch when setting up payroll.`,
        `You can use ${routingNumber} specifically for ${type === 'BOTH' ? 'ACH and Wire Transactions' : type === 'ACH' ? 'ACH deposits' : 'Domestic Wires'} sent to ${bankName}.`,
      ]
    },
    {
      q: [
        `Can I use this ${bankName} routing number for international wire transfers?`,
        `Does ${routingNumber} work for receiving international funds to ${bankName}?`,
        `Is ${routingNumber} a SWIFT code for ${bankName}?`,
      ],
      a: [
        `Usually, US routing numbers like ${routingNumber} are only used for domestic transfers. For international wires to ${bankName}, you will also need a SWIFT/BIC code.`,
        `No, ${routingNumber} is a domestic 9-digit code. International wires to ${bankName} require a SWIFT code in addition to standard account details.`,
        `Foreign transfers generally do not rely exclusively on ${routingNumber}. Reach out to ${bankName} to obtain their specific SWIFT/BIC code for international wires.`,
      ]
    },
    {
      q: [
        `Where can I find my ${bankName} routing number on a check?`,
        `How do I locate the ${routingNumber} on my ${bankName} checkbook?`,
        `Where is the routing number printed on ${bankName} checks?`,
      ],
      a: [
        `The routing number ${routingNumber} is typically the first nine digits located at the very bottom left side of your ${bankName} paper checks.`,
        `Look at the bottom left-hand corner of your personal ${bankName} check. The 9-digit sequence starting the MICR line will be ${routingNumber}.`,
        `On standardized ${bankName} checks, ${routingNumber} sits at the bottom left, immediately preceding your account number.`,
      ]
    },
    {
      q: [
        `Does the routing number change if I move out of ${stateFullName}?`,
        `If I move away from ${stateFullName}, will my ${bankName} routing number still be ${routingNumber}?`,
        `Can I keep using ${routingNumber} if I relocate from ${stateFullName}?`,
      ],
      a: [
        `If you opened your ${bankName} account in ${stateFullName}, you typically continue using the exact same routing number (${routingNumber}) even if you move to another state. Check your online banking to be completely sure.`,
        `Routing numbers are tied to where the account was opened. So if you opened it in ${stateFullName}, you'll likely retain ${routingNumber} forever, regardless of your permanent address.`,
        `Generally, yes. The ${routingNumber} code remains linked to your ${bankName} account based on the ${stateFullName} origination branch, not your current mailing address.`,
      ]
    },
    {
      q: [
        `Why does ${bankName} have multiple routing numbers?`,
        `How come there isn't just one routing number for all of ${bankName}?`,
        `Why are there so many different routing codes for ${bankName}?`,
      ],
      a: [
        `Large banks like ${bankName} have different routing numbers based on the geographic region where the account was opened, and sometimes they separate ACH, Wire, and Paper Check operations.`,
        `Because ${bankName} operates across numerous regions, they acquired legacy routing numbers during mergers and maintain regional designations for Federal Reserve sorting.`,
        `${bankName} utilizes multiple routing digits to segment state-by-state payment traffic and to explicitly separate ACH batches from real-time Wire transactions.`,
      ]
    },
    {
      q: [
        `What happens if I use the wrong routing number for ${bankName}?`,
        `Will my transfer bounce if I don't use ${routingNumber} for ${bankName}?`,
        `What are the consequences of using an incorrect ${bankName} ABA number?`,
      ],
      a: [
        `If you do not use the correct routing number (for instance, using an ACH number for a Wire Transfer), the transaction will likely be delayed or returned with fees. Ensure you use ${routingNumber} only for its intended ${type} type.`,
        `An incorrect routing digit can cause ${bankName} to reject the deposit. Always verify that ${routingNumber} matches your specific account and transaction protocol.`,
        `Mismatched routing numbers—especially mixing ACH and Wire codes—typically trigger automatic rejections. Utilize ${routingNumber} strictly according to its ${type} categorization to avoid penalties.`,
      ]
    },
    {
      q: [
        `How do I verify this routing number is currently active in ${currentYear}?`,
        `Is there a way to validate that ${routingNumber} is correct for ${bankName}?`,
        `How can I be sure ${routingNumber} is still valid this year?`,
      ],
      a: [
        `The number ${routingNumber} has been checked against the latest ${currentYear} Federal Reserve system data. You can always double-check by calling ${bankName} customer service or logging into your mobile app.`,
        `Our database cross-references ${routingNumber} with the Federal Reserve E-Payments directory for ${currentYear}. For absolute final confirmation, consult your ${bankName} online banking portal.`,
        `While ${routingNumber} validates perfectly via the Checksum algorithm, we recommend calling ${bankName} support or checking your secure portal to confirm its ${currentYear} operability.`,
      ]
    }
  ];

  return templates.map((tmpl, idx) => ({
    question: tmpl.q[(seed + idx) % tmpl.q.length],
    answer: tmpl.a[(seed + idx * 2) % tmpl.a.length],
  }));
};

export const generateGeneralBankFAQs = (bankName: string) => {
  const seed = hashString(bankName);
  
  const templates = [
    {
      q: [
        `How do I find the correct routing number for ${bankName}?`,
        `Where can I look up my ${bankName} routing number?`,
        `What's the best way to get a routing number for ${bankName}?`,
      ],
      a: [
        `The easiest way to find your ${bankName} routing number is by looking at the bottom left of your paper checks, logging into your online banking portal, or using our comprehensive directory organized by state.`,
        `You can find the ${bankName} routing code on a personal checkbook, inside your mobile banking application under 'Account Details', or by searching our state-by-state database.`,
        `Review the lower-left corner of a physical check, or sign into the secure ${bankName} website to locate your specific digital routing code securely.`,
      ]
    },
    {
      q: [
        `Are ACH and Wire routing numbers the same at ${bankName}?`,
        `Does ${bankName} use different routing numbers for wire transfers?`,
        `Can I use the exact same number for direct deposits and wires at ${bankName}?`,
      ],
      a: [
        `It varies. Some banks use the same routing number for both ACH direct deposits and wire transfers, while other large institutions use dedicated processing numbers for wire transfers. Always check the specific transaction type.`,
        `Major institutions frequently segregate traffic, utilizing one 9-digit code for payroll ACH and an entirely different ABA digit for expedited wires. Verification is crucial.`,
        `Often, they differ. ${bankName} may provide distinct routing architectures for domestic wires versus standard ACH payments. Never guess between the two.`,
      ]
    },
    {
      q: [
        `Is it safe to give out my ${bankName} routing number?`,
        `Can someone steal from me if I share my ${bankName} routing number?`,
        `Is my ${bankName} routing number public information?`,
      ],
      a: [
        `Yes, routing numbers are public information used to identify the bank. However, you should guard your actual checking account number, as the combination of your routing number and account number can be used to initiate transactions.`,
        `Routing numbers merely target the institution; they are public knowledge. Your private account number is what must be protected at all costs to prevent unauthorized draft requests.`,
        `Sharing just the routing number is safe. It acts as an institutional map. You only risk exposure if you disclose your confidential account numeral alongside it.`,
      ]
    },
    {
      q: [
        `What should I do if my direct deposit was sent to the wrong routing number?`,
        `How do I fix a deposit sent to the wrong ${bankName} routing number?`,
        `I gave my employer an incorrect routing number for ${bankName}. What now?`,
      ],
      a: [
        `If you provided the wrong ${bankName} routing number for payroll or direct deposit, contact your employer or the sender immediately. The funds are typically rejected by the Federal Reserve and returned to the sender within a few business days.`,
        `Immediately notify the payroll department or the original sender. The ACH network generally bounces unrecognized routing parameters back within 48 to 72 hours.`,
        `Errors in the routing digit cause the Federal Reserve to reject the entire batch. Alert the sender so they can reissue the compensation once the funds bounce back.`,
      ]
    },
    {
      q: [
        `Will my ${bankName} routing number change?`,
        `Do routing numbers at ${bankName} expire?`,
        `Is there any reason my ${bankName} routing code would update?`,
      ],
      a: [
        `Routing numbers rarely change, though they might be updated if ${bankName} merges with another bank or changes its operational structure. They will notify you well in advance if your routing number changes.`,
        `They do not arbitrarily expire. MBR consolidation or corporate reorganizations are the only typical catalysts for a routing code modification at ${bankName}.`,
        `While inherently stable, corporate buyouts can force a routing transition. If ${bankName} alters its ABA sequences, you'll receive ample postal notification.`,
      ]
    }
  ];

  return templates.map((tmpl, idx) => ({
    question: tmpl.q[(seed + idx) % tmpl.q.length],
    answer: tmpl.a[(seed + idx * 3) % tmpl.a.length],
  }));
};

export const generateLookupFAQs = (routingNumber: string, bankName?: string) => {
  const currentYear = new Date().getFullYear();
  const seed = hashString(routingNumber + (bankName || 'Unknown'));
  
  const bankRef = bankName ? bankName : 'the associated bank';

  const templates = [
    {
      q: [
        `Is the routing number ${routingNumber} correct for ${bankRef}?`,
        `Can I verify ${routingNumber} as a valid routing number?`,
        `Does ${routingNumber} actually belong to ${bankRef}?`,
      ],
      a: [
        `Yes, according to the ${currentYear} Federal Reserve directory, ${routingNumber} is a mathematically valid 9-digit American Bankers Association (ABA) routing transit number.`,
        `The 9-digit code ${routingNumber} passes the official checksum validation and is listed as an active ABA routing number for ${currentYear}.`,
        `Our validation systems confirm that ${routingNumber} is a structurally accurate ABA routing code currently in active circulation.`,
      ]
    },
    {
      q: [
        `How does the check digit calculation work for ${routingNumber}?`,
        `What does the last digit in ${routingNumber} mean?`,
        `How is ${routingNumber} verified as a real routing number?`,
      ],
      a: [
        `The final digit in ${routingNumber} is a "checksum". It is calculated using a specific mathematical formula (Modulus 10) on the first 8 digits to prevent typos and ensure accuracy.`,
        `The 9th digit of ${routingNumber} acts as a mathematical verified. Our systems run the first 8 digits through the ABA Modulus 10 formula to ensure it matches the final number, preventing simple data entry mistakes.`,
        `To ensure ${routingNumber} is not a typo, the banking network uses a checksum algorithm. The final number must equal a specific sum derived from the preceding eight digits.`,
      ]
    },
    {
      q: [
        `Where is routing number ${routingNumber} located on a check?`,
        `How can I visually confirm ${routingNumber} on my paper checks?`,
        `Where do I look for ${routingNumber} on a checkbook?`,
      ],
      a: [
        `Look at the MICR line at the bottom of your check. ${routingNumber} will be the first set of nine numbers on the far left side, framed by two identical transit symbols.`,
        `The ABA transit number, such as ${routingNumber}, is always located in the bottom left-hand corner of a standard check, printed in specialized magnetic ink.`,
        `Inspect the bottom left edge of your physical check; the 9 digits reading ${routingNumber} represent the routing protocol, followed immediately by your personal account number.`,
      ]
    },
    {
      q: [
        `Should I use ${routingNumber} for a wire transfer or ACH?`,
        `Is ${routingNumber} for direct deposits or wires?`,
        `What type of transaction is ${routingNumber} used for?`,
      ],
      a: [
        `You must verify the specific transaction type with ${bankRef}. Some routing numbers support both ACH and Wire, while others are strictly separated. Do not guess.`,
        `Because ACH clearing and Wire transfers operate on entirely different networks, it is crucial you contact ${bankRef} to confirm exactly which network ${routingNumber} is authorized on.`,
        `Using ${routingNumber} haphazardly for either ACH or Wire without confirming with your institution can result in bounced transactions. Always verify its intended utilization.`,
      ]
    }
  ];

  return templates.map((tmpl, idx) => ({
    question: tmpl.q[(seed + idx) % tmpl.q.length],
    answer: tmpl.a[(seed + idx * 2) % tmpl.a.length],
  }));
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
