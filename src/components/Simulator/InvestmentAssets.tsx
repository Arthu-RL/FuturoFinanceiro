import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { useInvestmentAssets } from '@/hooks/useInvestmentAssets';
import { investmentAssets } from '@/data/investmentAssets';
import { Input } from '../ui/input';
import type { ProcessedInvestmentAssets } from '@/@types/investment';
import { formatCurrency } from '@/utils/currency';
import { translateAssetCategory, translateAssetProfile } from '@/utils/string';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

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
      return <div>{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'profile',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Perfil
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <Badge variant='outline' className='uppercase'>
            {translateAssetProfile(row.getValue('profile'))}
          </Badge>
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Categoria
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
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
            Preço
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedBRLPrice = formatCurrency(row.getValue('price'), 'BRL', 'pt-BR');
      return <div className='text-right font-medium'>{formattedBRLPrice}</div>;
    },
  },
];

export function InvestmentAssets() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const { processedAssets } = useInvestmentAssets(investmentAssets);

  const table = useReactTable({
    data: processedAssets,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const totalItems = table.getRowCount();
  const hasNoVisibleItems = totalItems <= 0;
  const currentPage = pagination.pageIndex + 1;
  const pageItemLast = Math.min(currentPage * pagination.pageSize, totalItems);
  const pageItemFirst = totalItems > 0 ? (currentPage - 1) * pagination.pageSize + 1 : 0;

  return (
    <Card className='col-span-3 flex h-full flex-col'>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <CardTitle>Ativos Disponíveis para Compra</CardTitle>
          <CardDescription>Descubra as oportunidades de investimento ao seu alcance.</CardDescription>
        </div>
        <Input
          placeholder='Buscar ativos...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </CardHeader>
      <CardContent className='h-full'>
        <Table expand={hasNoVisibleItems}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='h-full'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='mt-auto flex flex-row justify-between'>
        <div className='text-xs text-muted-foreground'>
          Mostrando{' '}
          <strong>
            {pageItemFirst}-{pageItemLast}{' '}
          </strong>
          de <strong>{totalItems}</strong> ativos
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
