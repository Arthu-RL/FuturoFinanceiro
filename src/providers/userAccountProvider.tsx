import { createContext, ReactNode, useContext } from 'react';
import { User } from '@/lib/schemas/user.schema';
import { useManageUserAccount } from '@/hooks/useManageUserAccount';

export type UserData = { user: User; updateUser: (user: User) => void };

const user = {
  currentBalance: 10000,
  currentProfitability: 0,
  currentWallet: [],
  transactionHistory: [],
  balanceHistory: [],
  profitabilityHistory: [],
  walletHistory: [],
  achievements: [
    {
      name: 'Primeira Aquisição' as const,
      description: 'Faça sua primeira compra e comece sua trajetória como investidor!',
      isCompleted: false,
    },
    {
      name: 'Primeiro Lucro' as const,
      description: 'Venda um ativo a um preço mais alto do que o valor de compra.',
      isCompleted: false,
    },
    {
      name: 'Vendedor Experiente' as const,
      description: 'Realize sua 100ª venda e se torne um comerciante veterano.',
      isCompleted: false,
    },
    {
      name: 'Diversificador de Portfólio' as const,
      description: 'Mantenha ativos de pelo menos dois tipos diferentes em seu portfólio.',
      isCompleted: false,
    },
    {
      name: 'Investidor Conservador' as const,
      description: 'Invista em mais de cinco ativos de baixo risco para uma carteira estável.',
      isCompleted: false,
    },
    {
      name: 'Explorador de Cripto' as const,
      description: 'Adicione dez criptomoedas ao seu portfólio e explore o mercado digital.',
      isCompleted: false,
    },
    {
      name: 'Comerciante de Commodities' as const,
      description: 'Mantenha pelo menos três commodities em seu portfólio.',
      isCompleted: false,
    },
    {
      name: 'Caçador de Riscos' as const,
      description: 'Invista em pelo menos cinco ativos de alto risco e abrace a volatilidade.',
      isCompleted: false,
    },
    {
      name: 'Milionário do Dia' as const,
      description: 'Consiga uma rentabilidade total diária superior a R$10.000.',
      isCompleted: false,
    },
    {
      name: 'Gênio da Semana' as const,
      description: 'Alcance uma rentabilidade semanal superior a R$100.000.',
      isCompleted: false,
    },
    {
      name: 'Trader Ativo' as const,
      description: 'Complete 50 transações (compra ou venda) no simulador.',
      isCompleted: false,
    },
    {
      name: 'Colecionador de Ativos' as const,
      description: 'Adquira 20 ativos diferentes e diversifique seu portfólio.',
      isCompleted: false,
    },
    {
      name: 'Grande Lucro' as const,
      description: 'Realize uma venda com lucro superior a R$10.000.',
      isCompleted: false,
    },
    {
      name: 'Primeiro Milhão' as const,
      description: 'Alcance um saldo de R$1.000.000 e entre para o clube dos milionários.',
      isCompleted: false,
    },
    {
      name: 'Mestre dos Investimentos' as const,
      description: 'Complete todas as conquistas disponíveis e obtenha o reconhecimento supremo.',
      isCompleted: false,
    },
  ],
};

const userInitialState = { user, updateUser: () => {} };

const UserAccountProviderContext = createContext<UserData>(userInitialState);

const UserAccountProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useManageUserAccount(userInitialState.user);

  return (
    <UserAccountProviderContext.Provider value={{ user, updateUser }}>
      {children}
    </UserAccountProviderContext.Provider>
  );
};

const useUserAccount = () => {
  const context = useContext(UserAccountProviderContext);
  if (!context) throw new Error('useUserAccount must be used within a UserAccountProvider');
  return context;
};

export { UserAccountProvider, useUserAccount };
