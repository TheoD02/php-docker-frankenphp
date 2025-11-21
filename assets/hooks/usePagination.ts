import { useCallback, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

interface UsePaginationOptions {
  initialPage?: number;
  initialItemsPerPage?: string;
  debounceDelay?: number;
}

interface PaginationState {
  page: number;
  itemsPerPage: string;
  nameFilter: string;
  debouncedName: string;
}

interface PaginationActions {
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: string) => void;
  setNameFilter: (filter: string) => void;
  resetPage: () => void;
}

interface PaginationInfo {
  totalPages: number;
  startItem: number;
  endItem: number;
}

interface UsePaginationReturn {
  state: PaginationState;
  actions: PaginationActions;
  getQueryParams: () => {
    page: number;
    itemsPerPage: number;
    name?: string;
  };
  getPaginationInfo: (totalItems: number) => PaginationInfo;
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const { initialPage = 1, initialItemsPerPage = '10', debounceDelay = 300 } = options;

  const [page, setPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [nameFilter, setNameFilter] = useState('');
  const [debouncedName] = useDebouncedValue(nameFilter, debounceDelay);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  const handleSetItemsPerPage = useCallback(
    (value: string) => {
      setItemsPerPage(value);
      resetPage();
    },
    [resetPage]
  );

  const handleSetNameFilter = useCallback(
    (filter: string) => {
      setNameFilter(filter);
      resetPage();
    },
    [resetPage]
  );

  const getQueryParams = useCallback(() => {
    const params: {
      page: number;
      itemsPerPage: number;
      name?: string;
    } = {
      page,
      itemsPerPage: parseInt(itemsPerPage),
    };

    if (debouncedName) {
      params.name = debouncedName;
    }

    return params;
  }, [page, itemsPerPage, debouncedName]);

  const getPaginationInfo = useCallback(
    (totalItems: number): PaginationInfo => {
      const itemsPerPageNum = parseInt(itemsPerPage);
      const totalPages = Math.ceil(totalItems / itemsPerPageNum) || 1;
      const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPageNum + 1;
      const endItem = Math.min(page * itemsPerPageNum, totalItems);

      return {
        totalPages,
        startItem,
        endItem,
      };
    },
    [page, itemsPerPage]
  );

  return {
    state: {
      page,
      itemsPerPage,
      nameFilter,
      debouncedName,
    },
    actions: {
      setPage,
      setItemsPerPage: handleSetItemsPerPage,
      setNameFilter: handleSetNameFilter,
      resetPage,
    },
    getQueryParams,
    getPaginationInfo,
  };
}
