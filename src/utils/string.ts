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

export { translateAssetCategory, translateAssetProfile };
