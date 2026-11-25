import { useState, useMemo, useCallback } from 'react';

export function usePagination(items, perPage = 6) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = items.slice(page * perPage, page * perPage + perPage);

  const safeSetPage = useCallback(
    (updater) => {
      setPage((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        return Math.max(0, Math.min(totalPages - 1, next));
      });
    },
    [totalPages],
  );

  const reset = useCallback(() => setPage(0), []);

  return { page, setPage: safeSetPage, totalPages, current, reset };
}

export function useFilteredPagination(filterFn, perPage = 6) {
  const [page, setPage] = useState(0);
  const filtered = useMemo(() => filterFn(), [filterFn]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice(page * perPage, page * perPage + perPage);

  const safeSetPage = useCallback(
    (updater) => {
      setPage((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        return Math.max(0, Math.min(totalPages - 1, next));
      });
    },
    [totalPages],
  );

  const reset = useCallback(() => setPage(0), []);

  return { page, setPage: safeSetPage, totalPages, current, filtered, reset };
}
