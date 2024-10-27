import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Fragment, useState } from 'react';
import { Input } from '../../ui/input';
import { DropdownFilter } from '../Dropdown/DropdownFilter';
import { useAssetColumns } from '@/hooks/useAssetColumns';
import { X } from 'lucide-react';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { TransactionModal } from '../Modal/TransactionModal';
import { DetailsModal } from '../Modal/DetailsModal';

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

export function AssetsTable() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'value', desc: false }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ id: false });
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const { columns, rowId, saleState, purchaseState, detailsState } = useAssetColumns();
  const { assets } = useInvestmentAssets();

  const table = useReactTable({
    data: assets,
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
      {rowId && (
        <Fragment>
          <TransactionModal
            table={table}
            columnId={rowId}
            transaction='Sale'
            modalState={saleState}
            textContent={{
              trigger: 'Vender',
              confirm: 'Confirmar Venda',
              title: 'Venda de Ativo',
              description: `Esta seção exibe o custo de aquisição e o valor a receber, destacando a situação financeira e permitindo ajustar a quantidade para venda.`,
            }}
          />
          <TransactionModal
            table={table}
            columnId={rowId}
            transaction='Purchase'
            modalState={purchaseState}
            textContent={{
              trigger: 'Comprar',
              confirm: 'Confirmar Compra',
              title: 'Compra de Ativo',
              description: `Esta seção apresenta o preço total da transação e o saldo disponível, permitindo ajustar a quantidade para a compra do ativo.`,
            }}
          />
          <DetailsModal table={table} columnId={rowId} modalState={detailsState} />
        </Fragment>
      )}
      <CardHeader className='grid grid-cols-2 max-lg:grid-cols-1'>
        <div className='flex flex-col gap-2'>
          <CardTitle>Ativos Disponíveis para Compra</CardTitle>
          <CardDescription>Descubra as oportunidades de investimento ao seu alcance.</CardDescription>
        </div>
        <div className='item flex w-full justify-end gap-2 max-lg:justify-between'>
          <div className='relative flex w-full max-w-sm'>
            <Input
              id='search'
              className='w-full'
              placeholder='Buscar por nome...'
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            />
            {table.getColumn('name')?.getFilterValue() ? (
              <button
                onClick={() => table.getColumn('name')?.setFilterValue(null)}
                className='group absolute right-0 h-full px-2 pb-0.5'
              >
                <X className='size-4 transition-all delay-100 ease-in dark:stroke-stone-400 dark:group-hover:stroke-white' />
              </button>
            ) : null}
          </div>
          <DropdownFilter table={table} />
        </div>
      </CardHeader>
      <CardContent className='h-full'>
        <Table id='assets' expand={hasNoVisibleItems}>
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
