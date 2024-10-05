import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useState } from 'react';
import { useInvestmentAssets } from '@/hooks/useInvestmentAssets';
import { investmentAssets } from '@/data/investmentAssets';
import { Input } from '../ui/input';
import { DropdownFilter } from './DropdownFilter';
import { useAssetColumns } from '@/hooks/useAssetColumns';

import {
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

export function InvestmentAssets() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'price', desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const { processedAssets } = useInvestmentAssets(investmentAssets);
  const columns = useAssetColumns();

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
    <Card className='col-span-3 flex h-full flex-col max-2xl:col-span-4'>
      <CardHeader className='grid grid-cols-2 max-lg:grid-cols-1'>
        <div className='flex flex-col gap-2'>
          <CardTitle>Ativos Disponíveis para Compra</CardTitle>
          <CardDescription>Descubra as oportunidades de investimento ao seu alcance.</CardDescription>
        </div>
        <div className='flex w-full justify-end gap-2 max-lg:justify-start'>
          <Input
            placeholder='Buscar por nome...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <DropdownFilter table={table} />
        </div>
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
      <CardFooter className='mt-auto flex flex-row justify-between max-sm:flex-col max-sm:gap-6'>
        <div className='text-xs text-muted-foreground max-sm:order-1'>
          Mostrando{' '}
          <strong>
            {pageItemFirst}-{pageItemLast}{' '}
          </strong>
          de <strong>{totalItems}</strong> ativos
        </div>
        <div className='justify-between space-x-2 max-sm:flex max-sm:w-full'>
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
