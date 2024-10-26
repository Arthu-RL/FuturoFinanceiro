import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { formatCurrency } from '@/utils/currency';
import { useUserAccount } from '@/providers/userAccountProvider';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { ScrollArea } from '../ui/scroll-area';
import { translateTransactionType } from '@/utils/string';

export const RecentPurchases = () => {
  const { assets } = useInvestmentAssets();
  const { user } = useUserAccount();

  const reversedHistory = [...user.transactionHistory].reverse();

  return (
    <Card className='col-span-1 h-full max-2xl:col-span-4'>
      <CardHeader className='flex flex-row items-center px-4'>
        <div className='grid gap-2'>
          <CardTitle>Suas Atividades Financeiras</CardTitle>
          <CardDescription>Histórico das Transações em Seu Portfólio.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-4'>
        <ScrollArea className='relative h-[27.6rem] pr-4'>
          {reversedHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-left'>Código</TableHead>
                  <TableHead className='px-3 text-left'>Tipo</TableHead>
                  <TableHead className='px-3 text-left'>Valor</TableHead>
                  <TableHead className='text-right'>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reversedHistory.map((assetHistory, index) => {
                  const asset = assets.find((asset) => asset.id === assetHistory.id);
                  const price =
                    assetHistory.type === 'Purchase' ? assetHistory.purchasePrice : assetHistory.sellingPrice;

                  return (
                    <TableRow key={`${asset?.id}-${index}`}>
                      <TableCell>
                        <Badge variant='outline' className='font-bold uppercase'>
                          {asset?.alias}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>{translateTransactionType(assetHistory.type)}</Badge>
                      </TableCell>
                      <TableCell className='whitespace-nowrap text-left'>
                        {formatCurrency(price * assetHistory.quantity, 'BRL', 'pt-BR')}
                      </TableCell>
                      <TableCell className='whitespace-nowrap text-right'>
                        {assetHistory.quantity} Unidades
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className='absolute inset-0 flex items-center justify-center rounded-b-md text-sm transition-colors hover:bg-muted/50'>
              <span className='max-w-48 text-center text-foreground'>
                Nenhuma atividade financeira encontrada.
              </span>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
