import { ArrowUpDown, CircleArrowDown, CircleArrowUp, CircleDot, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { formatCurrency } from '@/utils/currency';
import { translateAssetCategory, translateAssetProfile } from '@/utils/string';
import { getVariationStatus } from '@/utils/styles';
import { getAssetVariation } from '@/utils/number';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Assets } from '@/lib/schemas/assets.schema';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function useAssetColumns() {
  const columns: ColumnDef<Assets>[] = [
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
      accessorKey: 'value',
      sortingFn: (rowA, rowB) => {
        const rowAValues = Object(rowA.getValue('value'));
        const rowBValues = Object(rowB.getValue('value'));

        const currentPriceA = 'current' in rowAValues ? rowAValues.current : 0;
        // const previousPriceA = 'previous' in rowAValues ? rowAValues.previous : 0;

        const currentPriceB = 'current' in rowBValues ? rowBValues.current : 0;
        // const previousPriceB = 'previous' in rowBValues ? rowBValues.previous : 0;

        const variationA = getAssetVariation(10000, currentPriceA);
        const variationB = getAssetVariation(10000, currentPriceB);
        return variationA < variationB ? 1 : variationA > variationB ? -1 : 0;
      },
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
        const values = Object(row.getValue('value'));
        const currentPrice = 'current' in values ? values.current : 0;
        // const previousPrice = 'previous' in values ? values.previous : 0;

        const variation = getAssetVariation(10000, currentPrice);
        const variationStatus = getVariationStatus(10000, currentPrice);
        const variationText = `${(variation > 0 && '+') || ''}${variation.toFixed(2)}%`;

        const variationColor =
          variationStatus === 'increase'
            ? 'bg-green-700'
            : variationStatus === 'decrease'
              ? 'bg-red-700'
              : 'bg-gray-500';

        const VariationIcon =
          variationStatus === 'increase'
            ? CircleArrowUp
            : variationStatus === 'decrease'
              ? CircleArrowDown
              : CircleDot;

        return (
          <div className='flex w-full'>
            <TableCell className='ml-auto px-4'>
              <Badge
                variant='outline'
                className={`flex items-center gap-1 px-1.5 font-normal text-white brightness-125 dark:font-bold dark:brightness-100 ${variationColor}`}
              >
                {variationText}
                <VariationIcon className='size-[18px]' />
              </Badge>
            </TableCell>
          </div>
        );
      },
    },

    {
      accessorKey: 'value',
      sortingFn: (rowA, rowB) => {
        const rowAValues = Object(rowA.getValue('value'));
        const rowBValues = Object(rowB.getValue('value'));
        const valueA = 'current' in rowAValues ? rowAValues.current : 0;
        const valueB = 'current' in rowBValues ? rowBValues.current : 0;
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      },
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
