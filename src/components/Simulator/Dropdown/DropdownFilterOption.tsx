import type { AssetType, Profile } from '@/@types/investment';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Check } from 'lucide-react';
import type { Assets } from '@/lib/schemas/assets.schema';
import { Button } from '../../ui/button';
import { useSearchParams } from 'react-router-dom';
import { handleSetSearchParams } from '@/utils/searchParams';

type DropdownFilterOptionProps = {
  label: string;
  table: Table<Assets>;
} & ({ column: 'type'; filter: AssetType } | { column: 'profile'; filter: Profile });

export const DropdownFilterOption = ({ label, table, column, filter }: DropdownFilterOptionProps) => {
  const isFilterActive = table.getColumn(column)?.getFilterValue() === filter;
  const [_, setSearchParams] = useSearchParams();

  return (
    <DropdownMenuItem asChild>
      <Button
        variant='ghost'
        onClick={() => {
          if (isFilterActive) table.getColumn(column)?.setFilterValue(null);
          else table.getColumn(column)?.setFilterValue(filter);
          handleSetSearchParams({ page: String(1) }, setSearchParams);
        }}
        className={`flex h-fit w-full cursor-pointer items-center justify-start px-2 py-1.5 ${isFilterActive && 'justify-between bg-accent'}`}
      >
        <span className='mr-auto text-left'>{label}</span>
        {isFilterActive && <Check className='size-4' />}
      </Button>
    </DropdownMenuItem>
  );
};
