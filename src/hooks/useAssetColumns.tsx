import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import type { ProcessedInvestmentAssets } from '@/@types/investment';
import { formatCurrency } from '@/utils/currency';
import { translateAssetCategory, translateAssetProfile } from '@/utils/string';
import { generateAssetVariationColor } from '@/utils/styles';
import { getInvestmentAssetsVariation } from '@/utils/investmentAssets';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function useAssetColumns() {
  const columns: ColumnDef<ProcessedInvestmentAssets>[] = [
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
      accessorKey: 'price',
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
      cell: () => {
        const price1 = Math.random();
        const price2 = Math.random();
        const variation = getInvestmentAssetsVariation(price1, price2);
        const variationText = `${(variation > 0 && '+') || ''}${variation.toFixed(2)}%`;

        return (
          <div className='flex w-full'>
            <TableCell className='ml-auto px-4'>
              <Badge
                variant='outline'
                className={`font-normal text-white brightness-125 dark:font-bold dark:brightness-100 ${generateAssetVariationColor(price1, price2)}`}
              >
                {variationText}
              </Badge>
            </TableCell>
          </div>
        );
      },
    },

    {
      accessorKey: 'price',
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
        const formattedBRLPrice = formatCurrency(row.getValue('price'), 'BRL', 'pt-BR');
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
      cell: () => {
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
                <DropdownMenuItem className='cursor-pointer'>Vender</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>Comprar</DropdownMenuItem>
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
