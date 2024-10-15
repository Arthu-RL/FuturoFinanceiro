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

function getProfitStatus(profit: number) {
  if (profit < 0) return 'Prejuízo';
  if (profit > 0) return 'Lucro';
  return 'Estável';
}

function getProfitTextColor(profit: number) {
  if (profit < 0) return 'text-red-600';
  if (profit > 0) return 'text-green-500';
  return 'text-foreground';
}

export {
  getProfitStatus,
  getProfitTextColor,
  translateAssetCategory,
  translateAssetProfile,
  translateTransactionType,
};
