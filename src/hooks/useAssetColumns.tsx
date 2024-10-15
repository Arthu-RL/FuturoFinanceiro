import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { formatCurrency } from '@/utils/currency';
import { translateAssetCategory, translateAssetProfile } from '@/utils/string';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Assets } from '@/lib/schemas/assets.schema';
import { useUserAccount } from '@/providers/userAccountProvider';
import { filterRowsByUserWalletAssets, sortRowsByValue, sortRowsByVariation } from '@/utils/rows';
import { TransactionModal } from '@/components/Simulator/TransactionModal';
import { AssetVariation } from '@/components/Simulator/AssetsTable/AssetVariation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function useAssetColumns() {
  const { user } = useUserAccount();

  const columns: ColumnDef<Assets>[] = [
    {
      accessorKey: 'id',
      filterFn: (row) => filterRowsByUserWalletAssets(row, user.currentWallet),
    },

    {
      header: 'Código',
      accessorKey: 'alias',
      cell: ({ row }) => {
        return (
          <TableCell className='p-0'>
            <Badge variant='outline'>{row.getValue('alias')}</Badge>
          </TableCell>
        );
      },
    },

    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Nome
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='max-w-44 overflow-hidden text-ellipsis whitespace-nowrap px-4'>
                {row.getValue('name')}
              </TooltipTrigger>
              <TooltipContent>
                <span>{row.getValue('name')}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },

    {
      accessorKey: 'profile',
      header: () => {
        return <TableCell>Perfil</TableCell>;
      },
      cell: ({ row }) => {
        return (
          <TableCell>
            <Badge variant='outline'>{translateAssetProfile(row.getValue('profile'))}</Badge>
          </TableCell>
        );
      },
    },

    {
      accessorKey: 'type',
      header: () => {
        return <TableCell>Categoria</TableCell>;
      },
      cell: ({ row }) => {
        return (
          <TableCell>
            <Badge variant='outline'>{translateAssetCategory(row.getValue('type'))}</Badge>
          </TableCell>
        );
      },
    },

    {
      accessorKey: 'variation',
      sortingFn: sortRowsByVariation,
      header: ({ column }) => {
        return (
          <div className='flex h-full w-full py-1'>
            <Button
              variant='ghost'
              className='ml-auto text-end'
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Variação
              <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <TableCell className='flex'>
            <AssetVariation row={row} />
          </TableCell>
        );
      },
    },

    {
      accessorKey: 'value',
      sortingFn: sortRowsByValue,
      header: ({ column }) => {
        return (
          <div className='flex h-full w-full py-1'>
            <Button
              variant='ghost'
              className='ml-auto text-end'
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Preço
              <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const values = Object(row.getValue('value'));
        const currentValue = 'current' in values ? values.current : 0;
        const formattedBRLPrice = formatCurrency(currentValue, 'BRL', 'pt-BR');
        return (
          <div className='flex w-full'>
            <TableCell className='ml-auto px-4 font-medium'>{formattedBRLPrice}</TableCell>
          </div>
        );
      },
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const asset = user.currentWallet.find(({ id }) => id === row.original.id);
        const userHasAsset = asset && asset.quantity > 0;

        return (
          <div className='flex w-full'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='ml-auto'>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                {userHasAsset && (
                  <DropdownMenuItem asChild className='cursor-pointer p-0'>
                    <TransactionModal
                      row={row}
                      transaction='sell'
                      textContent={{ trigger: 'Vender', confirm: 'Confirmar Venda' }}
                    />
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className='cursor-pointer p-0'>
                  <TransactionModal
                    row={row}
                    transaction='buy'
                    textContent={{ trigger: 'Comprar', confirm: 'Confirmar Compra' }}
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={() => {}}>
                  Ver detalhes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return columns;
}
