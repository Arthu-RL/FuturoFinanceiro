function translateAssetCategory(category: string) {
  const translations: Record<string, string> = {
    Fiat: 'Moedas',
    Crypto: 'Criptomoedas',
    Commodity: 'Commodities',
  };

  return translations[category] ?? category;
}

function translateAssetProfile(profile: string) {
  const translations: Record<string, string> = {
    'low-risk': 'Conservador',
    'medium-risk': 'Moderado',
    'high-risk': 'Agressivo',
  };

  return translations[profile] ?? profile;
}

function translateTransactionType(transaction: string) {
  const translations: Record<string, string> = {
    Purchase: 'Compra',
    Sale: 'Venda',
  };

  return translations[transaction] ?? transaction;
}

export { translateAssetCategory, translateAssetProfile, translateTransactionType };
