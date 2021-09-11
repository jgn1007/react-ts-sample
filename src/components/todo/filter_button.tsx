import * as React from 'react';

interface IFilterButton {
  active: boolean
  name: string
  onClick: () => void
}

export const FilterButton = ({ active, name, onClick }: IFilterButton) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px',
    }}
  >
    {name}
  </button>
)
