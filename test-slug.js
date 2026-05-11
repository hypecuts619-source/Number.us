const fs = require('fs');

const generateSlug = (name) => {
  if (!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const isBankSlugMatch = (dbBankName, searchSlug) => {
  const dbSlug = generateSlug(dbBankName);
  if (dbSlug === searchSlug) return true;
  
  const normalizedDb = dbSlug.replace(/-/g, '');
  const normalizedSearch = searchSlug.replace(/-/g, '');
  
  if (normalizedDb === normalizedSearch) return true;
  
  if (normalizedSearch === 'jpmorganchasebankna' || normalizedSearch === 'jpmorganchasebank' || normalizedSearch === 'chase' || normalizedSearch === 'jpmorganchase' || normalizedSearch === 'jpmorgan') {
    if (normalizedDb.includes('jpmorganchase') || (normalizedDb.includes('jpm') && normalizedDb.includes('chase'))) {
      return true;
    }
  }

  if (normalizedSearch === 'bankofamericana' || normalizedSearch === 'bankofamerica' || normalizedSearch === 'boa') {
    if (normalizedDb.includes('bankofamerica')) return true;
  }

  if (normalizedSearch.startsWith('well') || normalizedSearch.includes('fargo') || normalizedSearch === 'wellsfargo') {
    if (normalizedDb.includes('wellsfargo')) return true;
  }

  const rem = dbSlug.replace(searchSlug + '-', '');
  return dbSlug.startsWith(searchSlug + '-') && ['na', 'national-association', 'inc', 'llc', 'corp', 'company', 'bank', 'bank-na', 'bank-national-association', 'federal-credit-union', 'fcu', 'credit-union', 'cu'].includes(rem);
};

const data = require('./public/data/routing.json');
console.log('Chase (jpmorgan-chase-bank-na):', data.filter(d => isBankSlugMatch(d.bank_name, 'jpmorgan-chase-bank-na')).length);
console.log('Wells Fargo (wells-fargo-bank-na):', data.filter(d => isBankSlugMatch(d.bank_name, 'wells-fargo-bank-na')).length);
console.log('Bank of America (bank-of-america-na):', data.filter(d => isBankSlugMatch(d.bank_name, 'bank-of-america-na')).length);
