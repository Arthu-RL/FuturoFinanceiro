import { Button } from '../../ui/button';
import { DropdownFilterOption } from './DropdownFilterOption';
import type { Table } from '@tanstack/react-table';
import { Check, Filter } from 'lucide-react';
import { handleSetSearchParams } from '@/utils/searchParams';
import type { Assets } from '@/lib/schemas/assets.schema';
import { useSearchParams } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

type DropdownFilterProps = {
  table: Table<Assets>;
};

export const DropdownFilter = ({ table }: DropdownFilterProps) => {
  const isUserWalletFilterActive = table.getColumn('id')?.getFilterValue() === true;
  const hasProfileFilter = table.getColumn('profile')?.getFilterValue();
  const hasTypeFilter = table.getColumn('type')?.getFilterValue();
  const [_, setSearchParams] = useSearchParams();

  const hasActiveFilters = table.getColumn('id')?.getFilterValue() || hasTypeFilter || hasProfileFilter;

  function toggleUserAssetsFilter() {
    if (isUserWalletFilterActive) table.getColumn('id')?.setFilterValue('');
    else table.getColumn('id')?.setFilterValue(true);
    handleSetSearchParams({ page: String(1) }, setSearchParams);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={`${hasActiveFilters && 'bg-accent'}`}>
        <Button id='filter' variant='outline' className='px-2'>
          <Filter className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[200px]'>
        <DropdownMenuItem asChild>
          <Button
            variant='ghost'
            onClick={toggleUserAssetsFilter}
            className={`flex h-fit w-full cursor-pointer items-center justify-start px-2 py-1.5 ${isUserWalletFilterActive && 'justify-between bg-accent'}`}
          >
            <span>Filtrar por Meus Ativos</span>
            {isUserWalletFilterActive && <Check className='size-4' />}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='flex flex-col gap-1'>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={`${hasProfileFilter && 'bg-accent'}`}>
              <span>Filtrar por Risco</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='flex w-36 flex-col gap-1'>
                <DropdownFilterOption table={table} column='profile' filter='high-risk' label='Agressivo' />
                <DropdownFilterOption table={table} column='profile' filter='medium-risk' label='Moderado' />
                <DropdownFilterOption table={table} column='profile' filter='low-risk' label='Conservador' />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={`${hasTypeFilter && 'bg-accent'}`}>
              <span>Filtrar por Categoria</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='flex w-36 flex-col gap-1'>
                <DropdownFilterOption table={table} column='type' filter='Fiat' label='Moedas' />
                <DropdownFilterOption table={table} column='type' filter='Crypto' label='Criptomoedas' />
                <DropdownFilterOption table={table} column='type' filter='Commodity' label='Commodities' />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
