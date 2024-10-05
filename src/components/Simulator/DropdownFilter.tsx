import { Button } from '../ui/button';
import { DropdownFilterOption } from './DropdownFilterOption';
import type { Table } from '@tanstack/react-table';
import { Filter } from 'lucide-react';
import { Assets } from '@/lib/schemas/assets.schema';

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
} from '../ui/dropdown-menu';

type DropdownFilterProps = {
  table: Table<Assets>;
};

export const DropdownFilter = ({ table }: DropdownFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='px-2'>
          <Filter className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-44'>
        <DropdownMenuItem>
          <span>Filtrar por Meus Ativos</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Filtrar por Risco</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className='flex w-36 flex-col gap-1'>
                  <DropdownFilterOption table={table} column='profile' filter='high-risk' label='Agressivo' />
                  <DropdownFilterOption
                    table={table}
                    column='profile'
                    filter='medium-risk'
                    label='Moderado'
                  />
                  <DropdownFilterOption
                    table={table}
                    column='profile'
                    filter='low-risk'
                    label='Conservador'
                  />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
