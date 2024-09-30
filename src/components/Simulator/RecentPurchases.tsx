import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowUpRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { formatCurrency } from '@/utils/currency';

export const RecentPurchases = () => {
  return (
    <Card className='col-span-1 max-2xl:col-span-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Últimas Transações</CardTitle>
          <CardDescription>Transações Recentes em Seu Portfólio.</CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto gap-1'>
          <Link to='#'>
            Ver todas
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-left'>Código</TableHead>
              <TableHead className='text-left'>Transação</TableHead>
              <TableHead className='text-left'>Quantidade</TableHead>
              <TableHead className='text-right'>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Badge className='font-bold uppercase'>XAU</Badge>
              </TableCell>
              <TableCell>
                <Badge>Venda</Badge>
              </TableCell>
              <TableCell className='text-left'>5 Unidades</TableCell>
              <TableCell className='text-right'>{formatCurrency(72206, 'BRL', 'pt-BR')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Badge className='font-bold uppercase'>USD</Badge>
              </TableCell>
              <TableCell>
                <Badge>Compra</Badge>
              </TableCell>
              <TableCell className='whitespace-nowrap text-left'>500 Unidades</TableCell>
              <TableCell className='text-right'>{formatCurrency(2715, 'BRL', 'pt-BR')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Badge className='font-bold uppercase'>NZD</Badge>
              </TableCell>
              <TableCell>
                <Badge>Venda</Badge>
              </TableCell>
              <TableCell className='text-left'>187 Unidades</TableCell>
              <TableCell className='text-right'>{formatCurrency(645.15, 'BRL', 'pt-BR')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
