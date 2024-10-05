import type { AssetType, ProcessedInvestmentAssets, Profile } from '@/@types/investment';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Check } from 'lucide-react';

type DropdownFilterOptionProps = {
  label: string;
  table: Table<ProcessedInvestmentAssets>;
} & ({ column: 'type'; filter: AssetType } | { column: 'profile'; filter: Profile });

export const DropdownFilterOption = ({ label, table, column, filter }: DropdownFilterOptionProps) => {
  const isFilterActive = table.getColumn(column)?.getFilterValue() === filter;

  return (
    <DropdownMenuItem asChild>
      <button
        onClick={() =>
          isFilterActive
            ? table.getColumn(column)?.setFilterValue(null)
            : table.getColumn(column)?.setFilterValue(filter)
        }
        className={`flex w-full cursor-pointer items-center justify-around ${isFilterActive && 'bg-accent'}`}
      >
        <span className='mr-auto text-left'>{label}</span>
        {isFilterActive && <Check className='size-4' />}
      </button>
    </DropdownMenuItem>
  );
};
