export function navigateTo(setPage, setPageFilter) {
  return (target) => {
    const nav = typeof target === 'string' ? { page: target } : target;
    setPageFilter(nav.filter);
    setPage(nav.page);
  };
}
